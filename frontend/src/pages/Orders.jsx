import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Orders.css";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="orders-container">

      <h1 className="orders-title">
        📦 My Orders
      </h1>

      {orders.length === 0 ? (

        <h2 style={{textAlign:"center"}}>

         <div className="empty-state">

<h1>📦</h1>

<h2>No Orders Yet</h2>

<p>

Your purchased products will appear here.

</p>

</div>

        </h2>

      ) : (

        orders.map((order) => (

          <div
            className="order-card"
            key={order.id}
          >

            <div className="order-left">

              <h3>

                Order # {order.id}

              </h3>

              <p>

                Payment : {order.payment_method || "COD"}

              </p>

              <p>

                Date : {new Date(order.created_at).toLocaleDateString()}

              </p>

            </div>

            <div>

              <h2 className="order-price">

                ₹ {order.total_amount}

              </h2>

              <span className="order-status">

                Delivered

              </span>

            </div>

          </div>

        ))

      )}

    </div>

  );

}

export default Orders;