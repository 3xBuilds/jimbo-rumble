"use client"

import React, {useState, useEffect} from 'react'
import axios from "axios"
import moment from 'moment'

export const UpcomingGames = () => {

    const [upcomingGames, setUpcomingGames] = useState([])

    async function getGames(){
        try{
            const res = await axios.get("/api/game");
            const scheduledGames = res.data.games
            
            setUpcomingGames(scheduledGames);

        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getGames();
    },[])

  return (
    <div className='mt-10 w-[90%] mx-auto text-center flex flex-col items-center'>
        <h3 className='text-jimbo-green text-2xl my-5'>Upcoming Games</h3>
        <div className='bg-black/40 rounded-xl px-6 py-3 w-[90%] max-h-[30rem] overflow-scroll'>
            {upcomingGames.map((i)=>(
                <div className={`my-4 p-3 rounded-xl ${i.status == "upcoming" ? " bg-gradient-to-br from-jimbo-green/80 to-jimbo-green/20 ": " bg-gray-400 "} `}>
                    <div className='grid grid-flow-col text-center'>
                        <h2>Fee: {i.fee}</h2>
                        <h2>Revival Fee: {i.revivalFee}</h2>
                        <h2>Max Revives: {i.reviveLimit}</h2>
                    </div>
                    <h2 className='text-xl text-center'>Entrants: {i.players.length}</h2>
                    <div className='grid grid-flow-col text-center'>
                        <h2>Registration Closes: {moment(Number(i.regsCloseTime)).format('LLL')}</h2>
                        <h2>Starts on: {moment(Number(i.battleStartTime)).format('LLL')}</h2>
                        </div>
                </div>
            ))}
        </div>
    </div>
  )
}
