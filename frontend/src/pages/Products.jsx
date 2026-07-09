import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";

function Products() {

  const [products, setProducts] = useState([]);

  const location = useLocation();

  const searchQuery =
    new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return;
  }

  fetchProducts();
}, []);

  const fetchProducts = async () => {

    try {

      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const response = await api.get("/products", {

        headers: {

          Authorization: `Bearer ${token}`

        }

      });

      console.log(response.data);

      setProducts(response.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  const filteredProducts = products.filter((product) =>

    product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())

  );

  return (

    <div>

      <h1
        style={{
          textAlign: "center",
          color: "#0f766e",
          marginTop: "30px"
        }}
      >
        Our Products
      </h1>

      <div className="products-container">

        {filteredProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </div>

  );

}

export default Products;