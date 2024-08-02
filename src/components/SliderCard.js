import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SliderCard.css";

const SlidingCards = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data.slice(0, 8)); // Show only 8 products for the slider
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="slider-container">
      <h2>Sliding Cards</h2>
      <div className="slider">
        {products.map((product) => (
          <div key={product.id} className="slider-card">
            <img
              src={product.image}
              alt={product.title}
              className="slider-image"
            />
            <div className="slider-details">
              <h3>{product.title}</h3>
              <p className="slider-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingCards;
