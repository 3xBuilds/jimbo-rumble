"use client"

import React, {useState, useEffect} from 'react'
import axios from "axios"
import moment from 'moment'
import { RiDeleteBin6Fill } from "react-icons/ri";
import {FaFlag} from "react-icons/fa"
import {toast} from "react-toastify"

import usePhantomProvider from '@/hooks/usePhantomProvider';
import paySolana from '@/utils/paySolana';

export const UpcomingGames = () => {

    const [upcomingGames, setUpcomingGames] = useState([])

    async function getGames(){
        try{
            const res = await axios.get("/api/game");
            const scheduledGames = res.data.games
            
            setUpcomingGames(scheduledGames);

        }
        catch(err){
        }
    }

    async function deleteGame(id){
        try{
            await axios.delete("/api/admin/game/"+id).then((res)=>{
                getGames();
            });

        }
        catch(err){
        }
    }

    async function startGame(id){
        try{
            await axios.get("/api/admin/game/"+id+"/start").then((res)=>{
                toast.success("Game Started Successfully");
            });
            getGames();
        }
        catch(err){
            toast.error("Game could not start");
        }
    }

    async function endGame(id){
        try{
            const res = await axios.get("/api/admin/game/"+id+"/end")

            toast.success(res.data.message);
            getGames();
        }
        catch(err){
            toast.error(err.response.data.error);
        }
    }

    async function sendSolana(){
        try{
            await paySolana(provider, game?.rewardPool * 0.7 * 1000000000, game.winner);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getGames();
    },[])

  return (
    <div className='mt-10 w-[90%] mx-auto text-center flex flex-col items-center'>
        <h3 className='text-jimbo-green text-2xl my-5'>Games</h3>
        <div className='bg-black/40 rounded-xl px-6 py-3 w-[90%] max-h-[30rem] overflow-scroll noscr'>
            {upcomingGames.map((i)=>(
                <div className={`my-4 p-3 rounded-xl ${i.status == "upcoming" ? " bg-gradient-to-br from-jimbo-green/80 to-jimbo-green/20 ": " bg-gray-400 "} ${i.status == "ended" ? " bg-slate-600 " : i.status == "ongoing" ? " bg-yellow-500 " : " bg-gradient-to-br from-jimbo-green/80 to-jimbo-green/20 "} `}>
                    {
                    // i.status == "upcoming" &&
                    <div>
                        <button onClick={()=>{deleteGame(i._id)}} className='bg-red-500 hover:bg-red-400 float-left duration-200 px-2 py-2 rounded-2'><RiDeleteBin6Fill /></button>
                    <button onClick={()=>{startGame(i._id)}} className='bg-blue-500 hover:bg-blue-400 float-right duration-200 px-2 py-2 rounded-2'><FaFlag/></button>
                    </div>}
                    
                    <h2 className='text-xl text-center mb-5'>Entrants: {i.players.length} -- ({i.status})</h2>
                    <div className='grid grid-flow-col text-center gap-3'>
                        <h2 className='bg-white/50 text-black px-5 py-1 rounded'>Registration Closes: <br /> {moment(Number(i.regCloseTime)).format('LLL')}</h2>
                        <h2 className='bg-white/50 text-black px-5 py-1 rounded'>Starts on: <br /> {moment(Number(i.battleStartTime)).format('LLL')}</h2>
                    </div>
                    <div className='grid grid-flow-col text-center bg-black/60 rounded py-1 mt-2'>
                        <h2>Fee: {i.fee}</h2>
                        <h2>Revival Fee: {i.revivalFee}</h2>
                        <h2>Max Revives: {i.reviveLimit}</h2>
                    </div>
                    <button onClick={()=>{
                        startGame(i._id);
                    }} className='bg-black/30 border-jimbo-green border-[1px] hover:bg-white/50 hover:text-black duration-300 px-5 py-1 rounded-lg mt-4'>{i.status=="upcoming" ? "Start Round" : i.status=="ongoing"? "Start Next Round": "Resume Game"}</button>
                    {i.status!=="ended" && <button onClick={()=>{
                        endGame(i._id);
                    }} className='bg-black/30 border-jimbo-green border-[1px] ml-2 hover:bg-white/50 hover:text-black duration-300 px-5 py-1 rounded-lg mt-4'>End Game</button>}

                    {i.status == "ended" && <button className='bg-black/30 border-jimbo-green border-[1px] ml-2 hover:bg-white/50 hover:text-black duration-300 px-5 py-1 rounded-lg mt-4' onClick={sendSolana}>Distribute Reward</button>}
                </div>
            ))}
        </div>
    </div>
  )
}
