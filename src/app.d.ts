// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import PocketBase from "pocketbase";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pocketBase: PocketBase;
			pocketBaseAdmin: PocketBase;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare class CartItem {
	post: Post
	quantity: number
}

export {};
