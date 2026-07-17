import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

export default function AdminAddProductPage(){

    const [productId , setProductId] = useState("");
    const [name, setName] = useState("");
    const [description , setDescription] = useState("");
    const [altName , setAltName] = useState("");
    const [price , setPrice] = useState();
    const [labelldPrice , setLabelldPrice] = useState();
    const [category , setcategory] = useState("Others");
    const [brand , setBrand] = useState("Standard")
    const [model , setModel] = useState("");
    const [isVisible , setIsVisible] = useState("true");
    const [files , setFiles] = useState([]);
    const navigate = useNavigate()
    
    async function AddProductHandle(){
        try{

            if(name == ""){
                toast.error("product name cannot be empty")
                return;
            }

            const token = localStorage.getItem("token");

            if(token == null){
                toast.error("You must be loging in to the Product")
                window.location.href = "/login";
                return
            }

            const fileUploadPromises =[];
            for(let i=0 ; i<files.length ; i++){
                fileUploadPromises[i] = uploadFile(files[i])
            }

            const imageURLs = await Promise.all(fileUploadPromises);
            

            await axios.post(import.meta.env.VITE_API_URL + "/product",{
                productId : productId,
                name : name,
                description : description,
                altName : altName.split(","),
                price : price,
                labelldPrice : labelldPrice,
                images : imageURLs,
                category : category,
                brand : brand,
                model : model,
                isVisible : isVisible,
               

            },{headers:{
                Authorization: "Bearer " + token
            }})

            toast.success("Product Add Successfull")

             navigate("/admin/product");

        }catch(err){
            //toast.error("Failed To Add Product")
            toast.error(err?.response?.data?.message || "Failed to Add Product")
            console.log(err)
            return;
        }

    }

    return(
        <div className=" w-full max-h-full flex flex-wrap items-start overflow-y-scroll hide-scroll-track">

            <h1 className="w-full text-4xl font-bold mb-4 sticky top-0 bg-primary">Add New Product</h1>

            <div className="w-[50%] h-[100px] flex flex-col">

                <label className="font-bold ml-3">Product ID</label>
                <input value={productId} onChange={(e)=>{setProductId(e.target.value)}} placeholder="EX: ID000" className="border-4 rounded-[10px] border-accent h-[50px] p-3 m-3 focus: outline-white"></input>
            </div>

            <div className="w-[50%] h-[100px] flex flex-col">
                <label className="font-bold ml-3">Name</label>
                <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="EX: Laptop" className="border-4 rounded-[10px] border-accent h-[50px] p-3 m-3 focus: outline-white"></input>
            </div>

            <div className="w-full h-[170px] flex flex-col">
                <label className="font-bold ml-3">Description</label>
                <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} placeholder="Description" className="border-4 rounded-[10px] border-accent h-[100px] p-3 m-3 focus: outline-white"></textarea>
            </div>

            <div className="w-full h-[100px] flex flex-col">
                <label className="font-bold ml-3">Images</label>
                <input multiple type="file" onChange={(e)=>{setFiles(e.target.files)}} className="border-4 rounded-[10px] border-accent h-[50px] p-3 m-3 focus: outline-white"></input>
            </div>

            <div className="w-full h-[100px] flex flex-col">
                <label className="font-bold ml-3">Alternative Name</label>
                <input value={altName} onChange={(e)=>{setAltName(e.target.value)}} placeholder="Description" className="border-4 rounded-[10px] border-accent h-[50px] p-3 m-3 focus: outline-white"></input>
            </div>

            <div className="w-[50%] h-[100px] flex flex-col">
                <label className="font-bold ml-3">Price</label>
                <input value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder="Rs.00" className="border-4 rounded-[10px] border-accent h-[100px] p-3 m-3 focus: outline-white"></input>
            </div>

            <div className="w-[50%] h-[100px] flex flex-col">
                <label className="font-bold ml-3">Label Price</label>
                <input value={labelldPrice} onChange={(e)=>{setLabelldPrice(e.target.value)}} placeholder="Rs.00" className="border-4 rounded-[10px] border-accent h-[100px] p-3 m-3 focus: outline-white"></input>
            </div>

            <div className="w-[25%] h-[100px] flex flex-col">
                <label className="font-bold ml-3">Categories</label>
                <select value={category} onChange={(e)=>{setcategory(e.target.value)}}className="border-4 rounded-[10px] border-accent h-[100px] p-3 m-3 focus: outline-white">
                    <option value="Others">Others</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Desktops">Desktops</option>
                    <option value="Components">Components</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Peripherals">Peripherals</option>
                </select>
            </div>

            <div className="w-[25%] h-[100px] flex flex-col">
                <label className="font-bold ml-3">Brand</label>
                <select value={brand} onChange={(e)=>{setBrand(e.target.value)}}className="border-4 rounded-[10px] border-accent h-[100px] p-3 m-3 focus: outline-white">
                    <option value="Genaric">Genaric</option>
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="MSI">MSI</option>
                    <option value="Apple">Apple</option>
                    <option value="Asus">Asus</option>
                    <option value="Acer">Acer</option>
                </select>
            </div>

            <div className="w-[25%] h-[100px] flex flex-col">
                <label className="font-bold ml-3">Model</label>
                <input value={model} onChange={(e)=>{setModel(e.target.value)}} placeholder="Model" className="border-4 rounded-[10px] border-accent h-[100px] p-3 m-3 focus: outline-white"></input>
            </div>

            <div className="w-[25%] h-[100px] flex flex-col">
                <label className="font-bold ml-3">Is Visible</label>
                <select value={isVisible} onChange={(e)=>{setIsVisible(e.target.value)}}className="border-4 rounded-[10px] border-accent h-[100px] p-3 m-3 focus: outline-white">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </div>

            <div className="bg-white w-full h-[80px] rounded-b-2xl sticky bottom-0 flex justify-end items-center shadow-2xs gap-3">

                <button className="bg-gray-400 rounded-3xl px-6 py-3 hover:bg-gray-500">Cansel</button>
                <button onClick={AddProductHandle} className="bg-accent text-white font-bold px-6 py-3 rounded-3xl hover:bg-secondary mr-3">Add Product</button>
                
            </div>
            


        </div>
    )
}

