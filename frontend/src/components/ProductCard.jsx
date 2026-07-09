import toast from "react-hot-toast";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

import bpMonitor from "../assets/images/bp-monitor.jpg";
import thermometer from "../assets/images/digital-thermometer.jpg";
import nebulizer from "../assets/images/nebulizer.jpg";
import glucometer from "../assets/images/glucometer.jpg";
import wheelchair from "../assets/images/wheelchair.jpg";
import stethoscope from "../assets/images/stethoscope.jpg";
import oximeter from "../assets/images/pulse-oximeter.jpg";
import weighingScale from "../assets/images/digital-weighing-scale.jpg";

import infraredThermometer from "../assets/images/infrared-thermometer.jpg";
import steamVaporizer from "../assets/images/steam-vaporizer.jpg";
import compressionBelt from "../assets/images/compression-belt.jpg";
import kneeSupport from "../assets/images/knee-support.jpg";
import heatingPad from "../assets/images/heating-pad.jpg";
import medicalGloves from "../assets/images/medical-gloves.jpg";
import faceShield from "../assets/images/face-shield.jpg";
import adultDiapers from "../assets/images/adult-diapers.jpg";
import walkingStick from "../assets/images/walking-stick.jpg";
import oxygenCylinder from "../assets/images/oxygen-cylinder.jpg";
import suctionMachine from "../assets/images/suction-machine.jpg";
import ecgMonitor from "../assets/images/ecg-monitor.jpg";
import syringePack from "../assets/images/syringe-pack.jpg";
import wheelWalker from "../assets/images/wheel-walker.jpg";
import cervicalPillow from "../assets/images/cervical-pillow.jpg";
import hotWaterBag from "../assets/images/hot-water-bag.jpg";
import medicineBox from "../assets/images/medicine-box.jpg";
import bloodLancets from "../assets/images/blood-lancets.jpg";
import surgicalCotton from "../assets/images/surgical-cotton.jpg";
import sanitizer from "../assets/images/hand-sanitizer.jpg";
import scissors from "../assets/images/surgical-scissors.jpg";
import n95Mask from "../assets/images/n95-mask.jpg";
import elasticBandage from "../assets/images/elastic-bandage.jpg";
import iceGelPack from "../assets/images/ice-gel-pack.jpg";
import pregnancyTest from "../assets/images/pregnancy-test.jpg";
import crutches from "../assets/images/crutches.jpg";
import hospitalTable from "../assets/images/hospital-bed-table.jpg";
import bpCuff from "../assets/images/bp-cuff.jpg";
import medicalTorch from "../assets/images/medical-torch.jpg";
import api from "../services/api";

function ProductCard({ product }) {

  const navigate = useNavigate();
  const getImage = () => {

  const name = product.name.toLowerCase();

  if (name.includes("blood pressure")) return bpMonitor;
  if (name.includes("digital thermometer")) return thermometer;
  if (name.includes("infrared")) return infraredThermometer;
  if (name.includes("pulse oximeter")) return oximeter;
  if (name.includes("nebulizer")) return nebulizer;
  if (name.includes("glucometer")) return glucometer;
  if (name.includes("wheelchair")) return wheelchair;
  if (name.includes("stethoscope")) return stethoscope;
  if (name.includes("digital weight")) return weighingScale;
  if (name.includes("weighing")) return weighingScale;
  if (name.includes("steam")) return steamVaporizer;
  if (name.includes("compression")) return compressionBelt;
  if (name.includes("knee")) return kneeSupport;
  if (name.includes("heating")) return heatingPad;
  if (name.includes("medical gloves")) return medicalGloves;
  if (name.includes("face shield"))return faceShield;
  if (name.includes("adult diapers")) return adultDiapers;
  if (name.includes("walking stick")) return walkingStick;
  if (name.includes("oxygen cylinder")) return oxygenCylinder;

  if (name.includes("suction")) return suctionMachine;

  if (name.includes("ecg")) return ecgMonitor;

  if (name.includes("syringe")) return syringePack;

  if (name.includes("wheel walker")) return wheelWalker;

  if (name.includes("cervical")) return cervicalPillow;

  if (name.includes("hot water")) return hotWaterBag;

  if (name.includes("medicine box")) return medicineBox;

  if (name.includes("blood lancets")) return bloodLancets;

  if (name.includes("surgical cotton")) return surgicalCotton;

  if (name.includes("sanitizer")) return sanitizer;

  if (name.includes("scissors")) return scissors;

  if (name.includes("n95")) return n95Mask;

  if (name.includes("elastic")) return elasticBandage;

  if (name.includes("ice gel")) return iceGelPack;

  if (name.includes("pregnancy")) return pregnancyTest;

  if (name.includes("crutches")) return crutches;

  if (name.includes("hospital bed")) return hospitalTable;

  if (name.includes("bp cuff")) return bpCuff;

  if (name.includes("medical torch")) return medicalTorch;

  return bpMonitor;

};

  const addToCart = async () => {

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/cart/add",
        {
          product_id: product.id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("🛒 Product added to cart!");

    } catch (error) {

      console.log(error);
      toast.error("Failed to add product");

    }

  };
const addToWishlist = async () => {

  try {

    const token = localStorage.getItem("token");

    await api.post(
      "/wishlist/add",
      {
        product_id: product.id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("❤️ Added to Wishlist");

  } catch (error) {

    console.log(error);
    toast.error("Failed to add to wishlist");

  }

};
  return (

    <div
  className="product-card"
  onClick={() => navigate(`/product/${product.product_id || product.id}`)}
  style={{ cursor: "pointer" }}
>

      <img
        src={getImage()}
        alt={product.name}
        className="product-image"
      />

      <div className="product-content">

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <div className="rating">
          ⭐⭐⭐⭐⭐
        </div>

        <h2 className="price">
          ₹ {product.price}
        </h2>

        <span className="stock">
          {product.stock > 0 ? "🟢 In Stock" : "🔴 Out of Stock"}
        </span>

        <div className="buttons">

         <button
  className="wishlist-btn"
  onClick={(e) => {
    e.stopPropagation();
    addToWishlist();
  }}
>
  ❤️ Wishlist
</button>

          <button
  className="cart-btn"
  onClick={(e) => {
    e.stopPropagation();
    addToCart();
  }}
>
  🛒 Add Cart
</button>

        </div>

      </div>

    </div>

  );

}

export default ProductCard;