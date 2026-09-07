import axios from "axios";
import { useEffect, useState } from "react"
import LoadingAnimation from "../components/loadingAnimation";
import getFormatedPrice from "../utils/price";
import formatDateTime from "../utils/formatDateTime";
import toast from "react-hot-toast";
import CustomerViewOrderInforModal from "../components/CustomerViewOrderInForModal";

export default function MyOrdersPage(){

    const[orders , setOrders] = useState([]);
    const[pageNumber , setPageNumber] = useState(1);
    const[pageSize , setPageSize] = useState(10);
    const[totalPages , setTotalPages] = useState(0);
    const[isLoaded , setIsLoaded] = useState(false);

    useEffect(
        ()=>{
            if(!isLoaded){
                const token = localStorage.getItem("token");
                axios.get(import.meta.env.VITE_API_URL+"/order/"+pageSize+"/"+pageNumber,
                    {
                        headers:{
                            Authorization: "Bearer "+token
                        }
                    }
                ).then(
                    (Response)=>{

                        console.log(Response.data);
                        console.log(Response.data.orders);

                        setOrders(Response.data.orders);
                        setTotalPages(Response.data.totalPages)
                        setIsLoaded(true);
                    }
                ).catch((error)=>{
                    console.error(error);
                })
            }
        },
        [isLoaded]
    )


    return(
        <div className="w-full h-full overflow-x-scroll hide-scroll-track relative">

            <div className="sticky left-0 flex items-center justify-between px-5 py-5 bg-primary border-b border-secondary/10 text-2xl font-bold">

                    <div>
                        <h1>Orders</h1>
                        <p className="text-sm text-secondary/50">Manage your ordes at a glance</p>
                    </div>

            </div>

            {!isLoaded ? (
                                
                <div className="w-full h-full flex items-center justify-center">
                    
                    <LoadingAnimation/>
                    
                </div>
                ) : (

            <table className="min-w-[1100px] w-full text-sm">
                <thead className="sticky top-0 z-10 bg-white 400/30">

                    <tr className="border-b border-secondary/10">
                        <th className="px-5 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70">Order Id</th>
                        <th className="px-10 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70 whitespace-nowrap">Customer Name</th>
                        <th className="px-5 py-3 text-center text-xm font-semibold uppercase tracking-wide text-secondary/70">Email</th>
                        <th className="px-10 py-3 text-center text-xm font-semibold uppercase tracking-wide text-secondary/70">Date</th>
                        <th className="px-10 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70 whitespace-nowrap">Total Amount</th>
                        <th className="px-10 py-3 text-left text-xm font-semibold uppercase tracking-wide text-secondary/70">Status</th>

                        <th className="px-5">Actions</th>
                    </tr>
                </thead>

<tbody>
    {orders.map((order)=>(
        <tr key={order.id} className="border-b border-secondary/10">
            <td className="px-5 py-3 text-center">{order.orderId}</td>
            <td className="px-5 py-3 text-center">{order.firstName + " "+order.lastName}</td>
            <td className="px-5 py-3 text-center">{order.email}</td>
            <td className="px-5 py-3 text-center whitespace-nowrap">{formatDateTime(order.date)}</td>
             <td className="px-5 py-3 text-center">{getFormatedPrice(order.total)}</td>
            <td className="px-5 py-3 text-center">{order.status}</td>
            <td className="px-5 py-3 text-center">
                <CustomerViewOrderInforModal order ={order}/>
            </td>
        </tr>
    ))}
</tbody>

        </table>
        )
        }
        <div className="w-full h-[50px] overflow-clip sticky bottom-0 left-0 flex items-center justify-center mt-7">
            <div className="w-[500px] h-full bg-white shadow-2xs rounded-full flex items-center justify-center">
                <button onClick={
                    ()=>{
                        if(pageNumber > 1){
                            setPageNumber(pageNumber - 1);
                            setIsLoaded(false);
                        }else{
                            toast.success("You are on the first page")
                        }
                    }
                } className="bg-accent px-1 w-[100px] ml-1 text-white rounded-full py-2 font-medium cursor-pointer hover:bg-accent/80">
                    Previous
                </button>

                <span className="text-center w-[100px]">page {pageNumber} of {totalPages}</span>

                <button onClick={
                    ()=>{
                        if(pageNumber < totalPages){
                            setPageNumber(pageNumber + 1)
                            setIsLoaded(false)
                        }else{
                            toast.success("You are on the last page")
                        }
                    }
                }className="bg-accent px-1 w-[100px] text-white rounded-full py-2 font-medium cursor-pointer hover:bg-accent/80">
                    Next
                </button>

                <select value = {pageSize} onChange={(e) =>{
                    setPageSize(parseInt(e.target.value));
                    setIsLoaded(false)
                }} className="ml-5 border border-secondary/20 rounded px-3 py-2 text-sm"
                >
                    <option value={2}>2 per page</option>
                    <option value={5}>5 per page</option>
                    <option value={8}>8 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={15}>15 per page</option>
                    
                </select>

            </div>
        </div>
            
            
        </div>
    )
}