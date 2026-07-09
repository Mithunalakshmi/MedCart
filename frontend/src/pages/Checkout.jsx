import "../styles/Checkout.css";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Checkout() {

  const navigate = useNavigate();

  const [paymentMethod] = useState("ONLINE");

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/cart", {

        headers: {
          Authorization: `Bearer ${token}`
        }

      });

      setCartItems(response.data);

      const total = response.data.reduce((sum, item) => {

        return sum + Number(item.price) * item.quantity;

      }, 0);

      setTotalAmount(total);

    }

    catch (err) {

      console.log(err);

    }

  };

  const payNow = async () => {

    try {

      const token = localStorage.getItem("token");

      // Create Razorpay Order
      const order = await api.post(

        "/payment/create-order",

        {
          amount: totalAmount
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      const options = {

        key: "rzp_test_T7Ladfj27EA2JN",

        amount: order.data.amount,

        currency: order.data.currency,

        name: "MedCart",

        description: "Medical Equipment Purchase",

        image:
          "https://cdn-icons-png.flaticon.com/512/2966/2966481.png",

        order_id: order.data.id,

        handler: async function (response) {

          try {

            await api.post(

              "/payment/verify",

              response,

              {

                headers: {
                  Authorization: `Bearer ${token}`
                }

              }

            );

            await api.post(

              "/orders/place",

              {},

              {

                headers: {
                  Authorization: `Bearer ${token}`
                }

              }

            );

            toast.success("Payment Successful 🎉");

            navigate("/payment-success");

          }

          catch (err) {

            console.log(err);

            toast.error("Payment Verification Failed");

          }

        },

        prefill: {

          name: "MedCart User",

          email: "customer@gmail.com"

        },

        theme: {

          color: "#0f766e"

        }

      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    }

    catch (err) {

      console.log(err);

      toast.error("Unable to Start Payment");

    }

  };

  return (

    <div className="checkout-container">

      <h1 className="checkout-title">

        Checkout

      </h1>

      <div className="total-box">

        <h3>Total Amount</h3>

        <h1>₹ {totalAmount}</h1>

      </div>

      <button

        className="place-order-btn"

        onClick={payNow}

      >

        Pay Securely with Razorpay

      </button>

    </div>

  );

}

export default Checkout;