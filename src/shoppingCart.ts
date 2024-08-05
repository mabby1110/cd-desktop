import { writable, get } from "svelte/store";

export const cartItems = writable<CartItem[]>([]);

export const addToCart = (post: Post) => {
    let items = get(cartItems);
    let i = items.findIndex((item) => item.id === post.id);

    if (i !== -1) {
        cartItems.update(() => {
            return items.map((item) => {
                if (item.id === post.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        });
    } else {
        cartItems.update(() => {
            return [...items, { ...post, quantity: 1 }];
        });
    }
};

export const removeFromCart = (id: string) => {
    let items = get(cartItems);
    let i = items.findIndex((item) => item.id === id);

    if (i !== -1) {
        if (items[i].quantity === 1) {
            items.splice(i, 1);
        } else {
            items[i].quantity -= 1;
        }

        cartItems.set(items);
    }
};