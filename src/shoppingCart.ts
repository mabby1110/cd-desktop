import { writable, get } from "svelte/store";

export const cartItems = writable<CartItem[]>([]);

export const addToCart = (id: string) => {
    let items = get(cartItems);
    let i = items.findIndex((item) => {
        return item.id == id
    })

    if(i !== -1) {
        cartItems.update(() => {
            let updatedItems = items.map((item) => {
                if(item.id === id) {
                    return {...item, quantity: item.quantity + 1}
                }
                return item
            })

            return updatedItems
        })
    } else {
        cartItems.update(() => {
            return [...items, {id: id, quantity: 1}]
        })
    }
}

export const removeFromCart = (id: string) => {
    let items = get(cartItems);
    let i = items.findIndex((item) => {
        return item.id == id
    })

    if(items[i]?.quantity - 1 == 0) {
        items.splice(i)
        console.log("zzz")
    }

    cartItems.update(() => {
        let updatedItems = items.map((item) => {
            if(item.id === id) {
                return {...item, quantity: item.quantity - 1}
            }
            return item
        })
        return updatedItems
    })

}