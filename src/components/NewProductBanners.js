import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewProductBanners.css";

const NewProductBanners = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setNewProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      }
    };

    fetchNewProducts();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="banner-container">
      <h2 className="banner-heading">Exclusive New Arrivals</h2>{" "}
      {/* Heading for the banner */}
      <div className="banner-list">
        {newProducts.slice(0, 4).map((product) => (
          <div key={product.id} className="banner-card">
            <img
              src={product.image}
              alt={product.title}
              className="banner-image"
            />
            <div className="banner-details">
              <h3>{product.title}</h3>
              <p className="original-price">
                Original: ${product.price + 10}{" "}
                {/* Assuming a higher original price */}
              </p>
              <p className="discounted-price">
                ${product.price}
                <span className="discount-tag">10% OFF</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProductBanners;
