import { useState } from "react"
import formatDateTime from "../utils/formatDateTime";
import getFormatedPrice from "../utils/price";
import { IoClose } from "react-icons/io5";

export default function CustomerViewOrderInforModal(props){
    const[isVisible , setIsVisible] = useState(false);
    const order = props.order;


    return(
    <>
        <button className="bg-accent text-white px-3 py-1 rounded-2xl cursor-pointer hover:bg-secondary whitespace-nowrap" onClick={()=> setIsVisible(true)}>
                    view details
        </button>

        {
            isVisible && (
                <div className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="w-[600px] h-[600px] bg-white rounded-md relative">
                        <button className="absolute w-10 h-10 flex items-center justify-center top-[-30px] right-[-30px] text-red-600 text-2xl rounded-full hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={()=>setIsVisible(false)}
                        >
                            <IoClose />
                        </button>

                        <div className="w-full h-[200px] bg-accent rounded-md">

                            <div className="w-full h-[40px] flex p-4 justify-between">
                                <h1 className="text-2xl font-semibold text-white">Order Id: {order.orderId}</h1>
                                <h2 className="text-lg font-semibold text-white">{formatDateTime(order.date)}</h2>
                            </div>

                            <div className="w-full h-[40px] flex items-center">
                                <h1 className="text-lg font-semibold text-white p-5">
                                    {order.firstName + " " + order.lastName}
                                </h1>
                                <h2 className="text-white p-5">{order.email}</h2>
                            </div>

                            <div className="w-full h-[40px] flex justify-between items-center">
                                <h1 className="text-white text-2xl font-bold p-5">{getFormatedPrice(order.total)}</h1>
                                <h2 className="text-white p-5 text-lg font-semibold">Status: {order.status}</h2>
                
                            </div>

                            <div className="w-full flex items-center">
                                <h1 className="text-white font-semibold p-5 text-lg">Notes: </h1>
                            <p>{order.note}</p>
                            </div>
                        </div>

                        <div className="w-full h-[400px] p-5 overflow-y-scroll">
                            {
                                order.items.map(
                                    (item)=>{
                                        return(
                                            <div className="w-full h-auto flex items-center justify-between mb-3">

                                                <div className="flex items-center gap-3">
                                                    <img src={item.Image} alt={item.name} className="h-[60px] w-[60px] object-cover"></img>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-secondary">{item.name}</span>
                                                        <span className="text-sm text-secondary/70">Qty: {item.qty}</span>
                                                    </div>

                                                </div>
                                                <span className="text-sm font-semibold text-secondary">{getFormatedPrice(item.price)}</span>

                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>

                    </div>
                </div>
            )
        }
    </>
    )
}