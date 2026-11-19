
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderPage.scss";
import type { Order } from "../../types";
import config from "../../config";
import PayPalCheckout from "../../components/PayPalCheckout";
import { Button } from "@mui/material";
import ProductKeyButton from "../../components/ProductKeyButton";
import { useAuth } from "../../context/AuthContext";
import { GetOrder } from "../../api/order";
import { useMessage } from "../../context/MessageContext";

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();
  const {showError} = useMessage();

  useEffect(() => {
    
      if (token) {
        GetOrder(Number(id),token)
          .then((data) => {setOrder(data)})
          .catch((error) => showError(String(error)));
        setLoading(false)    
      }
  }, []);

  if (loading) {
    return <div className="order-page">Loading order...</div>;
  }

  if (!order) {
    return (<></>
      // <div className="order-page">
      //   <h2>Order not found</h2>
      //   <button onClick={() => navigate("/")}>Go home</button>
      // </div>
    );
  }

  return (
    <main className="order-page">
      <div className="order-header">
        <div>
          <h1>Order details</h1>
          <p>Order #{id}</p>
        </div>

        <span className={"order-status "+order.status}>{order.status}</span>
      </div>

      <section className="order-info">
        <div>
          <span>Order date</span>
          <strong>
            {new Date(order.date).toLocaleDateString()}
          </strong>
        </div>

        <div>
          <span>Products</span>
          <strong>{order.products?order.products.length:0}</strong>
        </div>

        <div>
          <span>Total</span>
          <strong>€{Number(order.price).toFixed(2)}</strong>
        </div>
      </section>

      <section className="order-products">
        <h2>Purchased products</h2>

        {order.products?order.products.map((product) => (
          <article className="order-product" key={product.offer_id}>
            <img
              src={`/assets/${product.img_src}`}
              alt={product.title}
            />
            <div className="product-details">
              <h3>{product.title}</h3>

              <div className="product-meta">
                <span>{product.platform}</span>
                <span>{product.region}</span>
              </div>

              {product.offer_id && (
                <div className="seller-details">
                  <span>Sold by</span>
                  <strong>{product.seller_name}</strong>
                </div>
              )}
            </div>
            
            <strong className="product-price">
              €{Number(product.price).toFixed(2)}
            </strong>

            {product.product_key?<ProductKeyButton product_key={product.product_key}/>:""}
          </article>
        )):"No"}
      </section>

      <div className="order-footer">
        <button className="btn" onClick={() => navigate("/orders")}>
          Back to orders
        </button>
        <button className="btn" onClick={() => navigate("/")}>
          Continue shopping
        </button>
      </div>

    
    </main>
  );
}
