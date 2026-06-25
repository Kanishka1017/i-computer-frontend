import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage(){
    return(
        <div className="w-full h-full border-4 border-blue-600 flex">
            <div className="w-[400px] h-full bg-red-500 flex flex-col">
               {/* <a href="/admin">Orders</a>
                <a href="/admin/product">Product</a>
                <a href="/admin/users">Users</a> */}

                <Link to="/admin">Orders</Link>
                <Link to="/admin/product">Product</Link>
                <Link to="/admin/users">Users</Link>
            </div>
            <div className="w-[calc(100%-400px)] h-full bg-yellow-400">
                <Routes>
                    <Route path="/" element={<h1>Orders Page</h1>}></Route>
                    <Route path="/product" element={<h1>Product Page</h1>}></Route>
                    <Route path="/users" element={<h1>Users Page</h1>}></Route>
                </Routes>
            </div>
        </div>
    )
}

//instead of w-[calc(100%-400px)] you can use flex-1