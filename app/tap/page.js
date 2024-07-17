"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'
import { Line } from 'rc-progress';
import Image from 'next/image';
import shard from "@/assets/crystals/1.png"
import WalletConnectButton from '@/components/global/WalletConnectButton';
import WalletConnectButtonElse from '@/components/global/WalletConnectButtonNotRumble';
import { useGlobalContext } from '@/context/MainContext';
import axios from 'axios';
import { ImCross } from 'react-icons/im';
export default function Page() {
  const {fetch, setFetch, publicKey, user} = useGlobalContext();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const [referral, setReferral] = useState("");
  const divRef = useRef(null);
  const [taps, setTaps] = useState(0);
  const [clickEffect, setClickEffect] = useState(null);
  const [goal, setGoal] = useState(100);
  const[level, setLevel] = useState(0);
  const[divide, setDivide] = useState(1);

  const [modal, setModal] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (event) => {
    const div = divRef.current;
    if (div) {
      const rect = div.getBoundingClientRect();
      const newX = event.clientX - rect.left;
      const newY = event.clientY - rect.top;
      x.set(newX);
      y.set(newY);
    }
  };

  async function createUser(){
    try{
      if(username != ""){
        console.log("page.js", referral);
        await axios.post("/api/user/create", {walletId: String(publicKey), username: username, referral: referral});
        window.location.reload();
      }
    }
    catch(err){
      console.log(err);
      setError(err.response.data.error);
    }
  }

  useEffect(()=>{
    if(!user){
      setModal(true);
    }
  },[publicKey, user])

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  async function handleClick(event) {
    if(taps < (100*divide)-1){
        setTaps(prev => prev + 1);
    }
    else{
        await axios.post(`/api/user/${String(publicKey)}/updatePoints`,{addPoints: goal}).then((res)=>{
          setFetch(prev=>!prev);
          setTaps(0);
          setLevel(prev => prev+1);
          setDivide(prev => prev*2);
          setGoal(prev => prev*3);
        })
        
    }
    const div = divRef.current;
    if (div) {
      const rect = div.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      setClickEffect({ x: clickX, y: clickY, id: Date.now() });

    }
  }

  function handleUserName(e){
    setError("");
    setUsername(e.target.value);
  }

  function handleReferral(e){
    setError("");
    setReferral(e.target.value);
  }

  return (
    <div className='bg-gradient-to-b text-white items-center flex flex-col text-center from-[#0a1021] to-[#00214d] md:p-16 p-4 pt-20 pb-4 w-full min-h-screen max-md:overflow-y-scroll'>
      {modal && <div className="absolute z-[100] backdrop-blur-3xl w-full h-full top-0 left-0">
        <div className="flex items-center justify-center h-full">
          <div className="bg-gray-900 rounded-xl p-5 border-[1px] border-orange-400">
            <button onClick={()=>{setModal(false)}} className="flex w-full justify-end">
              <ImCross className="text-red-500 hover:text-red-400 duration-200"/>
            </button>
            <h2 className="text-orange-400 mb-3 ">Set Username</h2>
            <input onChange={handleUserName} value={username} className="bg-gray-800 text-white p-2 w-full rounded-xl" placeholder="Enter name"></input>
            <h2 className="text-orange-400  mb-3 mt-5">Referral Username</h2>
            <input onChange={handleReferral} value={referral} className="bg-gray-800 text-white p-2 w-full mb-3 rounded-xl" placeholder="Optional"></input>
            <p className="text-sm text-red-500 mt-2">{error}</p>
            <button onClick={createUser} className="w-full p-3 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl mt-3 hover:brightness-125 duration-200">Submit</button>
          </div>
        </div>
      </div>}
      <WalletConnectButtonElse/>
      <h1 className='text-4xl prevent-select'>TAP!</h1>

      <motion.div 
        onClick={handleClick}
        id="tap" 
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className='md:h-[25rem] md:w-full h-[27rem] w-full bg-gradient-to-br from-orange-500/10 prevent-select to-orange-500/40 hover:brightness-125 cursor-none active:brightness-150 duration-200 md:my-10 my-8 rounded-xl border-2 border-orange-500 relative overflow-hidden'
      >
        <motion.div
          className="w-4 h-4 bg-orange-500 border-2 border-white rounded-full absolute"
          style={{ x, y }}
        />
        <AnimatePresence>
          {clickEffect && (
            <ClickEffect key={clickEffect.id} x={clickEffect.x} y={clickEffect.y} />
          )}
        </AnimatePresence>
      </motion.div>

      <h3 className='text-2xl text-orange-400 ' >Level {level}</h3>

      <h3><span className='text-orange-500'>{100*divide - taps}</span> taps away from Level {level+1}</h3>

    <div className='flex max-md:flex-col max-md:gap-2 md:gap-10 w-full items-center'>
    <div className='w-full max-md:mt-2'>
        <Line percent={taps/divide} strokeWidth={1} trailWidth={1} className='my-2' strokeColor="#f97516" />
    </div>
    <div className='flex gap-0 items-center justify-center'>
      <h2 className='text-[1.5rem]'>+{goal}</h2>
      <Image src={shard} className="w-16 opacity-90" />
    </div>
</div>
    </div>
  )
}

function ClickEffect({ x, y }) {
  return (
    <motion.div
      className="absolute rounded-full border-2 border-orange-200 pointer-events-none"
      style={{ 
        x, 
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ width: 0, height: 0, opacity: 1 }}
      animate={{ 
        width: 100, 
        height: 100, 
        opacity: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }}
      exit={{ opacity: 0 }}
    />
  );
}