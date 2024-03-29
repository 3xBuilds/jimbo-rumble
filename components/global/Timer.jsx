"use client"

import React, { useEffect, useState } from 'react'
import axios from "axios"
import moment from 'moment'

const Timer = () => {

  const[time,setTime] = useState("Not Scheduled");
  const [game, setGame] = useState(null);
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
        calculateTime(game);
      } ,1000);
    return () => clearInterval(intervalId);
  }, [game]);

  useEffect(()=>{
    timeLeft();
  },[])

  async function timeLeft(){
    try{
      await axios.get("/api/game/current").then((res)=>{
        setGame(res.data.currentGame)
      });
    }
    catch(err){
      console.log(err);
    }
  }

  function calculateTime(game){
    try{
      const momentTime = moment(Number(game?.battleStartTime)).fromNow();
      if(momentTime.includes("Invalid")) {
        setTime("---");
        return;
      }
      else if (momentTime.includes("in a few seconds")) {
        setTime(`${(moment.duration(Number(game?.battleStartTime) - Date.now())).seconds()} seconds`);
        setTimePassed(false);
        return;
      }
      else if(momentTime.includes("ago")){
        setTime(momentTime);
        setTimePassed(true);
        return;
      }
      else{
        setTime(momentTime);
        setTimePassed(false);
        return;
      }
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className={" w-80 border-2 border-jimbo-green bg-jimbo-green/10 border-b-0 rounded-t-3xl flex flex-col items-center justify-center gap-1 text-center p-10 py-5 mt-2 " }>
        <h3 className="text-xl text-white">{time}</h3>
        <div className="h-[1px] bg-white w-48"></div>
        <h4 className="text-sm text-jimbo-green">{timePassed ? "BATTLE STARTED" : "BATTLE STARTS IN"}</h4>
    </div>
  )
}

export default Timer