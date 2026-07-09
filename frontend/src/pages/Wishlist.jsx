import toast from "react-hot-toast";
import "../styles/Wishlist.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setWishlist(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const removeWishlist = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/wishlist/remove/${id}`, {

        headers: {
          Authorization: `Bearer ${token}`
        }

      });

      fetchWishlist();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="wishlist-container">

      <h1 className="wishlist-title">

        ❤️ My Wishlist

      </h1>

      {wishlist.length === 0 ? (

        <div className="empty-state">

          <h1>❤️</h1>

          <h2>Your Wishlist is Empty</h2>

          <p>

            Save your favourite products here.

          </p>

        </div>

      ) : (

        <div className="wishlist-grid">

          {wishlist.map((item) => (

            <div key={item.id}>

              <ProductCard product={item} />

              <button

                className="wishlist-remove-btn"

                onClick={() => removeWishlist(item.id)}

              >

                ❌ Remove

              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Wishlist;