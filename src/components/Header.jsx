// Header.jsx
import { useRef, useContext } from "react";
import CartModal from "./CartModal";

import { CartContext } from "../context/shopping-cart-context";

export default function Header() {
  const modal = useRef(); // Create a ref for the CartModal

  // Use context to get the items array
  const { items } = useContext(CartContext);

  // Get total quantity from the cart
  const cartQuantity = items.reduce((total, item) => total + item.quantity, 0);

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = (
    <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition">
      Close
    </button>
  );

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition">
          Close
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Checkout
        </button>
      </>
    );
  }

  console.log("Header item quantity:", cartQuantity); // Log total quantity of all items in cart

  return (
    <>
      <CartModal ref={modal} title={"Your cart"} actions={modalActions} />
      <header className="bg-gradient-to-r from-purple-600 to-purple-400 shadow-md p-6 flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">Web shop</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleOpenCartClick}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          >
            Cart ({cartQuantity})
          </button>
        </div>
      </header>
    </>
  );
}
