import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductList.css";
import SlidingCards from "./SliderCard";
import AnimatedSlidingCards from "./AnimatedSlidingCards";
import NewProductBanners from "./NewProductBanners";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortCriteria, setSortCriteria] = useState("price");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8); // Show 2 rows initially (8 products)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(["all", ...response.data]);
      } catch (err) {
        setError("Failed to fetch categories");
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      let productsToDisplay = products;
      if (selectedCategory !== "all") {
        productsToDisplay = products.filter(
          (product) => product.category === selectedCategory
        );
      }
      setFilteredProducts(productsToDisplay);
    }
  }, [selectedCategory, products]);

  useEffect(() => {
    if (filteredProducts.length > 0) {
      const sortProducts = () => {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
          switch (sortCriteria) {
            case "price":
              return a.price - b.price;
            case "rating":
              return b.rating.rate - a.rating.rate;
            case "title":
              return a.title.localeCompare(b.title);
            default:
              return 0;
          }
        });
        setFilteredProducts(sortedProducts);
      };

      sortProducts();
    }
  }, [sortCriteria, filteredProducts]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Show more products
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="product-container">
        <div className="sidebar">
          <h3>Categories</h3>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <h3>Sort by</h3>
          <select value={sortCriteria} onChange={handleSortChange}>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="title">Title</option>
          </select>
        </div>
        <div className="product-list">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <div className="product-details">
                <h2>{product.title}</h2>
                <p className="rating">
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
                <p className="price">${product.price}</p>
              </div>
            </div>
          ))}
          {filteredProducts.length > visibleCount && (
            <button className="show-more" onClick={handleShowMore}>
              Show More
            </button>
          )}
        </div>
      </div>
      <div>
        <SlidingCards /> {/* Add SlidingCards component here */}
      </div>
      <NewProductBanners />
      <div>
        <AnimatedSlidingCards />
        {/* Add SlidingCards component here */}
      </div>
    </div>
  );
};

export default ProductList;
