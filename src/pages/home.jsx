import { Route, Routes } from "react-router-dom"
import Header from "../components/header"
import ProductPage from "./productPage"
import ProductOverview from "./admin/overView"
import Cart from "./admin/cart"
import Cheakout from "./admin/cheakout"
import MyOrdersPage from "./myOrders"
import SettingsPage from "./settings"
export default function HomePage(){
    return(
        <div className="w-full min-h-screen">
            <Header/>

        <Routes>
            <Route path="/" element={<div>Home Page Content</div>}></Route>
            <Route path="/about" element={<div>About Page Content</div>}></Route>
            <Route path="/contact" element={<div>Contact Page Content </div>}></Route>

            <Route path="/products" element={<ProductPage/>}></Route>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/overview/:productId" element={<ProductOverview/>}></Route>
            <Route path="/cheakout" element={<Cheakout/>}></Route>
            <Route path="/my-orders" element={<MyOrdersPage/>}/>
            <Route path="/settings" element={<SettingsPage/>}/>

            <Route path="/*" element={<div>404 Not Found</div>}></Route>
        </Routes>

        </div>
    )
}