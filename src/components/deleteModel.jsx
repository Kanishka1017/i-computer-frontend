import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function DeleteModel(props){

    const[isVisible , setIsVisible] = useState(false);

    const product = props.product;
    const setLoading = props.setLoading;
    return(
        <div>
            <FaTrash onClick={()=>{setIsVisible(true)}} className="hover:text-red-600 cursor-pointer"/>
            {
                isVisible && (
                    <div className="w-screen h-screen bg-black/50 fixed top-0 left-0 z-100 flex items-center justify-center">

                        <div className="w-[400px] h-[200px] bg-white relative">

                            <button onClick={()=>{setIsVisible(false)}} className="w-[40px] h-[40px] text-red-600 absolute right-0 font-bold text-sm hover:bg-red-600 hover:text-white cursor-pointer">X</button>
                            <h1 className="text-lg text-center pt-15 p-2">Are you sure you want to delete {product.name} ?</h1>

                            <div className="flex items-center justify-center mt-5 gap-10">

                                <button onClick={()=>{
                                    const token = localStorage.getItem("token");
                                    axios.delete(import.meta.env.VITE_API_URL + "/product/"+ product.productId,{
                                        headers:{
                                            Authorization: "Bearer " + token
                                        }
                                    }).then(()=>{
                                        setIsVisible(false);
                                        toast.success("Product Delete Successful")
                                        setLoading(true)
                                    }).catch((error)=>{
                                        toast.error(error?.response?.data?.message || "Failed to Delete product")
                                        setIsVisible(false)
                                    })

                                }} className="bg-red-500 text-lg text-white px-1.5 py-1 rounded hover:bg-red-900">
                                    Delete
                                </button>

                                <button onClick={()=>{setIsVisible(false)}} className="bg-gray-500 text-lg rounded text-white px-1.5 py-1 hover:bg-gray-800">
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>
                )
            }
        </div>
    )
}