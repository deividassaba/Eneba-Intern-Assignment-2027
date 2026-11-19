
import type { ProductOffer } from "../types";

export function getCart(): ProductOffer[] {
  return JSON.parse(sessionStorage.getItem("cart") || "[]");
}

export function addToCart(productOffer: ProductOffer): void {
  const cart = getCart();

  const exists = cart.some(
    (item) =>
      item.seller_name === productOffer.seller_name &&
      item.seller_url === productOffer.seller_url &&
      item.price === productOffer.price
  );

  if (!exists) {
    cart.push(productOffer);
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
}

export function removeFromCart(index: number): void {
  const cart = getCart();
  cart.splice(index, 1);
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart(): void {
  sessionStorage.removeItem("cart");
}
