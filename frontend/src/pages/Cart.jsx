import "../styles/Cart.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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

    }

    catch (error) {

      console.log(error);

    }

  };

  const removeItem = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/cart/remove/${id}`, {

        headers: {
          Authorization: `Bearer ${token}`
        }

      });

      toast.success("Item removed from cart");

      fetchCart();

    }

    catch (error) {

      console.log(error);

    }

  };

  const updateQuantity = async (id, quantity) => {

    if (quantity < 1) return;

    try {

      const token = localStorage.getItem("token");

      await api.put(

        `/cart/update/${id}`,

        {

          quantity

        },

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      fetchCart();

    }

    catch (error) {

      console.log(error);

    }

  };

  const total = cartItems.reduce(

    (sum, item) => sum + Number(item.price) * item.quantity,

    0

  );

  return (

    <div className="cart-container">

      <h1 className="cart-title">

        🛒 My Cart

      </h1>

      {

        cartItems.length === 0 ?

        (

          <div className="empty-state">

            <h1>🛒</h1>

            <h2>Your Cart is Empty</h2>

            <p>

              Start shopping to add products.

            </p>

          </div>

        )

        :

        (

          <>

            <div className="cart-grid">

              {

                cartItems.map((item)=>(

                  <div

                    className="cart-card"

                    key={item.id}

                  >

                    <ProductCard

                      product={item}

                    />

                    <div className="cart-actions">

                      <button
className="qty-btn"
onClick={() =>
updateQuantity(item.id,item.quantity-1)
}
>
−
</button>

                      <h3 className="qty">
{item.quantity}
</h3>

                      <button
className="qty-btn"
onClick={() =>
updateQuantity(item.id,item.quantity+1)
}
>
+
</button>

                    </div>

                    <button
className="remove-btn"
onClick={() => removeItem(item.id)}
>
🗑 Remove
</button>

                  </div>

                ))

              }

            </div>

            <div className="checkout-section">

              <h2>

                Total : ₹ {total}

              </h2>

              <button

                className="checkout-btn"

                onClick={()=>

                  navigate("/checkout")

                }

              >

                Proceed To Checkout

              </button>

            </div>

          </>

        )

      }

    </div>

  );

}

export default Cart;