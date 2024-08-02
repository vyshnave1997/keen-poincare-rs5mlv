import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";
import ProductList from "../components/ProductList";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=3"
        ); // Fetch 3 products
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Optional: Hide navigation arrows
  };

  return (
    <div className="home-page">
      <div className="slider-container">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="slider-item">
              <div className="slider-text">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
              </div>
              <img
                src={product.image}
                alt={product.title}
                className="slider-image"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div>
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
