import type PocketBase from "pocketbase";
import type { RecordModel } from "pocketbase";
import { pb } from "$lib/pocketbase";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";
import { validatePost, type Post } from "$lib/types";

export const load = (async ({ params }) => {
  let pbInstance = get(pb);

  if (!pbInstance) {
    return {
      result: {
        "not-found": true,
      },
    };
  }

  try {
    async function getPosts(pbInstance: PocketBase) {
      const posts = await pbInstance.collection("posts").getList(1, 15, {
        expand: "user, comments, comments.user",
        sort: "-created",
      });

      return posts.items.reduce<(Post & RecordModel)[]>((prev, cur) => {
        let post = cur;

        if (!cur.expand) {
          return prev;
        }

        post.user = cur.expand.user;

        if (!validatePost(post)) {
          return prev;
        }

        return [...prev, post];
      }, []);
    }

    const posts = await getPosts(pbInstance);

    function filterPosts(tag?: string, title?: string, username?: string) {
      return posts.filter(post => 
        (!tag || post.tags.includes(tag)) &&
        (!title || post.title.toLowerCase().includes(title.toLowerCase())) &&
        (!username || (post.expand?.user?.name && post.expand.user.name.toLowerCase().includes(username.toLowerCase())))
      );
    }

    return {
      result: {
        posts,
        filterPosts,
      },
    };
  } catch (error) {
    return {
      result: {
        "not-found": true,
      },
    };
  }
}) satisfies PageLoad;