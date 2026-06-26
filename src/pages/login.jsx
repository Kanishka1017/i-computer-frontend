import { Link } from "react-router-dom";

export default function LoginPage(){
    return(
        <div className="w-full h-full bg-[url('/background.jpg')] bg-cover no-repeat flex">
            <div className="w-[50%] h-full flex flex-col justify-center items-center">
                <img src="/logo.png" className="w-[500px] rounded-2xl mt-[50px]"/>
                <h1 className="m-[20px] text-2xl font-bold text-black">I-COMPUTER</h1>
            </div>

            <div className="w-[50%] h-full flex items-center justify-center">
                <div className="backdrop-blur-md w-[450px] h-[600px] shadow-2x2 rounded-2xl flex flex-col justify-center">
                    <input type="email" placeholder="Email" className="m-5 p-3 w-[90%] h-[50px] rounded-2xl border border-secondary outline-none" />
                    <input type="password" placeholder="Password" className="m-5 p-3 w-[90%] h-[50px] rounded-2xl border border-secondary outline-none" />
                    <p className="w-full text-right">Forgot Pasword? <Link to="/forgot-password" className="text-accent p-[10px]">Reset</Link></p>
                    <button className="m-5 p-3 w-[90%] h-[50px] bg-accent rounded-2xl text-white font-bold">Login</button>
                    <button className="m-5 p-3 w-[90%] h-[50px] border border border-accent rounded-2xl text-white font-bold">Login with Google</button>
                    <p className="w-full text-right">Don'y have an account? <Link to="/register" className="text-accent p-[10px]">Register</Link></p>
                </div>
            </div>    
        </div>
    )
}