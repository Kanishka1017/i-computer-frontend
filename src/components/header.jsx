import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserData from "./userData";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuPanelLeftClose } from "react-icons/lu";

export default function header(){

    const [isOpen, setIsOpen] = useState(false)

    return(
        <header className="h-[100px] sticky top-0 bg-accent relative flex items-center justify-center relative z-100">

            <GiHamburgerMenu onClick={()=>{setIsOpen(true)}} className="absolute left-5 lg:hidden cursor-pointer text-white"/>

            <div className="flex items-center justify-center absolute left-5 ml-10 m-3">
                <img src="/logo.png" alt="logo" className="w-[80px]"/>
                <h1 className="text-md lg:text-lg font-bold ml-3 text-white">I-Computer</h1>
            </div>

            <div className="h-full lg:flex justify-center items-center gap-20 hidden ml-20">
                <Link to="/" className="text-white text-lg hover:border-b-2">Home</Link>
                <Link to="/products" className="text-white text-lg hover:border-b-2">products</Link>
                <Link to="/about" className="text-white text-lg hover:border-b-2">About</Link>
                <Link to="/contact" className="text-white text-lg hover:border-b-2">Contact</Link>
            </div>

            <div className="absolute right-10 lg:flex hidden h-full justify-center items-center gap-6">
               <Link to="/cart" className="text-2xl cursor-pointer"><FaShoppingCart/></Link>
               <UserData/>
            </div>

            {isOpen&&<div className="fixed bg-black/50 w-full h-screen top-0 left-0">
                <div className="w-[300px] h-full bg-white">
                    <div className="w-full h-[100px] bg-accent flex justify-center items-center relative">
                        <img src="/logo.png" alt="logo" className="w-[80px]"/>
                        <h1 className="text-md lg:text-lg font-bold ml-3 text-white">I-Computer</h1>
                        <LuPanelLeftClose onClick={()=>{setIsOpen(false)}} className="absolute top-0 right-0 text-md text-white"/>
                    </div>

                <div className="flex flex-col mt-5">
                    <a href="/" className="text-secondary font-semibold py-3 px-5 hover:bg-secondary/10">Home</a>
                    <a href="/products" className="text-secondary font-semibold py-3 px-5 hover:bg-secondary/10">Products</a>
                    <a href="/about" className="text-secondary font-semibold py-3 px-5 hover:bg-secondary/10">About</a>
                    <a href="/contact" className="text-secondary font-semibold py-3 px-5 hover:bg-secondary/10">Contact</a>
                    <a href="/cart" className="text-secondary font-semibold py-3 px-5 hover:bg-secondary/10">Cart</a>
                    <a href="/login" className="text-secondary font-semibold py-3 px-5 hover:bg-secondary/10">Login</a>
                    <a href="/register" className="text-secondary font-semibold py-3 px-5 hover:bg-secondary/10">Register</a>
                </div>

                </div>
            </div>}

        </header>
    )
}

//commite 03