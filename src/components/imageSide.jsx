import { useState } from "react";

export default function ImageSlideShow(props){
const images = props.images;
const[activeImage , setActiveImage] = useState(0)

function getClasses(index){
    if(index == activeImage){
        return "w-[90px] h-[90px] object-contain rounded-2xl border-4 border-secondary cursor-pointer shadow-md"
    }else
    return "w-[80px] h-[80px] object-contain rounded-2xl cursor-pointer shadow-md"
}
    
    return(
        <div className="w-[500px] h-[600px]">
            <img src={images[activeImage]} className="h-[500px] w-full object-cover"/>
            <div className="w-full h-[100px] flex px-12 gap-7 p-3 items-center justify-center">
                {
                    images.map(
                        (img , index)=>{
                            return<img onClick={
                                ()=>{
                                    setActiveImage(index)
                                }
                            }
                             key={index} src={img} className={getClasses(index)}/>
                        }
                    )
                }
            </div>
        </div>
    )
}