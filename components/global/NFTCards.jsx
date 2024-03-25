"use client"

import Image from "next/image"

const NFTCard = ({id, username, nftname, type, image, setChosen, selected, joinBattle}) => {

  if(type==="user" && selected) return (
    <div className={`border-[1px] border-jimbo-green flex flex-col justify-between rounded-lg w-52 min-w-52 p-2 pb-0 bg-jimbo-green/30`}>
        <div className={`w-full h-44 bg-gradient-to-br from-jimbo-green to-white rounded overflow-hidden relative `}>
            <h3 className="bg-white absolute top-0 left-0 text-black text-xs w-fit px-5 py-1 rounded-br-lg shadow shadow-black/25">{nftname}</h3>
            {image && <Image width={600} height={600} src={image} className="w-full h-full object-cover"/>}
        </div>
        <h3 className="text-white text-center mt-2 leading-none">0.1 <span className="text-jimbo-green">SOL</span></h3>
        <button onClick={()=>{
          joinBattle();
        }} className="w-full rounded-md bg-gradient-to-br from-jimbo-green border-jimbo-green border-[1px] to-jimbo-black text-black hover:brightness-125 cursor-pointer py-1.5 my-2">JOIN NOW</button>
    </div>
  )

  if(type==="user")return (
    <div className={`border-[1px] border-jimbo-green flex flex-col justify-between rounded-lg w-52 min-w-52 p-2 pb-0 bg-jimbo-green/20`}>
        <div className={`w-full h-48 bg-gradient-to-br from-jimbo-green to-white rounded overflow-hidden relative `}>
            <h3 className="bg-white absolute top-0 left-0 text-black text-xs w-fit px-5 py-1 rounded-br-lg shadow shadow-black/25">{nftname}</h3>
            {image && <Image width={600} height={600} src={image} className="w-full h-full object-cover"/>}
        </div>
        <button className="w-full rounded-md bg-gradient-to-br from-jimbo-green to-jimbo-black text-black hover:brightness-125 cursor-pointer py-1.5 my-2" onClick={() => {setChosen(id)}}>CHOOSE</button>
    </div>
  )

  else if(type==="selected") return (
    <div className={`border-[1px] rounded-lg w-52 min-w-52 p-2 pb-0 bg-jimbo-green/60 border-white`}>
        <div className={`w-full h-52 ${type} bg-gradient-to-br from-jimbo-green to-white rounded overflow-hidden relative ${type==="selected" && " border-[1px] border-jimbo-green "}`}>
            <h3 className="bg-white absolute top-0 left-0 text-black text-xs w-fit px-5 py-1 rounded-br-lg shadow shadow-black/25">You</h3>
            {image && <Image width={600} height={600} src={image} className="w-full h-full object-cover"/>}
        </div>
        <div className="flex flex-row items-center justify-between my-1 px-1">
            <h3 className="text-white text-sm w-20 overflow-clip text-ellipsis">{username || "---------"}</h3>
            <h3 className="text-jimbo-green text-[10px]">{nftname || "-----"}</h3>
        </div>
    </div>
  )

  else return (
    <div className={`border-[1px] border-jimbo-green rounded-lg w-52 min-w-52 p-2 pb-0  bg-jimbo-green/20 `}>
        <div className={`w-full h-52 ${type} bg-gradient-to-br from-jimbo-green to-white rounded overflow-hidden relative `}>
            {image && <Image width={600} height={600} src={image} className="w-full h-full object-cover"/>}
        </div>
        <div className="flex flex-row items-center justify-between my-1 px-1">
            <h3 className="text-white text-sm w-20 overflow-clip text-ellipsis">{username || "---------"}</h3>
            <h3 className="text-jimbo-green text-[10px]">{nftname || "-----"}</h3>
        </div>
    </div>
  )
}

export default NFTCard