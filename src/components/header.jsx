import { Link } from "react-router-dom";

export default function header(){
    return(
        <header className="h-[100px] sticky top-0 bg-accent relative flex items-center justify-center relative z-1">

            <div className="flex items-center justify-center absolute left-5 m-3">
                <img src="/logo.png" alt="logo" className="w-[80px]"/>
                <h1 className="text-lg font-bold ml-3 text-white">I-Computer</h1>
            </div>

            <div className="h-full flex justify-center items-center gap-20 ml-120">
                <Link to="/" className="text-white text-lg hover:border-b-2">Home</Link>
                <Link to="/products" className="text-white text-lg hover:border-b-2">products</Link>
                <Link to="/about" className="text-white text-lg hover:border-b-2">About</Link>
                <Link to="/contact" className="text-white text-lg hover:border-b-2">Contact</Link>

            </div>

        </header>
    )
}