import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterPage(){

    const [firstName , setFirstName] = useState();
    const [lastName , setLastName] = useState();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState();
    const navigate = useNavigate()
    const googleLogin =  useGoogleLogin(
        {
            onSuccess: (respones)=>{
                axios.post(import.meta.env.VITE_API_URL + "/user/google-login", {token: respones.access_token}).then(
                    (respones)=>{
                        toast.success("Login Successfull")
                        localStorage.setItem("token", respones.data.token)

                        if(respones.data.token == "admin"){
                            navigate("/admin")
                        }else{
                            navigate("/")
                        }
                    }
                ).catch(
                    (err)=>{
                        toast.error(err?.respones?.data?.message || "Google login failed . pleace try again")
                    }
                )
            },

            onError: (error)=>{
                toast.error("Google login failed. pleace try again")
            }
        }
    )


    async function signUp(){

        if(password != confirmPassword){
            toast.error("Password do not match")
            return;
        }
        try{
            const respones = await axios.post(import.meta.env.VITE_API_URL  + "/user",
                {
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    password : password
                }
            )
            console.log(respones)
            toast.success("Sign up Successfully")

                //window.location.href = "/admin"
                navigate("/login")

        }catch(err){
                toast.error(err?.response?.data?.message || "Failed to Sign up")
            }
        
    }

    return(
        <div className="w-full h-full bg-[url('/background.jpg')] bg-cover bg-no-repeat flex">

            <div className="w-[50%] h-full hidden lg:flex flex-col justify-center items-center">

                <img src="/logo.png" className="w-[500px] rounded-2xl mt-[50px]"/>

                <h1 className="m-[20px] text-2xl font-bold text-black">I-COMPUTER</h1>

            </div>

            <div className="w-full lg:w-[50%] h-full flex items-center justify-center">

                <div className="backdrop-blur-md w-[450px] h-[600px] shadow-2x2 rounded-2xl flex flex-col justify-center">

                    <div className="m-5 w-[90%] h-[50px] rounded-2xl outline-none flex items-center justify-between">
                        <input value={firstName}
                        onChange={(e)=>{
                            setFirstName(e.target.value);
                        }
                    }
                    className="w-[45%] h-[50px] p-3 rounded-2xl border border-secondary outline-none"
                    type="text"
                    placeholder="First Name"
                    />

                    <input value={lastName}
                        onChange={(e)=>{
                            setLastName(e.target.value);
                        }
                    }
                    className="w-[45%] h-[50px] p-3 rounded-2xl border border-secondary outline-none"
                    type="text"
                    placeholder="Last Name"
                    />


                    </div>

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

                    <input
                    type="password"
                    placeholder="Confirm Password"
                    className="m-5 p-3 w-[90%] h-[50px] rounded-2xl border border-secondary outline-none"
                    onChange={
                        (e)=>{
                            setConfirmPassword(e.target.value)
                        }
                    }
                    />

                    <button onClick={signUp} className="m-5 p-3 w-[90%] h-[50px] bg-accent rounded-2xl text-white font-bold">Sign up</button>

                    <button onClick={googleLogin} className="m-5 p-3 w-[90%] h-[50px] border border border-accent rounded-2xl text-white font-bold">Sign up with Google</button>

                    <p className="w-full text-right">Already have an account? <Link to="/Login" className="text-accent p-[10px]">Sign Up</Link></p>
                </div>

            </div>    

        </div>
    )
}