import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";
import LoadingAnimation from "../components/loadingAnimation";

export default function ProductPage(){

const[product , setProduct] = useState([]);
const[loading , setLoading] = useState(true);

useEffect(
    ()=>{
        if(loading){
            axios.get(import.meta.env.VITE_API_URL + "/product")
            .then(
                (Response)=>{
                    setProduct(Response.data)
                    setLoading(false)
                }
            ).catch(
                ()=>{
                    toast.error("Failed to fetch Products.Pleace try again.")
                    setLoading(true)
                }
            )
        }

    },[loading]
)

    return(
        <div className="flex justify-center items-center flex-wrap bg-primary">
            {
                loading && <LoadingAnimation/>
            }
            {
                product.map(
                    (item)=>{
                        return(
                        <ProductCard product={item} key={item.productId}/>
                        )
                    }
                )
            }
        </div>
    )
}