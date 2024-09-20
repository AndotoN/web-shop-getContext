import { createContext, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

export default function CartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      // Shallow Copy: A new array updatedItems is created by copying the items array from the previous state (prevShoppingCart.items).
      //This ensures that we do not mutate the previous state directly, which is important for maintaining immutability in React.
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      // If the item exists, existingCartItem will hold the product object; otherwise, it will be undefined.
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        // If item already exists in the cart => increase quantity by 1
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        // The next step ensures that the new item with the increased quantity replaces the old item in the array.
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // If item does not exist in the cart => add the new item in the updatedItems array
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }
      return {
        // Returning the new state
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      // Creating a shallow copy of the previous cart items
      const updatedItems = [...prevShoppingCart.items];

      // Find the index of the selected item
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === productId
      );
      // Create a new copy of the items that is going to be updated
      const updatedItem = {
        ...updatedItems[existingCartItemIndex],
      };
      // Modify the amount of the item
      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        // If quantity <= 0, remove the item from the cart
        updatedItems.splice(existingCartItemIndex, 1);
      } else {
        // Update the item in the list with the new quantity
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        // Returning the new state
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
