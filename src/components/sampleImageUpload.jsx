import { useState } from 'react';
import uploadFile from '../utils/mediaUpload';

export default function Test(){

const [file , setFile] = useState(null)

async function upload(){
    try{

        const url = await uploadFile(file)
        console.log(url)

    }catch(error){
        console.log(error)
    }
}

    return(
    <div className="w-full h-full bg-yellow-600 flex justify-center items-center">

        <input type="file" onChange={
            (e)=>{
                setFile(e.target.files[0])
            }
        }></input>

        <button onClick={upload} className="w-[100px] h-[40px] bg-accent rounded-2xl">upload</button>

    </div>

    )
}