import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import getFormatedPrice from "../../utils/price";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/loadingAnimation";
import DeleteModel from "../../components/deleteModel";



export default function AdminProductPage(){

const[products , setProducts] = useState([])
const[loading , setLoading] = useState(true);

useEffect(()=>{

    if(loading){

    const token = localStorage.getItem("token");

        axios.get(import.meta.env.VITE_API_URL + "/product",{
        headers:{
        Authorization: "Bearer "+token
    }

        }).then((response)=>{
    setProducts(response.data);
    setLoading(false)
        })
    } 
        } , [loading])


    const { visibleCount, hiddenCount } = products.reduce(
    (counts, item) => {
        if (item.isVisible) {
            counts.visibleCount++;
        } else {
            counts.hiddenCount++;
        }
        return counts;
    },
    { visibleCount: 0, hiddenCount: 0 }
);


    return(
        <div className="w-full h-full overflow-x-scroll hide-scroll-track">

            <div className="sticky left-0 flex items-center justify-between px-5 py-5 bg-primary border-b border-secondary/10 text-2xl font-bold"><h1>PRODUCTS</h1>

                <div className="flex gap-3 text-sm font-medium">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                            Visible: {visibleCount}
                        </span>

                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">
                            Hidden: {hiddenCount}
                        </span>
                </div>
                
            </div>
            

        {loading? (
            
            <div className="w-full h-full flex items-center justify-center">

            <LoadingAnimation/>

        </div>) : ( <table className="min-w-[1100px] w-full text-sm">

            <thead className="sticky top-0 z-10 bg-white 400/30">

                <tr className="border-b border-secondary/10">
                    <th className="px-5 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70">productId</th>
                    <th className="px-5 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70">name</th>
                    <th className="px-5 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70">price</th>
                    <th className="px-5 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70">labelldPrice</th>
                    <th className="px-5 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70">category</th>
                    <th className="px-5 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70">image</th>
                    <th className="px-5 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70">isVisible</th>
                    <th className="px-5 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70">brand</th>
                    <th className="px-5 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70">model</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-secondary/10">

                {products.map(
                    (item)=>{
                        return(
                            <tr key={item.productId} className="even:bg-white hover:bg-primary transition-colors hide-scroll-track">

                                <td className="px-5 py-5 font-medium whitespace-nowrap">{item.productId}</td>

                                <td className="px-5 py-5 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-secondary">{item.name}</span>
                                        <span className="text-xs text-secondary/60">{item.category || "Uncategorized"}</span>
                                    </div>
                                </td>

                                <td className="px-5 py-5 text-secondary font-medium whitespace-nowrap">
                                    {getFormatedPrice(item.price)}</td>
                                
                                <td className="px-6 py-5 text-secondary/70 font-medium whitespace-nowrap">
                                    {getFormatedPrice(item.labelldPrice)}</td>

                                <td className="flex justify-center items-center px-5 py-8 font-medium whitespace-nowrap">{item.category}</td>

                                <td className="px-5 py-5">
                                    <div className="flex item-center">
                                        <img
                                        src={item.images?.[0]}
                                        alt={item.name}
                                        className="h-12 w-12 rounded-2xl object-cover ring-secondary/10 shadow-sm bg-primary shadow-sm text-xs"
                                        loading="lazy"
                                        />
                                    </div>
                                </td>   

                                <td className="px-5 py-5">
                                    <div className="flex justify-center">

                                    {item.isVisible ? (
                                    <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                                        Visible
                                    </span>
                                    ) : (
                                    <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                                        Hidden
                                    </span>
                                    )}

                                    </div>
                                </td>

                                <td className="px-6 py-5 text-secondary/80 font-medium whitespace-nowrap">
                                {item.brand || <span className="text-secondary/60">N/A</span>}
                                </td>

                                <td className="px-6 py-5 text-secondary/80 font-medium whitespace-nowrap">
                                {item.model  || <span className="text-secondary/60">N/A</span>}
                                </td>

                                <td className="px-6 py-5 flex text-lg gap-3">
                                    
                                    <Link 
                                        className="hover:text-accent"
                                        to ="/admin/update-product"
                                        state={item}

                                    ><FaEdit/>
                                    </Link>
                                    
                                    <DeleteModel product={item} setLoading={setLoading}/>
                                    
                                </td>

                            </tr>
                        )
                    }
                )}
            </tbody>
        </table>)}

           <Link to="/admin/add_product" className="text-white bg-accent w-[40px] h-[40px] flex items-center justify-center rounded-[10px] hover:rounded-full fixed bottom-10 right-14">
                <FaPlus/>
           </Link>
        </div>
    )
}