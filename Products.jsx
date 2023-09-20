import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, setAddedToCart } from "./productsSlice"
import Spinner from "./../../common/Spinner"
import { STATUS } from "../../constants/status"
import { addToCart } from "../cart/cartSlice"

function Products() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.items)
  const status = useSelector(state => state.products.status)
  const isLoading = status === STATUS.LOADING

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  function addProductToCart(product) {
    if (!product.isAddedToCart) {
      const productDetails = {
        id: product.id,
        isAdded: true
      }
      dispatch(addToCart(product))
      dispatch(setAddedToCart(productDetails))
    }
  }

  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold text-center">Products</h2>
      <div className="mt-3 flex flex-wrap justify-center">
        {isLoading ? <Spinner /> : products.map((product) => (
          <div
            key={product.id}
            className="max-w-sm rounded overflow-hidden shadow-md bg-white m-4"
          >
            <img
              className="w-full h-48 object-cover"
              src={product.image}
              alt={product.title}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.title}</div>
              <p className="text-gray-700 text-base mb-2">${product.price}</p>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {product.category}
              </span>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0l2.39 6.09h5.71l-4.57 3.91 1.9 5.11L10 12.72l-4.43 2.39 1.91-5.11L0.9 6.09H6.61z" />
                  </svg>
                  <span className="ml-1">{product.rating.rate} ({product.rating.count})</span>
                </div>
                <button
                  className={`px-4 py-2 text-white rounded focus:outline-none ${product.isAddedToCart ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} `}
                  onClick={() => addProductToCart(product)}
                >
                  Add{product.isAddedToCart ? "ed" : ""} to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Products