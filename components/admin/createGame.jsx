"use client"

import React, { useEffect } from 'react'

import  axios  from 'axios';
import { useRouter } from 'next/navigation';
import {useState } from 'react'
import { toast } from 'react-toastify';

export const CreateGame = () => {

    const [gameFields, setGameFields] =  useState({fee: 0, revivalFee: 0, battleStartTime: 0, regCloseTime: 0, reviveLimit: 0});
    const [gameScheduled, setGameScheduled] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    async function checkGames(){
        try{
            const res = await axios.get("/api/game/current");
            
            if(res.data.status == "ended"){
                setGameScheduled(false)
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async function createGame(){
        try{
            const res = await axios.post("/api/game/create", gameFields);
            toast.success("Game Created");
            window.location.reload();
        }
        catch(err){
            toast.error(err.response.data.error);
        }
    }

    useEffect(()=>{
        checkGames();
    },[])


    if(!gameScheduled){
 if(!isOpen) return (
    <button onClick={()=>{setIsOpen(prev=>!prev)}} className=' bg-jimbo-green/60 px-4 py-2 text-xl rounded-xl hover:bg-jimbo-green/90 mt-5 duration-200'>Create Game</button>
 )
 else

  return (
    <div className='bg-black/40 px-6 py-4 rounded-xl mt-5 flex items-center flex-col relative'>
        <div onClick={()=>{setIsOpen(false)}} className='absolute text-sm top-1 right-3 cursor-pointer hover:text-jimbo-green'>x</div>

    <form className='flex flex-col gap-3 mt-5'> 
        <div className='flex-col flex'>
            <label className='text-xs mb-1 text-jimbo-green'>Fee: </label>
            <input onChange={(e)=>{setGameFields((prev)=>({...prev , fee: e.target.value}))}}  placeholder='0.1 SOL' className='bg-black/30 px-2 py-2 placeholder:text-jimbo-green/30 outline-jimbo-green border-2 border-black/50 rounded-xl' type='number' min={0}></input>
        </div>

        <div className='flex-col flex'>
            <label className='text-xs mb-1 text-jimbo-green'>Revival Fee: </label>
            <input onChange={(e)=>{setGameFields((prev)=>({...prev , revivalFee: e.target.value}))}}  placeholder='0.05 SOL' className='bg-black/30 px-2 py-2 placeholder:text-jimbo-green/30 outline-jimbo-green border-2 border-black/50 rounded-xl' type='number' min={0}></input>
        </div>

        <div className='flex-col flex'>
            <label className='text-xs mb-1 text-jimbo-green'>Revival Limit: </label>
            <input onChange={(e)=>{ setGameFields((prev)=>({...prev , reviveLimit: e.target.value}))}}  placeholder='3' className='bg-black/30 px-2 py-2 placeholder:text-jimbo-green/30 outline-jimbo-green border-2 border-black/50 rounded-xl' type='number' min={0}></input>
        </div>

        <div className='flex-col flex'>
            <label className='text-xs mb-1 text-jimbo-green'>Start Date: </label>
            <input onChange={(e)=>{setGameFields((prev)=>({...prev , battleStartTime: Date.parse(e.target.value)}))}}  placeholder='1 SOL' className='bg-white/30 px-2 py-2 placeholder:text-jimbo-green/30 outline-jimbo-green border-2 border-black/50 rounded-xl' type='datetime-local'></input>
        </div>

        <div className='flex-col flex'>
            <label className='text-xs mb-1 text-jimbo-green'>Regs Closing Date: </label>
            <input onChange={(e)=>{setGameFields((prev)=>({...prev , regCloseTime: Date.parse(e.target.value)}))}}  placeholder='1 SOL' className='bg-white/30 px-2 py-2 placeholder:text-jimbo-green/30 outline-jimbo-green border-2 border-black/50 rounded-xl' type='datetime-local'></input>
        </div>
    </form>

<button onClick={createGame} className=' bg-jimbo-green/60 px-4 py-2 text-lg rounded-xl hover:bg-jimbo-green/90 mt-5 duration-200'>Create Game</button>
    </div>
  )
}}
