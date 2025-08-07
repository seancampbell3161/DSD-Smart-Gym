import { loadStripe } from "@stripe/stripe-js";
import ApiHandler from "../utils/ApiHandler";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export async function startStripeCheckout(cart: any[]) {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error("Stripe failed to load.");

    const data = await ApiHandler.post("/stripe/create-checkout-session", { cart });
    if (!data?.url) throw new Error("Unable to start checkout.");

    window.location.href = data.url;
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err);
    alert(err.message || "Unable to start checkout.");
  }
}
