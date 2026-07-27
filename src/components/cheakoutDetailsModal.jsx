import { useState } from "react";
import toast from "react-hot-toast";
import header from "./header";
import axios from "axios";

export default function CheakoutDetailsModal(props){

    const[isVisible , setIsVisible] = useState(false);
    const[firstName , setFirstName] = useState("");
    const[lastName , setLastName] = useState("");
    const[addressLine1 , setAddressLine1] = useState("");
    const[addressLine2 , setAddressLine2] = useState("");
    const[city , setCity] = useState("");
    const[postalCode , setPostalCode] = useState("");
    const[phone , setPhone] = useState("")


    const cart = props.cart;
    async function placeOrder(){

        const token = localStorage.getItem("token");

        if(token == null){
            toast.error("You must be logined in to place order");
            window.location.href = "/login";
            return;
        }

        const order = {
            firstName : firstName,
            lastName : lastName,
            addressLine1 : addressLine1,
            addressLine2 : addressLine2,
            city : city,
            postalCode : postalCode,
            phone : phone,
            country : "Sri Lanka",
            items : []
        }
        cart.forEach(
            (item)=>{
                order.items.push(
                    {
                        productId : item.product.productId,
                        qty : item.qty,
                    }
                )
            }
        )
        console.log(order)
    

    try{
            await axios.post(import.meta.env.VITE_API_URL + "/order", order, {
                headers:{
                    Authorization : `Bearer ${token}`
                },
            })
            
            toast.success("Order placed successfully")
            window.location.href = "/"

        }catch(err){
            toast.error(err?.response?.data?.message || "Failed to place order. pleace try again")
        }
        
    }


    return(
    
    <>
        <button onClick={()=>{
            setIsVisible(true)
        }}
        className="text-lg absolute left-1 font-semibold px-2 py-2 rounded-2xl bg-accent text-white hover:text-secondary">
        Buy Now
        </button>

        {isVisible&&<div className="w-full h-full bg-black/50 fixed  top-0 right-0 z-20 flex items-center justify-center">

        <div className="w-[400px] h-auto bg-white rounded-lg relative p-5 fixed top-10 shadow-2xs">
            <button onClick={()=>{setIsVisible(false)}} className="w-[40px] h-[40px] text-red-600 font-bold absolute right-0 absolute top-0 cursor-pointer hover:bg-red-500 hover:text-white">
                X
            </button>
            <h1 className="text-lg font-semibold text-center mb-5">Enter your details</h1>
             <div>
                <input  value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} className="w-full border rounded-2xl p-2 mb-5" placeholder="First Name"></input>
                <input  value={lastName} onChange={(e)=>{setLastName(e.target.value)}} className="w-full border rounded-2xl p-2 mb-5" placeholder="Last Name"></input>
                <input  value={addressLine1} onChange={(e)=>{setAddressLine1(e.target.value)}} className="w-full border rounded-2xl p-2 mb-5" placeholder="Address Line 1"></input>
                <input  value={addressLine2} onChange={(e)=>{setAddressLine2(e.target.value)}} className="w-full border rounded-2xl p-2 mb-5" placeholder="Address Line 2"></input>
                <input  value={city} onChange={(e)=>{setCity(e.target.value)}} className="w-full border rounded-2xl p-2 mb-5" placeholder="City"></input>
                <input  value={postalCode} onChange={(e)=>{setPostalCode(e.target.value)}} className="w-full border rounded-2xl p-2 mb-5" placeholder="Postal Code"></input>
                <input  value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="w-full border rounded-2xl p-2 mb-5" placeholder="Phone Number"></input>

                <button onClick={placeOrder} className="w-full bg-accent rounded-2xl p-2 font-semibold hover:bg-accent/50 text-lg">Confirm</button>
             </div>

        </div>

        </div>}

    </>
    );
}