import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // Shallow Copy: A new array updatedItems is created by copying the items array from the previous state (state.items).
    //This ensures that we do not mutate the previous state directly, which is important for maintaining immutability in React.
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
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
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }
    return {
      // Returning the new state
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "UPDATE_ITEM") {
    // Creating a shallow copy of the previous cart items
    const updatedItems = [...state.items];

    // Find the index of the selected item
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.productId
    );
    // Create a new copy of the items that is going to be updated
    const updatedItem = {
      ...updatedItems[existingCartItemIndex],
    };
    // Modify the amount of the item
    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      // If quantity <= 0, remove the item from the cart
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      // Update the item in the list with the new quantity
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      // Returning the new state
      ...state, // Not used, but will be applied if there was more data for the state
      items: updatedItems,
    };
  }
  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE_ITEM",
      payload: { productId, amount },
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
