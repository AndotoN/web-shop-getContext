// App.jsx

import Header from "./components/Header";
import Shop from "./components/Shop";
import { DUMMY_PRODUCTS } from "./dummy-products";
import CartContextProvider, {
  CartContext,
} from "./context/shopping-cart-context";
import Product from "./components/Product";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} className="list-none" />
            {/* Adding list-none removes the bullet styling */}
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
