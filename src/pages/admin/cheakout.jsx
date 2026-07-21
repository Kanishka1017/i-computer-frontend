import { useState } from "react"
import Getcart, { addToCart, getCartTotal } from "../../utils/cart"
import { FaMinus, FaPlus } from "react-icons/fa"
import getFormatedPrice from "../../utils/price"
import { useLocation, useNavigate } from "react-router-dom"

export default function Cheakout(){

    const location = useLocation();
    const[cart , setCart] = useState(location.state || [])
    const navigate = useNavigate()

    if(location.state == null){
        navigate("/product")
    }

    return(
        <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll">

            <div className=" w-full flex justify-center items-center flex-col gap-4 p-6 ">

                {
                    cart.map((cartItem , index)=>{
                    return (
                        <div key={index} className="w-[600px] h-[150px] bg-white flex rounded-lg overflow-hidden">
                            <img className="h-[150px] object-cover aspect-square"src={cartItem.product.image} alt={cartItem.name}/>

                            <div className="h-full w-[300px] p-3 ml-2">

                                <p className="text-xs text-gray-500">{cartItem.product.productId}</p>
                                <h1 className="font-bold text-lg">{cartItem.product.name}</h1>

                                <div className="w-[210px] h-[50px] border border-accent rounded-full mt-2 overflow-hidden  flex">
                                    <button onClick={
                                        ()=>{
                                          const newCart = [...cart]
                                          newCart[index].qty = newCart[index].qty - 1
                                          if(newCart[index].qty <=0){
                                            newCart.splice(index,1)
                                          }
                                          setCart(newCart)
                                        }
                                    } className="h-full w-[70px] flex items-center justify-center border-r border-r-accent cursor-pointer text-lg font-bold hover:bg-accent">
                                        <FaMinus />
                                    </button>

                                    <span className="w-[70px] h-full flex items-center justify-center font-bold text-lg text-gray-500">
                                        {cartItem.qty}
                                    </span>

                                    <button onClick={
                                        ()=>{
                                            const newCart = [...cart]
                                            newCart[index].qty = newCart[index].qty + 1
                                            setCart(newCart)
                                        }
                                    } className="w-[70px] h-full border-l border-l-accent flex items-center justify-center cursor-pointer text-lg font-bold hover:bg-accent">
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>

                            <div className="w-[170px] h-full flex flex-col justify-center items-end p-2">
                                {
                                    cartItem.product.labelldPrice>cartItem.product.price && (
                                        <span className="text-sm text-gray-500 line-through"> {getFormatedPrice(cartItem.product.labelldPrice)}</span>
                                    )
                                }

                                <span className="text-sm text-secondary font-semibold">{getFormatedPrice(cartItem.product.price)}</span>

                                <span className="text- text-secondary font-bold">{getFormatedPrice(cartItem.product.price * cartItem.qty)}</span>
                            </div>
                   
                        </div>
                   )
                })
                }

                <div className="w-[600px] h-[100px] rounded-xl bg-white sticky bottom-0 shadow flex flex items-center justify-center">
                    <button className="text-lg absolute left-1 font-semibold px-2 py-2 rounded-2xl bg-accent text-white hover:text-secondary">Buy Now</button>
                    <span className="font-bold absolute right-5 text-lg border-double border-b-4">{getFormatedPrice(getCartTotal(cart))}</span>
                </div>


            </div>
             
        </div>
    )
}