import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./AnimatedSlidingCards.css";

const AnimatedSlidingCards = () => {
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <h2>Jewelry</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="slider-card">
            <img
              src={product.image}
              alt={product.title}
              className="slider-image"
            />
            <div className="slider-details">
              <h3>{product.title}</h3>
              <p className="slider-rating">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`star ${
                      index < Math.round(product.rating.rate) ? "filled" : ""
                    }`}
                  >
                    ★
                  </span>
                ))}
              </p>
              <p className="slider-price">${product.price}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AnimatedSlidingCards;
