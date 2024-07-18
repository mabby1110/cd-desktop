import { validateUser } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    if (
        !locals.pocketBase.authStore.isValid ||
        !validateUser(locals.pocketBase.authStore.model)
    ) {
        throw redirect(303, "/auth");
    }

    return {
        authModel: locals.pocketBase.authStore.model,};
}) satisfies PageServerLoad;

export const actions = {
    newComment: async ({ locals, request }) => {
        const authModel = locals.pocketBase.authStore.model;

        if (!locals.pocketBase.authStore.isValid || !validateUser(authModel)) {
        throw redirect(303, "/auth");
        }

        const formData = await request.formData();

        const user = formData.get("user");
        const post = formData.get("post");
        const content = formData.get("content");
        console.log(user, post, content);

        try {
            if (typeof content !== "string") {
                throw new Error("Invalid content");
            }

            // upload
            const record = await locals.pocketBaseAdmin.collection("comments").create({
                user: user,
                post: post,
                content: content,
            });
            await locals.pocketBaseAdmin.collection("posts").update(post, {
                "comments+": record.id,
            });

        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                return {
                message: error.message,
                };
            }

            return {
                message: "An error occurred while uploading comment",
            };
        }

        throw redirect(303, "/");
    },
};