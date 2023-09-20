import { useEffect } from "react"
import { fetchCategories } from "./productsSlice"
import { useDispatch, useSelector } from "react-redux"
import { STATUS } from "../../constants/status"
import Spinner from "../../common/Spinner"

function Categories() {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.products.categories.items)
  const categoriesStatus = useSelector(state => state.products.categories.status)
  const isLoading = categoriesStatus === STATUS.LOADING

  useEffect(() => {
    if (categoriesStatus === STATUS.IDLE) {
      dispatch(fetchCategories())
    }
  }, [categoriesStatus, dispatch])

  return (
    <div className="bg-gray-100 p-8">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        {
          isLoading ? <Spinner center /> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, idx) => {
              return <div key={idx} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
                <h3 className="text-lg font-semibold">{category}</h3>
              </div>
            })}
          </div>
        }
      </div>
    </div>
  )
}

export default Categories