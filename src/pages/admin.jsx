import { Link, Route, Routes } from "react-router-dom";
import { FaListAlt } from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddProductPage from "./admin/adminAddProductPage";
import AdminUpdateProductPage from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdesPage";
import AdminUsersPage from "./admin/adminUsersPage";

export default function AdminPage(){
    return(
        <div className="w-full h-full border-4 flex bg-accent">
            <div className="w-[400px] h-full flex flex-col bg-accent text-xl text-white">

                <h1 className="text-4xl font-bold border-b-4 flex justify-center p-5">Admin Panal</h1>
                
                <Link className="flex w-full p-[10px] gap-4 items-center hover:bg-white hover:text-accent hover:rounded-2xl mt-1" to="/admin"> <FaListAlt/> Orders</Link>
                <Link className="flex w-full p-[10px] gap-4 items-center hover:bg-white hover:text-accent hover:rounded-2xl" to="/admin/product"> <MdInventory2/> Product</Link>
                <Link className="flex w-full p-[10px] gap-4 items-center hover:bg-white hover:text-accent hover:rounded-2xl" to="/admin/users"> <FaUser/> Users</Link>

            </div>
            <div className="w-[calc(100%-400px)] h-full border-8 border-accent rounded-[20px] bg-primary p-4">
                <Routes>
                    <Route path="/" element={<AdminOrdersPage/>}></Route>
                    <Route path="/product" element={<AdminProductPage/>}></Route>
                    <Route path="/users" element={<AdminUsersPage/>}></Route>
                    <Route path="/add_product" element={<AdminAddProductPage/>}></Route>
                    <Route path="/update-product" element={<AdminUpdateProductPage/>}></Route>
                </Routes>
            </div>
        </div>
    )
}

//instead of w-[calc(100%-400px)] you can use flex-1