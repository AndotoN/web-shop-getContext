// Product.jsx
import { useContext } from "react";

import { CartContext } from "../context/shopping-cart-context";

export default function Product({ id, image, title, price, description }) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="font-bold text-xl text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <span className="block font-bold text-lg text-gray-700 mb-2">
          ${price}
        </span>
        <button
          onClick={() => addItemToCart(id)}
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
