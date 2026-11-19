
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import type { ProductOffer } from "../../types";
import { getCart } from "../../utils/cart";
import "./CheckoutPage.scss";
import PayPalCheckout from "../../components/PayPalCheckout";
import { useAuth } from "../../context/AuthContext";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState<ProductOffer[]>([]);
  // const [loading, setLoading] = useState(true);


  const {token, email } = useAuth()
  const handleSuccess = () => {
    
  }
  useEffect(() => {
     setCart(getCart())

  }, []);

  const total = cart.reduce(
    (sum, productoffer) => sum + Number(productoffer.price),
    0
  );

  const handleCheckout = async () => {

  };
  

  if (!email) {
    return <Navigate to="/login" replace />;
  }

  if (cart.length === 0) {
     return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate("/")}>
            Browse products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>
      
      <div className="checkout-content">
        <section className="checkout-details">
          <div className="checkout-section">
            <h2>Customer information</h2>
            <div className="checkout-email">
              <span>Email address</span>
              <strong>{email}</strong>
            </div>
          </div>

          <div className="checkout-section">
            <h2>Order items</h2>

            <div className="checkout-items">
              {cart.map((productoffer, index) => (
                <div className="checkout-item" key={index}>
                  <div>
                    <h3>{productoffer.seller_name}</h3>
                    <a
                      href={productoffer.seller_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View productoffer
                    </a>
                  </div>

                  <strong>
                    €{Number(productoffer.price).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="checkout-summary">
          <h2>Order summary</h2>

          <div className="checkout-summary__row">
            <span>Items ({cart.length})</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <div className="checkout-summary__total">
            <span>Total</span>
            <strong>€{total.toFixed(2)}</strong>
          </div>

          
          {token?
          <PayPalCheckout
            cart={cart}
            token={token}
            onSuccess={() => {
                
            }}/>:
            
            <button
            className="checkout-summary__button"
            onClick={handleCheckout}
          >
            Place order
          </button>
          }
          <button
            className="btn w-100"
            onClick={() => navigate("/cart")}
          >
            Back to cart
          </button>
        </aside>
      </div>
      
    </main>
  );
}
function getEmail() {
  throw new Error("Function not implemented.");
}

