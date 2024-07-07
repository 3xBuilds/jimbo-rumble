"use client"

import WalletConnectButton from '@/components/global/WalletConnectButton'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Image from 'next/image';
import { GoDotFill } from "react-icons/go";
import ogjim from "@/assets/jimog.png"
import { useState } from 'react';
import bg2 from "@/assets/bg-copy.png"
import Background from '@/components/global/Background';
import { ImCross } from 'react-icons/im';
import { useGlobalContext } from '@/context/MainContext';
import axios from 'axios';

const page = () => {

  const {user, setUser, publicKey} = useGlobalContext();
  const [fetched, setFetched] = useState(false);
  const [modal, setModal] = useState(false);

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const [referral, setReferral] = useState("");

  function handleUserName(e){
    setError("");
    setUsername(e.target.value);
  }

  // async function userFetchCreate(){
  //   try{
  //     const res = await axios.get(`/api/user/${String(publicKey)}`);
  //       setUser(res.data.user);
  //       console.log(res.data.user);
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }

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

  function handleReferral(e){
    setError("");
    setReferral(e.target.value);
  }



  const router = useRouter();
  return (
    <div className="bg-gradient-to-b text-white justify-center flex flex-col text-center from-[#0a1021] to-[#00214d] sm:p-10 p-4 py-16 w-full min-h-screen max-sm:overflow-y-scroll">
      {/* <WalletConnectButton/> */}
      <div className="relative flex justify-center mt-5 z-[50]">
        <h3 className="mx-auto text-orange-500 sm:text-[2.8rem] text-[1.8rem]">JIMBO Upgrade</h3>
        <h3 className="mx-auto absolute top-1 blur-[30px] text-orange-500 sm:text-[3rem] text-[1.7rem]">JIMBO Upgrade</h3>
      </div>
    <WalletConnectButton/>

      <div className="absolute top-0 left-0 w-full">
        <Image src={bg2} className="w-full opacity-70 h-full"/>
      </div>

          {/* <Image src={bg} className="opacity-70" /> */}

      <div className="relative z-50">
        <h3 className="text-gray-300">A platform to showcase your <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">Creativity</span></h3>
      </div>

      <div className="relative z-50 ">
        <Image src={ogjim} className="sm:w-[20%] shadow-xl mx-auto w-[80%]"/>

      </div>

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


      <div className="grid sm:grid-flow-col sm:grid-cols-3 relative z-50 bg-black/30 items-center mx-auto justify-center w-fit text-gray-400 mt-5 border-2 border-orange-500 rounded-2xl sm:h-24 shadow-xl shadow-orange-600/30">

        <button disabled={user || !fetched} onClick={()=>{if(user==null && fetched)setModal(true)}} className={ `sm:h-full h-24 max-sm:rounded-t-xl ${user ? "bg-orange-500/10 text-orange-400" : "bg-orange-500/30 hover:bg-orange-500 text-white"} duration-500 sm:rounded-l-xl w-72 sm:border-r-2 max-sm:border-b-2 border-orange-400 pr-4 justify-center items-center flex flex-col`}>{user ? "Completed" : "Name your Warrior"}</button>
        
   
        <button onClick={()=>{router.push("/market")}} className="sm:h-full h-24 bg-orange-500/30 hover:bg-orange-500 duration-500 text-white w-72 sm:border-r-2 max-sm:border-b-2 border-orange-400 pr-4 justify-center items-center flex">Collect Shards</button>
        
        <div className="sm:h-full h-24 w-72 justify-center hover:cursor-not-allowed items-center flex">Upgrade your Jimbo</div>
      </div>

      {/* <div className="relative z-50">
        <h3 className="text-[1.5rem] mt-10"><span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Burn</span> more, <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">Earn</span> more</h3>
        
        <p className="text-sm text-gray-400 mx-auto mt-2 sm:w-[70%] w-[90%]">Burn your $JIMBO tokens or spend SOL to gather the magical shards.</p>
        <p className="text-sm text-gray-400 mx-auto mt-2 sm:w-[70%] w-[90%]">Use these to customize & build your own JIMBO NFT!</p>

      </div> */}
    </div>
  )
}

export default page