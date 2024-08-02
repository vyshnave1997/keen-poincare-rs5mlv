import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css"; // Import your CSS file for styling

const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-detail-image"
        />
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
