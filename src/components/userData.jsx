import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function  UserData(){

    const[user , setUser] = useState(null);
    const[state , setState] = useState("me");

    useEffect(
        ()=>{
            const token = localStorage.getItem("token");
            if(token != null){
                axios.get(import.meta.env.VITE_API_URL+"/user/profile",{
                    headers : {
                        "Authorization" :  `Bearer ${token}`
                    }
                }).then(
                    (Response)=>{
                        console.log(Response.data)
                        setUser(Response.data)
                    }
                ).catch(
                    ()=>{
                        localStorage.removeItem("token");
                        window.location.href="login";
                    }
                )
            }
        },[]
    )

    return(
    <>
        {user == null ?<div className="w-[150px] h-[50px] flex justify-center items-center">
            <Link to="/login" className="text-white hover:border-b-2 mr-2">Login</Link>
            <Link to="/register" className="text-white hover:border-b-2 ml-2">Register</Link>
            
        </div>

        :<div className="w-[150px] h-[50px] flex justify-between items-center rounded-full overflow-hidden border border-white">
                    <img src={user.image || "/Default.profile-png.png"} className="w-[50px] h-[50px] object-cover"/>
                    
            
            <select value={state} onChange={
                (e)=>{
                    setState(e.target.value);

                    if(e.target.value == "orders"){
                        window.location.href="/my-orders"
                    }

                    if(e.target.value == "settings"){
                        window.location.href="/settings"
                    }

                    if(e.target.value == "logout"){
                        localStorage.removeItem("token");
                        window.location.href="/login"
                    }
                    setState("me");
                }
            } className="w-full h-full bg-transparent text-white p-2 outline-none">

                    <option value="me" className="bg-accent font-semibold p-2">{user.firstName}</option>
                    <option value="orders" className="bg-accent font-semibold p-2">My Orders</option>
                    <option value="settings" className="bg-accent font-semibold p-2">Setting</option>
                    <option value="logout" className="bg-accent font-semibold p-2">LogOut</option>

            </select>
        </div>
        }

    </>
    )
}