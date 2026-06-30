import { useState } from "react";
export default function Test(){

    const[count, setCount] = useState(0)
    const[status, setStatus] = useState("Sleep")
    const[isVisible, setIsVisible] = useState(true)

    return(
    <div className="w-full h-full bg-yellow-600 flex justify-center items-center">

        <h1>{isVisible}</h1>
        <button onClick={
            ()=>{
                setIsVisible(!isVisible)
            }

            //if else
        } className=" w-[50px] h-[50px] bg-red-700">{isVisible?"X" : "O"}</button>

            //if
        {isVisible && <div className="w-[400px] h-[400px] bg-white flex flex-col justify-center items-center">

            <h1 className="text-[55px]">{count}</h1>

            <div className="w-full h-[50px] flex justify-center items-center gap-2">

                <button onClick={
                    ()=>{
                        setCount(count - 1)
                    }
                } className="w-[100px] h-[45px] text-white bg-red-700">Decrement</button>

                <button onClick={
                    ()=>{
                        setCount(count + 1)
                    }
                } className="w-[100px] h-[45px] text-white bg-green-700">Increment</button>

            </div>


            <h1 className="text-[55px]">{status}</h1>

            <div className="w-full h-[50px] flex justify-center items-center gap-2">

                <button onClick={
                    ()=>{
                        setStatus("Sleep")
                    }
                } className="w-[100px] h-[45px] text-white bg-red-700">Sleep</button>

                <button onClick={
                    ()=>{
                        setStatus("Awake")
                    }
                } className="w-[100px] h-[45px] text-white bg-green-700">Awake</button>


            </div>

        </div>}

    </div>

    )
}