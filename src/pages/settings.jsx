import axios from "axios";
import { useEffect, useState } from "react";
import uploadFile from "../utils/mediaUpload";
import toast from "react-hot-toast";

export default function settingsPage(){

    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const[file, setFile] = useState(null)
    const[existingImageUrl, setExistingImageUrl] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")

    useEffect(
        ()=>{
            const token = localStorage.getItem("token");
            if(token != null){
                axios.get(import.meta.env.VITE_API_URL+"/user/profile",{
                    headers : {
                        "Authorization" :  `Bearer ${token}`
                    }
                }).then(
                    (Response)=>{
                        console.log(Response.data)
                        setFirstName(Response.data.firstName)
                        setLastName(Response.data.lastName)
                        setExistingImageUrl(Response.data.image)
                    }
                ).catch(
                    ()=>{
                        localStorage.removeItem("token");
                        window.location.href="login";
                    }
                )
            }else{
                window.location.href="/login"
            }
        },[]
    )

    async function updateProfile(){
        const token = localStorage.getItem("token");

        const updateInfor = {
            firstName : firstName,
            lastName : lastName,
            image : existingImageUrl
        }

        if(file != null){
            updateInfor.image = await uploadFile(file)
        }

        const respones =  await axios.put(import.meta.env.VITE_API_URL + "/user", updateInfor,{
            headers:{
                "Authorization" :  `Bearer ${token}`,
            },
        })

        localStorage.setItem("token",respones.data.token)

        toast.success("Profile update successfully")
        window.location.reload()
    }

    async function changePassword(){

        if(password != confirmPassword){
            toast.error("password do not match")
            return
        }

        const token = localStorage.getItem("token");
        await axios.post(import.meta.env.VITE_API_URL + "/users/update-password",{
            password: password
        }, {
            headers:{
                "Authorization" :  `Bearer ${token}`,
            },
        })
        toast.success("password change successfully")
        window.location.reload()

    }

    return(
        <div className="w-full min-h-[calc(100vh-100px)] flex flex-row justify-center items-center gap-6 py-6">

            <div className="w-[90%] max-w-[400px] rounded-lg bg-white p-5 flex flex-col gap-3">
                
                <h1 className="text-2xl font-bold text-accent">
                    Account Settings
                </h1>

                <input 
                    value={firstName} 
                    onChange={(e)=>{
                        setFirstName(e.target.value)
                    }}
                    className="w-full h-[50px] p-3 border border-secondary rounded-lg"
                    placeholder="First Name"
                />

                <input 
                    value={lastName} 
                    onChange={(e)=>{
                        setLastName(e.target.value)
                    }}
                    className="w-full h-[50px] p-3 border border-secondary rounded-lg"
                    placeholder="Last Name"
                />

                <input 
                    type="file" 
                    onChange={(e)=>{
                        setFile(e.target.files[0])
                    }}
                    className="w-full h-[50px] p-3 border border-secondary rounded-lg"
                    placeholder="Profile Picture"
                />

                <button 
                    className="w-full h-[50px] bg-accent text-white rounded-lg mt-2"
                    onClick={updateProfile}
                >
                    update Profile
                </button>

            </div>

            <div className="w-[90%] max-w-[400px] rounded-lg bg-white p-5 flex flex-col gap-3">

                <h1 className="text-2xl font-bold text-accent">
                    Change Password
                </h1>
                
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }} 
                    className="w-full h-[50px] p-3 border border-secondary rounded-lg" 
                    placeholder="New Password"
                />

                <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e)=>{
                        setConfirmPassword(e.target.value)
                    }} 
                    className="w-full h-[50px] p-3 border border-secondary rounded-lg" 
                    placeholder="Confirm New Password"
                />

                <button 
                    className="w-full h-[50px] bg-accent text-white rounded-lg mt-2"
                    onClick={changePassword}
                >
                    update Password
                </button>

            </div>

        </div>
    )
}