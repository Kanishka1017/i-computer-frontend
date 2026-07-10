import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

export default function AdminUpdateProductPage(){

    const location = useLocation()
    const [productId , setProductId] = useState(location.state.productId);
    const [name, setName] = useState(location.state.name);
    const [description , setDescription] = useState(location.state.description);
    const [altName , setAltName] = useState(location.state.altName.join(","));
    const [price , setPrice] = useState(location.state.price);
    const [labelldPrice , setLabelldPrice] = useState(location.state.labelldPrice);
    const [category , setcategory] = useState(location.state.category);
    const [brand , setBrand] = useState(location.state.brand)
    const [model , setModel] = useState(location.state.model);
    const [isVisible , setIsVisible] = useState(location.state.isVisible);
    const [files , setFiles] = useState([]);
    const navigate = useNavigate()

    console.log(location)
    
    async function handleUpdateProduct(){
        try{

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

            let imageURLs = await Promise.all(fileUploadPromises);
            if(imageURLs == 0){
                imageURLs = location.state.images
            }

            await axios.put(import.meta.env.VITE_API_URL + "/product/" + productId,{
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

            toast.success("Product Updated Successfull")

             navigate("/admin/product");

        }catch(err){
            //toast.error("Failed To Add Product")
            toast.error(err?.response?.data?.message || "Failed to Update Product")
            console.log(err)
            return;
        }

    }

    return(
        <div className=" w-full max-h-full flex flex-wrap items-start overflow-y-scroll hide-scroll-track">

            <h1 className="w-full text-4xl font-bold mb-4 sticky top-0 bg-primary">Edit Products</h1>

            <div className="w-[50%] h-[100px] flex flex-col">

                <label className="font-bold ml-3">Product ID</label>
                <input value={productId} disabled onChange={(e)=>{setProductId(e.target.value)}} placeholder="EX: ID000" className="border-4 rounded-[10px] border-accent h-[50px] p-3 m-3 focus: outline-white"></input>
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
                <button onClick={handleUpdateProduct} className="bg-accent text-white font-bold px-6 py-3 rounded-3xl hover:bg-secondary mr-3">Update Product</button>
                
            </div>
            


        </div>
    )
}

