
import { useEffect, useState } from "react";
import type { ProductOffer } from "../../types";

import "./CartPage.scss";
import { clearCart, getCart, removeFromCart } from "../../utils/cart";
import { Link } from "react-router-dom";
import CartProduct from "../../components/CartProduct/CartProduct";

export default function CartPage() {
  const [cart, setCart] = useState<ProductOffer[]>([]);
  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (index: number) => {
    removeFromCart(index);
    setCart(getCart());
  };
  const handleClear = () => {
    clearCart();
    setCart([]);
  };

  const total = cart.reduce(
    (sum, productOffer) => sum + Number(productOffer.price),
    0
  );

  return (
    <main className="cart-page">
      <div className="cart-page__header">
        <h1>Shopping cart</h1>
        <span>{cart.length} items</span>
      </div>

      {cart.length > 0 ? (
        <div className="cart-page__content">
          <section className="cart-page__items">
            {cart.map((productOffer, index) => (<CartProduct key={productOffer.offer_id} productOffer={productOffer} index={index} handleRemove={handleRemove}/>
              
            ))}
          </section>

          <aside className="cart-summary">
            <h2>Order summary</h2>

            <div className="cart-summary__row">
              <span>Items ({cart.length})</span>
              <span>€{total.toFixed(2)}</span>
            </div>

            <div className="cart-summary__total">
              <span>Total</span>
              <strong>€{total.toFixed(2)}</strong>
            </div>

            <Link to="/checkout"
              type="button"
              className="btn w-100"
              style={{margin:'5px 0'}}
            >
              Continue to checkout
            </Link>

            <button
              type="button"
              className="btn w-100"
              onClick={handleClear}
            >
              Clear cart
            </button>
          </aside>
        </div>
      ) : (
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any offers yet.</p>
        </div>
      )}
    </main>
  );
}
