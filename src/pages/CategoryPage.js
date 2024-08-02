import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();

  return (
    <div>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Products</h1>
      {/* Add logic to fetch and display products by category */}
    </div>
  );
};

export default CategoryPage;
