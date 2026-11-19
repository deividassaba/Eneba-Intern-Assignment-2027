
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../types";
import "./OrdersPage.scss";
import { useAuth } from "../../context/AuthContext";
import { GetOrders } from "../../api/order";

export default function OrdersPage() {
  const navigate = useNavigate();
  const {token} = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      GetOrders(token)
        .then((data) => {setOrders(data)})
        .catch((error) => setError(String(error)));    
    }
  }, []);



  if (error) {
    return (
      <main className="orders-page">
        <h1>My orders</h1>
        <p className="orders-error">{error}</p>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-header">
        <h1>My orders</h1>
        <span>{orders.length} orders</span>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>No orders yet</h2>
          <p>Your purchases will appear here.</p>
          <button onClick={() => navigate("/")}>
            Start shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-card-info">
                <div>
                  <span className="order-label">Order number</span>
                  <strong>#{order.id}</strong>
                </div>

                <div>
                  <span className="order-label">Order date</span>
                  <strong>
                    {new Date(order.date).toLocaleDateString()}
                  </strong>
                </div>

                <div>
                  <span className="order-label">Total</span>
                  <strong>€{Number(order.price).toFixed(2)}</strong>
                </div>
              </div>
                <span className={"order-status "+order.status}>{order.status}</span>
              <button
                className="btn"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                View order
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
