export default function test(){
    return(
    <div className="w-[600px] h-[600px] border-4 relative">
    <div className="w-[500px] h-[500px] bg-amber-300 flex flex-col items-center justify-center relative">

          <div className="w-[75px] h-[75px] bg-blue-600"></div>
          <div className="w-[75px] h-[75px] bg-red-600"> </div>
          <div className="w-[75px] h-[75px] bg-green-500 absolute top-10 right-10"></div>
          <div className="w-[75px] h-[75px] bg-black fixed top-10 right-270 z-10"></div>
          <div className="w-[75px] h-[75px] bg-white"></div>

      </div>
    </div>
    )
}