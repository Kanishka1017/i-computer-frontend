import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";
import LoadingAnimation from "../components/loadingAnimation";

export default function ProductPage(){

const[product , setProduct] = useState([]);
const[loading , setLoading] = useState(true);
const[searchQuery, setSearchQuery] = useState("")

useEffect(
    ()=>{
        if(loading){
            let url = import.meta.env.VITE_API_URL + "/product/"

            if(searchQuery!=""){
                url = import.meta.env.VITE_API_URL + "/product/search/" + searchQuery
            }

            axios.get(url)

            .then(
                (Response)=>{
                    setProduct(Response.data)
                    setLoading(false)
                }
            ).catch(
                ()=>{
                    toast.error("Failed to fetch Products.Pleace try again.")
                    setLoading(false)
                }
            )
        }

    },[loading]
)

    return(
        <div className="flex justify-center items-center flex-wrap bg-primary relative pt-[70px]">
            {
                loading && <LoadingAnimation/>
            }

            <div className="w-full h-[60px] backdrop-blur-sm fixed top-[100px] z-10 flex justify-center items-center">
                <input type="text" placeholder="Search for products..." className="w-[400px] h-[40px] rounded-full px-4"
                onChange={
                    (e)=>{
                        setSearchQuery(e.target.value)
                        setLoading(true)
                    }
                }/>

                {/*Get All Product button*/}

                <button className="ml-4 px-4 py-1 rounded-full bg-secondary text-white" 
                onClick={
                    ()=>{
                        setSearchQuery("")
                        setLoading(true)
                    }
                }>
                    Get all product
                </button>

            </div>

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