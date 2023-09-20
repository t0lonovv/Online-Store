import { Link } from "react-router-dom"
import { paths } from "../router"
import { useSelector } from "react-redux"

import "./header.scss"

function Header() {
  const productsCount = useSelector(state => state.cart.items.length)

  return (
    <nav className="bg-gray-800 py-4 px-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={paths.home} className="text-white text-xl font-semibold">Online Store</Link>
        <ul className="flex items-center space-x-4">
          <li className="header__product-item">
            <Link to={paths.home} className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li className="header__product-item">
            <Link to={paths.cart} className="text-white hover:text-gray-300">
              <div className="relative py-2">
                {productsCount > 0 && <div className="header__product-count t-0 absolute left-3">
                  <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{productsCount}</p>
                </div>}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header