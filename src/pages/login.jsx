import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    //function Login(){

      // axios.post("http://localhost:3000/user/login",
        //{
        //email : email,
        //password : password
       //}

    //).then(
       // (respones)=>{
        //console.log(respones)
    //}

    //).catch(
        //(error)=>{
            //console.log(error)
            //console.log("Login Failed")
        //}

    //)
    //}

    async function Login(){
        try{
            const respones = await axios.post(import.meta.env.VITE_API_URL  + "/user/login",
                {
                    email : email,
                    password : password
                }
            )
            console.log(respones)
            toast.success("Login Successfull")

            localStorage.setItem("token", respones.data.token)
            
            if(respones.data.role == "admin"){
                
                //window.location.href = "/admin"
                navigate("/admin")

            }else{
                //we should go to custommer page
            }

        }catch(error){
                console.log(error)
                console.log("Login Failed")
                toast.error("Login Failed")
            }
        
    }

    return(
        <div className="w-full h-full bg-[url('/background.jpg')] bg-cover bg-no-repeat flex">

            <div className="w-[50%] h-full flex flex-col justify-center items-center">

                <img src="/logo.png" className="w-[500px] rounded-2xl mt-[50px]"/>

                <h1 className="m-[20px] text-2xl font-bold text-black">I-COMPUTER</h1>

            </div>

            <div className="w-[50%] h-full flex items-center justify-center">

                <div className="backdrop-blur-md w-[450px] h-[600px] shadow-2x2 rounded-2xl flex flex-col justify-center">

                    <input
                    type="email"
                    placeholder="Email"
                    onChange={
                        (e)=>{
                            setEmail(e.target.value)
                        }
                    }
                    className="m-5 p-3 w-[90%] h-[50px] rounded-2xl border border-secondary outline-none" 
                    />

                    <input
                    type="password"
                    placeholder="Password"
                    className="m-5 p-3 w-[90%] h-[50px] rounded-2xl border border-secondary outline-none"
                    onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    }
                    />

                    <p className="w-full text-right">Forgot Pasword? <Link to="/forgot-password" className="text-accent p-[10px]">Reset</Link></p>

                    <button onClick={Login} className="m-5 p-3 w-[90%] h-[50px] bg-accent rounded-2xl text-white font-bold">Login</button>

                    <button className="m-5 p-3 w-[90%] h-[50px] border border border-accent rounded-2xl text-white font-bold">Login with Google</button>

                    <p className="w-full text-right">Don't have an account? <Link to="/register" className="text-accent p-[10px]">Register</Link></p>
                </div>

            </div>    

        </div>
    )
}