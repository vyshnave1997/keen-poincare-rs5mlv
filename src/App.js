import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import CategoryPage from "./pages/CategoryPage";
import ElectronicsPage from "./pages/Electronics";
import ProductDetailPage from "./pages/ProductDetailPage"; // Import ProductDetailPage component
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/electronics" element={<ElectronicsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />{" "}
          {/* Add route for ProductDetailPage */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
