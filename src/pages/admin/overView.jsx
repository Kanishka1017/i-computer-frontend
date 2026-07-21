import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom"
import LoadingAnimation from "../../components/loadingAnimation";
import ImageSlideShow from "../../components/imageSide";
import getFormatedPrice from "../../utils/price";
import Getcart, { addToCart } from "../../utils/cart";

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

                <div className="w-[50%] h-full flex items-center justify-center">

                    <ImageSlideShow images={product.images}/>

                </div>

                <div className="w-[50%] h-full p-5 flex  justify-center flex-col">

                    <h1 className="font-bold text-2xl text-secondary">{product.name}

                        {
                            product.altName.map((altName , index)=>{
                                return(
                                    <span key={index} className="text-gray-500 font-medium"> | {altName}</span>
                                )
                            })
                        }

                    </h1>

                    <p className="font-semibold mt-5 mb-2 text-lg">
                        <span>{product.model || ""}</span>
                        <span>{product.brand || ""}</span>
                    </p>

                    <p className="text-sm mb-3 text-gray-500">{product.productId}</p>

                    <p className="text-2xl font-bold">{getFormatedPrice(product.price)}</p>
                    
                    {
                        product.labelldPrice &&
                    <p className="line-through text-lg text-gray-500 mt-2">{getFormatedPrice(product.labelldPrice)}</p>
                    }

                    <p className="text-md mt-4">{product.description}</p>

                    <div className="w-full h-[100px]  justify-center mt-7">

                        <button className="px-5 py-3 bg-green-400 mr-10 rounded-2xl hover:bg-green-600 cursor-pointer" onClick={
                            ()=>{
                                //localStorage.removeItem("cart");
                                addToCart(product , 1)
                                toast.success(product.name + " added to cart")
                            }
                        }>Add to cart</button>

                        <Link to={"/cheakout"} state={[{
                            product : {
                                name : product.name,
                                price : product.price,
                                labelldPrice : product.labelldPrice,
                                image : product.images[0],
                                productId : product.productId,
                            },
                            qty : 1
                        }]} className="px-5 py-3 bg-blue-400 rounded-2xl hover:bg-blue-600 cursor-pointer">Buy now</Link>

                    </div>

                </div>

            </div>
            }
            
        </div>
    )
}