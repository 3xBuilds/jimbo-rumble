"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios"
import moment from 'moment'

const Timer = () => {

  const[game, setGame] = useState({});

  async function timeLeft(){
    try{
      await axios.get("/api/game/current").then((res)=>{setGame(res.data.currentGame)});
    }
    catch(err){
      console.log(err);
    }
  }

useEffect(()=>{
  timeLeft();
},[])
  return (
    <div className="w-72 border-2 border-jimbo-green bg-jimbo-green/10 border-b-0 rounded-t-3xl flex flex-col items-center justify-center gap-1 text-center p-10 py-5 mt-2">
        <h3 className="text-xl text-white">{moment(Number(game?.battleStartTime)).fromNow()}</h3>
        <div className="h-[1px] bg-white w-48"></div>
        <h4 className="text-sm text-jimbo-green">BATTLE STARTS IN</h4>
    </div>
  )
}

export default Timer