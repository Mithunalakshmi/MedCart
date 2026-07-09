import toast from "react-hot-toast";
import "../styles/productdetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

// Product Images
import bpMonitor from "../assets/images/bp-monitor.jpg";
import thermometer from "../assets/images/digital-thermometer.jpg";
import nebulizer from "../assets/images/nebulizer.jpg";
import glucometer from "../assets/images/glucometer.jpg";
import wheelchair from "../assets/images/wheelchair.jpg";
import stethoscope from "../assets/images/stethoscope.jpg";
import oximeter from "../assets/images/pulse-oximeter.jpg";
import weighingScale from "../assets/images/digital-weighing-scale.jpg";
import firstAid from "../assets/images/first-aid-kit.jpg";
import surgicalMask from "../assets/images/surgical-mask.jpg";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  useEffect(() => {

fetchProduct();

fetchReviews();

fetchAverageRating();

}, [id]);

  const getImage = (name) => {

    if (!name) return bpMonitor;

    const productName = name.toLowerCase();

    if (productName.includes("blood pressure")) return bpMonitor;
    if (productName.includes("thermometer")) return thermometer;
    if (productName.includes("nebulizer")) return nebulizer;
    if (productName.includes("glucometer")) return glucometer;
    if (productName.includes("wheelchair")) return wheelchair;
    if (productName.includes("stethoscope")) return stethoscope;
    if (productName.includes("oximeter")) return oximeter;
    if (productName.includes("weighing")) return weighingScale;
    if (productName.includes("first aid")) return firstAid;
    if (productName.includes("mask")) return surgicalMask;

    return bpMonitor;

  };

  const fetchProduct = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(`/products/${id}`, {

        headers: {

          Authorization: `Bearer ${token}`

        }

      });

      setProduct(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchReviews = async () => {

    try {

      const response = await api.get(`/reviews/product/${id}`);

      setReviews(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const addToCart = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(

        "/cart/add",

        {

          product_id: id,

          quantity: 1

        },

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      toast.success("Product Added Successfully");

    } catch (error) {

      console.log(error);

      toast.error("Failed to add product");

    }

  };
  const fetchAverageRating = async () => {

  try {

    const response = await api.get(

      `/reviews/rating/${id}`

    );

    if(response.data){

      setAverageRating(

        response.data.average_rating || 0

      );

    }

  }

  catch(error){

    console.log(error);

  }

};

  const addToWishlist = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(

        "/wishlist/add",

        {

          product_id: id

        },

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      toast.success("Added To Wishlist");

    } catch (error) {

      console.log(error);

    }

  };

  const submitReview = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(

        "/reviews/add",

        {

          product_id: id,

          rating,

          comment

        },

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      toast.success("Review Added Successfully");

      setComment("");

      setRating(5);

      fetchReviews();

    } catch (error) {

      console.log(error);

    }

  };

  if (!product) {

    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  }

  return (

    <div className="product-details">

      <img
src={product.image}
alt={product.name}
/>

      <div className="product-right">

        <h1>{product.name}</h1>

        <p style={{ margin: "15px 0" }}>

          {product.description}

        </p>

        <h2 style={{ color: "#0f766e" }}>

          ₹ {product.price}

        </h2>

        <h3>

{"⭐".repeat(Math.round(averageRating))}

</h3>

<p>

Average Rating :

<b>

 {averageRating || "No Ratings Yet"}

</b>

</p>

        <p>

          <b>Stock :</b>{" "}

          {product.stock > 0 ? "🟢 In Stock" : "🔴 Out Of Stock"}

        </p>

        <div style={{ marginTop: "20px" }}>

          <button

            onClick={addToWishlist}

            style={{

              padding: "12px 25px",

              border: "none",

              borderRadius: "8px",

              background: "#ff4081",

              color: "white",

              cursor: "pointer"

            }}

          >

            ❤️ Add To Wishlist

          </button>

          <button

            onClick={addToCart}

            style={{

              padding: "12px 25px",

              marginLeft: "15px",

              border: "none",

              borderRadius: "8px",

              background: "#0f766e",

              color: "white",

              cursor: "pointer"

            }}

          >

            🛒 Add To Cart

          </button>

        </div>

        <hr style={{ margin: "30px 0" }} />

        <h2>⭐ Write Review</h2>

        <select

          value={rating}

          onChange={(e) => setRating(Number(e.target.value))}

        >

          <option value="5">⭐⭐⭐⭐⭐</option>

          <option value="4">⭐⭐⭐⭐</option>

          <option value="3">⭐⭐⭐</option>

          <option value="2">⭐⭐</option>

          <option value="1">⭐</option>

        </select>

        <br /><br />

        <textarea

className="review-box"

rows="5"

placeholder="Write your experience about this product..."

value={comment}

onChange={(e)=>setComment(e.target.value)}

></textarea>

        <br /><br />

        <button

          onClick={submitReview}

          style={{

            padding: "10px 25px",

            border: "none",

            borderRadius: "8px",

            background: "#0f766e",

            color: "white",

            cursor: "pointer"

          }}

        >

          Submit Review

        </button>

        <hr style={{ margin: "30px 0" }} />

        <h2>Customer Reviews</h2>

        {

          reviews.length === 0 ? (

            <p>No Reviews Yet.</p>

          ) : (

            reviews.map((review)=>(

<div

key={review.id}

className="review-card"

>

<h3>

{"⭐".repeat(review.rating)}

</h3>

<p>

{review.comment}

</p>

</div>

))

          )

        }

      </div>

    </div>

  );

}

export default ProductDetails;