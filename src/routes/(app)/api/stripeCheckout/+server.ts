import type { RequestHandler } from "@sveltejs/kit";
import Stripe from "stripe"
import { STRIPE_SECRET } from "$env/static/private";

const stripe = new Stripe(STRIPE_SECRET, {
    apiVersion: "2024-06-20"
});

export const POST: RequestHandler = async ({request}) => {
    const data = await request.json();
    const items = data.items;

    let lineItems: any = [];
    items.forEach((item: any) => {
        lineItems.push({price: item.price_id, quantity: item.quantity})
    });
    console.log(lineItems)

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/api/success",
        cancel_url: "http://localhost:5173/api/cancel",
    })

    return new Response(
        JSON.stringify({ url: session.url }),
        {
            status: 200,
            headers: {"content-type": "application/json"}
        }
    )
}