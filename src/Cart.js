// src/Cart.js
import React from "react";
import { useCart } from "./CartContext";

const Cart = () => {
  const { cart, removeFromCart, getCartCount } = useCart();

  return (
    <div>
      <h1>Cart</h1>
      <p>Items in Cart: {getCartCount()}</p>
      <ul>
        {cart.length > 0 ? (
          cart.map((product) => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
            </li>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </ul>
    </div>
  );
};

export default Cart;
