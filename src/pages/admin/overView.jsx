import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import LoadingAnimation from "../../components/loadingAnimation";
import ImageSlideShow from "../../components/imageSide";

export default function ProductOverview(){
  
const[product , setProduct] = useState(null);
const param = useParams();
console.log(param)

useEffect(
    ()=>{
        axios.get(import.meta.env.VITE_API_URL + "/product/" + param.productId).then(
            (Response)=>{
                setProduct(Response.data)
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("Failed to fetch product")
            }
        )
    },[]
)

    return(
        <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">

            {
            product == null? <LoadingAnimation/> : 
            <div className="w-full h-full flex">

                <div className="w-[50%] h-full border">

                    <ImageSlideShow images={product.images}/>

                </div>

                <div className="w-[50%] h-full border"></div>

            </div>
            }
            
        </div>
    )
}