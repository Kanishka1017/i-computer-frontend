import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function AdminProductPage(){
    return(
        <div className="w-full h-full overflow-y-scroll">
           <Link to="/admin/add_product" className="text-white bg-accent w-[40px] h-[40px] flex items-center justify-center rounded-[10px] hover:rounded-full fixed bottom-10 right-14">
                <FaPlus/>
           </Link>
        </div>
    )
}