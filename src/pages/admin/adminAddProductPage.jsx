import { useState } from "react"

export default function AdminAddProductPage(){

    const [productId , setProductId] = useState();
    const [name, setName] = useState();
    const [description , setDescription] = useState();
    const [altName , setAltName] = useState("");
    const [price , setPrice] = useState();
    const [labelldPrice , setLabelldPrice] = useState();
    const [category , setcategory] = useState("Other");
    const [brand , setBrand] = useState("Standard")
    const [model , setModel] = useState("");
    const [isVisible , setIsVisible] = useState("true");
    
  

    return(
        <div className=" w-full max-h-full flex flex-wrap">

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
                <select value={isVisible} onChange={(e)=>{setBrand(e.target.value)}}className="border-4 rounded-[10px] border-accent h-[100px] p-3 m-3 focus: outline-white">
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </div>
            


        </div>
    )
}