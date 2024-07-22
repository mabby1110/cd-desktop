import {
    POCKETBASE_PRIVATE_EMAIL,
    POCKETBASE_PRIVATE_PASSWORD,
    POCKETBASE_URI,
} from "$env/static/private";
import { pb } from "$lib/pocketbase";
import { fail } from "@sveltejs/kit";
import PocketBase from "pocketbase";

export const handle = async ({ event, resolve }) => {
    event.locals.pocketBase = new PocketBase(POCKETBASE_URI);

    try {
        event.locals.pocketBase.authStore.loadFromCookie(
            event.request.headers.get("cookie") ?? ""
        );

        await event.locals.pocketBase.collection("users").authRefresh();
    } catch (error) {
        event.locals.pocketBase.authStore.clear();
    }

    event.locals.pocketBaseAdmin = new PocketBase(POCKETBASE_URI);

    try {
        await event.locals.pocketBaseAdmin.admins.authWithPassword(
            POCKETBASE_PRIVATE_EMAIL,
            POCKETBASE_PRIVATE_PASSWORD
        );
    } catch (error) {
        console.error("Error authenticating with PocketBase admin:", error);
        return fail(500, { message: "Internal Server Error" });
    }

    pb.set(event.locals.pocketBase);

    const response = await resolve(event);

    response.headers.set(
        "set-cookie",
        event.locals.pocketBase.authStore.exportToCookie({
            sameSite: true,
            secure: true,
            httpOnly: true,
        })
    );

    return response;
};
