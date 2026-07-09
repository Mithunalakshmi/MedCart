import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";

function FeaturedProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get("/products", {

        headers: {

          Authorization: `Bearer ${token}`

        }

      });

      setProducts(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <section className="featured-products">

      <h2>🔥 Featured Products</h2>

      <div className="featured-grid">

        {products.map((product) => (

          <ProductCard

            key={product.id}

            product={product}

          />

        ))}

      </div>

    </section>

  );

}

export default FeaturedProducts;