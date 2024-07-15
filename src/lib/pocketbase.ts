import PocketBase from "pocketbase"
import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const pb = writable<PocketBase | undefined>(undefined, (set) => {
    if(!browser){
        return;
    }

    const pocketbaseInstance = new PocketBase("http://127.0.0.1:8090");
    pocketbaseInstance.authStore.loadFromCookie(document.cookie);
    set(pocketbaseInstance);
});