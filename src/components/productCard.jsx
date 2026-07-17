import { Link } from "react-router-dom"
import getFormatedPrice from "../utils/price"

export default function ProductCard(props){
    const product = props.product
    return(
    <Link to={"/overview/" + product.productId} className="w-[300px] h-[350px] m-4 rounded-2xl bg-white overflow-hidden shadow-lg hover:[&_.main-image]:opacity-0 relative">

        <div className="bg-white absolute top-0 w-full p-2">
            <img src={product.images[1]} alt={product.name} className="w-full h-[200px] object-cover"/>
        </div>

        <div className="bg-white main-image w-full absolute transition opacity duration-500 p-4 flex justify-center items-center">
            <img src={product.images[0]} alt={product.name} className="w-[220px] h-[200px] object-cover p-4 pt-2"/>
        </div>

        <div className="h-[150px] absolute bottom-0 w-full flex items-center justify-center flex-col  p-2">
            <span className="opacity-20">{product.productId}</span>
            <h1>{product.name}</h1>
            {
                product.labelldPrice > product.price &&
                <p className="text-sm text-red-400 line-through opacity-60">{getFormatedPrice(product.labelldPrice)}</p>
            }
            <p className="font-bold">{getFormatedPrice(product.price)}</p>
        </div>
        

    </Link>
    )
}