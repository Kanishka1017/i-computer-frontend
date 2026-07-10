import { createClient } from "@supabase/supabase-js"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhucXp4enRjcmlicGNvdGJkYXF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMTk4NjQsImV4cCI6MjA5ODg5NTg2NH0.SAphlTSUobSJQMotI9Y4HHXVfBkQtrFGZvIy1z8wLn8"
const supabaseUrl = "https://hnqzxztcribpcotbdaqx.supabase.co"

const supabase = createClient(supabaseUrl , supabaseKey)

export default function uploadFile(file){
    return new Promise(
         (resolve , reject)=>{

            if(file == null){
                reject("No file Provided")
                return;
            }

            const timestamp = new Date().getTime()
            const fileName = timestamp + "-" + file.name

        supabase.storage.from("images").upload(fileName , file , {
        upsert : false,
        cacheControl : 3600
        }).then(
            ()=>{
                const url = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                resolve(url)
            }
        ).catch(
            (error)=>{
            reject("Failde to upload file" , error)
        })


         }
    )
}