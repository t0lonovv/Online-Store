import { Route, Routes } from "react-router-dom"
import Home from "../features/products/Home"
import { paths } from "../router"
import Header from "../common/Header"
import Cart from "../features/cart/Cart"
import "./app.scss"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.cart} element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
