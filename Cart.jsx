import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  deleteFromCart
} from "./cartSlice";
import { resetAddedToCart, setAddedToCart } from "../products/productsSlice";

function Cart() {
  const dispatch = useDispatch()
  const cartProducts = useSelector(state => state.cart.items);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  function handleClearCart() {
    dispatch(clearCart())
    dispatch(resetAddedToCart())
  }

  function handleIncrementQuantity(id) {
    dispatch(incrementQuantity(id))
  }

  function handleDecrementQuantity(id) {
    dispatch(decrementQuantity(id))
  }

  function handleDeleteProduct(id) {
    const productDetails = {
      id,
      isAdded: false
    }
    dispatch(deleteFromCart(id))
    dispatch(setAddedToCart(productDetails))
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-semibold text-center py-4">Your Cart</h2>
        {cartProducts.length === 0 ? (
          <p className="text-center text-gray-600 py-8">Your cart is empty.</p>
        ) : (
          <>
            {cartProducts.map(cartProduct => (
              <div key={cartProduct.id} className="px-4 py-2 border-b border-gray-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="w-20 h-20 object-cover mr-4"
                      src={cartProduct.image}
                      alt={cartProduct.title}
                    />
                    <div>
                      <h3 className="font-semibold">{cartProduct.title}</h3>
                      <p className="text-gray-600">${cartProduct.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-md focus:outline-none"
                      onClick={() => handleDecrementQuantity(cartProduct.id)}
                    >
                      -
                    </button>
                    <span className="mx-5 text-lg">{cartProduct.quantity}</span>
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-md focus:outline-none"
                      onClick={() => handleIncrementQuantity(cartProduct.id)}
                    >
                      +
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded-md ml-4 focus:outline-none"
                      onClick={() => handleDeleteProduct(cartProduct.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="py-2 px-4 bg-gray-50 flex justify-between items-center">
              <button
                className="py-2 px-4 bg-red-500 text-white rounded-md focus:outline-none"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <h3 className="font-semibold text-lg">Total: ${totalPrice}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
