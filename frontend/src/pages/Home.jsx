import "../styles/Home.css";
import bpMonitor from "../assets/images/bp-monitor.jpg";
import oximeter from "../assets/images/pulse-oximeter.jpg";
import nebulizer from "../assets/images/nebulizer.jpg";
import wheelchair from "../assets/images/wheelchair.jpg";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div>

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            Your Health ❤️
            <br />
            Our Priority
          </h1>

          <p>
            India's Trusted Medical Equipment Store
          </p>

          <button onClick={() => navigate("/products")}>
            Shop Now
          </button>

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <div className="feature-card">
          🚚
          <h3>Free Delivery</h3>
          <p>On Orders Above ₹999</p>
        </div>

        <div className="feature-card">
          💯
          <h3>100% Genuine</h3>
          <p>Certified Medical Products</p>
        </div>

        <div className="feature-card">
          ⏰
          <h3>24/7 Support</h3>
          <p>Always Ready To Help</p>
        </div>

        <div className="feature-card">
          🔒
          <h3>Secure Payments</h3>
          <p>Safe Checkout</p>
        </div>

      </section>

     {/* Categories */}

<section className="categories">

  <h2>🩺 Shop By Categories</h2>

  <div className="category-grid">

    <div
      className="category-card"
      onClick={() => navigate("/products")}
    >
      💉
      <h3>Diagnostic</h3>
    </div>

    <div
      className="category-card"
      onClick={() => navigate("/products")}
    >
      ❤️
      <h3>Heart Care</h3>
    </div>

    <div
      className="category-card"
      onClick={() => navigate("/products")}
    >
      🦽
      <h3>Mobility</h3>
    </div>

    <div
      className="category-card"
      onClick={() => navigate("/products")}
    >
      🩹
      <h3>First Aid</h3>
    </div>

    <div
      className="category-card"
      onClick={() => navigate("/products")}
    >
      🏥
      <h3>Hospital Equipment</h3>
    </div>

  </div>

</section>

     <section className="best-seller">

<h2>🔥 Best Selling Products</h2>

<div className="best-grid">

<div
className="best-card"
onClick={() => navigate("/products")}
>

<img src={bpMonitor} alt="BP Monitor"/>

<h3>Blood Pressure Monitor</h3>

<p>₹1999</p>

</div>

<div
className="best-card"
onClick={() => navigate("/products")}
>

<img src={oximeter} alt="Pulse Oximeter"/>

<h3>Pulse Oximeter</h3>

<p>₹999</p>

</div>

<div
className="best-card"
onClick={() => navigate("/products")}
>

<img src={nebulizer} alt="Nebulizer"/>

<h3>Nebulizer Machine</h3>

<p>₹2499</p>

</div>

<div
className="best-card"
onClick={() => navigate("/products")}
>

<img src={wheelchair} alt="Wheelchair"/>

<h3>Wheelchair</h3>

<p>₹7999</p>

</div>

</div>

</section>

      {/* About */}

      <section className="about">

        <h2>Why Choose MedCart?</h2>

        <p>

          MedCart offers premium healthcare products,
          fast delivery,
          trusted quality,
          affordable pricing,
          and excellent customer support.

          We are your one-stop destination for all medical equipment and healthcare essentials.

        </p>

      </section>
<section className="stats">

<div>

<h1>40+</h1>
<br></br>
<p>Medical Products</p>

</div>

<div>

<h1>100+</h1>
<br></br>
<p>Happy Customers</p>

</div>

<div>

<h1>24/7</h1>
<br></br>
<p>Customer Support</p>

</div>

<div>

<h1>100%</h1>
<br></br>
<p>Genuine Products</p>

</div>

</section>
<section className="newsletter">

<h2>

📩 Subscribe to our Newsletter

</h2>

<p>

Get updates on offers, discounts & new arrivals.

</p>

<div className="newsletter-box">

<input

type="email"

placeholder="Enter your email"

/>

<button>

Subscribe

</button>

</div>

</section>
    </div>
    
  );
}

export default Home;