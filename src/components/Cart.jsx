import { useContext } from "react";

import { CartContext } from "../context/shopping-cart-context";

export default function Cart() {
  const { items, updateItemQuantity } = useContext(CartContext);

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className="font-semibold text-gray-700">{item.name}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateItemQuantity(item.id, -1)}
                className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition duration-200"
              >
                -
              </button>
              <span className="font-medium">{item.quantity}</span>
              <button
                onClick={() => updateItemQuantity(item.id, 1)}
                className="bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600 transition duration-200"
              >
                +
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
