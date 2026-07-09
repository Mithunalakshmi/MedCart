import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSearch,
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaBoxOpen
} from "react-icons/fa";

import "../styles/Navbar.css";

function Navbar() {

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const userName = localStorage.getItem("userName") || "User";

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) return;

      const cart = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const wishlist = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCartCount(cart.data.length);
      setWishlistCount(wishlist.data.length);

    }

    catch(err){

      console.log(err);

    }

  };

  return (

    <nav className="navbar">

      <Link to="/" className="logo">

        🏥

        <span>MedCart</span>

      </Link>

      <div className="search-box">

        <FaSearch className="search-icon"/>

        <input

          type="text"

          placeholder="Search medical products..."

          onChange={(e)=>

            window.location.href=`/products?search=${e.target.value}`

          }

        />

      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/wishlist" className="icon-link">

          <FaHeart/>

          {wishlistCount>0 &&

            <span className="badge">

              {wishlistCount}

            </span>

          }

        </Link>

        <Link to="/cart" className="icon-link">

          <FaShoppingCart/>

          {cartCount>0 &&

            <span className="badge">

              {cartCount}

            </span>

          }

        </Link>

        <Link to="/orders">

          <FaBoxOpen/>

        </Link>

        <Link to="/admin-dashboard" className="admin-link">
    <FaUserShield />
    <span>Admin</span>
</Link>

        <Link to="/addresses">

          <FaMapMarkerAlt/>

        </Link>

        <Link to="/profile">

          <FaUserCircle/>

        </Link>

        <span className="welcome-text">

          Hi, {userName}

        </span>

        <Link to="/login">

          <FaSignOutAlt/>

        </Link>

      </div>

    </nav>

  );

}

export default Navbar;