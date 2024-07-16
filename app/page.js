"use client"

import WalletConnectButton from '@/components/global/WalletConnectButton'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Image from 'next/image';
import { GoDotFill } from "react-icons/go";
import ogjim from "@/assets/jimog.png"
import { useState } from 'react';
import bg2 from "@/assets/bgGamified.png"
import Background from '@/components/global/Background';
import { IoIosArrowDown } from "react-icons/io";
import { useGlobalContext } from '@/context/MainContext';
import axios from 'axios';
import WalletConnectButtonElse from '@/components/global/WalletConnectButtonNotRumble';
import { AiTwotoneShop } from "react-icons/ai";
import { PiHandTapLight } from "react-icons/pi";
import { IoIosShareAlt } from "react-icons/io";
import jimboTeam from "@/assets/jimboteam.png"
import { FaXTwitter } from "react-icons/fa6";

import create from "@/assets/create.png"
import play from "@/assets/play.png"
import share from "@/assets/share.png"

const page = () => {

  const {user, setUser, publicKey} = useGlobalContext();
  const [fetched, setFetched] = useState(false);
  const [modal, setModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const [referral, setReferral] = useState("");

  function handleUserName(e){
    setError("");
    setUsername(e.target.value);
  }


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

  function bringModal(){
    console.log(document.getElementById("shardModal").classList);
    document.getElementById("shardModal").classList.remove("translate-y-[30rem]");
    document.getElementById("shardModal").classList.add("sm:translate-y-0");
    document.getElementById("shardModal").classList.add("-translate-y-[35rem]");
  }

  function removeModal(){
    document.getElementById("shardModal").classList.remove("-translate-y-[35rem]");
    document.getElementById("shardModal").classList.remove("sm:translate-y-0");
    document.getElementById("shardModal").classList.add("translate-y-[30rem]");
  }

  return (
    <div className="bg-black text-white w-full p-4 max-h-screen overflow-y-hidden">
      
      <div className='grid grid-flow-cols grid-cols-5 h-fit relative z-50 rounded-xl'>
        <div className='col-span-4 flex items-center relative justify-center h-fit'>
          <div className="top-0 left-0 absolute w-full h-[95vh] overflow-hidden rounded-xl">
            <Image src={bg2} className="w-full"/>
          </div>
          <div className='w-full h-[95vh] relative p-6 flex flex-col items-start justify-end'>
            <div className='h-[90vh] w-full bg-gradient-to-b from-transparent to-black/70 absolute z-50 top-20 left-0' ></div>
            <Image src={jimboTeam} className="w-[85%] mx-auto mt-20"/>
            <div className='h-full z-50 flex flex-col justify-end items-end mt-10'>
              <h1 className='text-[8rem] leading-[50px]' >JIMSRPG</h1>
              <h3 className='text-[4.2rem]'>BE ADVENTUROUS</h3>
            </div>
            <a href='https://x.com/jimsrpg' className='bg-black w-16 h-16 rounded-tl-xl duration-200 hover:w-[4.2rem] hover:h-[4.2rem] z-50 absolute bottom-0 right-0 flex items-center justify-center cursor-pointer'><FaXTwitter className='text-2xl' /></a>
          </div>
        </div>
        <div className='col-span-1 bg-black pl-4 rounded-r-xl h-screen relative z-50'>
          <div>
            <WalletConnectButtonElse/>  
          </div>

            <div className='flex flex-col gap-5 h-full justify-end -translate-y-10' >
              <div className='rounded-xl overflow-hidden h-[25vh] relative group cursor-pointer' >
                <Image src={play} className='-translate-y-40 group-hover:brightness-110 duration-200' />
                <div className='bg-black absolute bottom-0 right-0 p-2 group-hover:p-3 duration-200 rounded-tl-xl' >PLAY</div>
              </div>

              <div className='rounded-xl overflow-hidden h-[25vh] relative group cursor-pointer' >
                <Image src={create} className='-translate-y-40 group-hover:brightness-110 duration-200' />
                <div className='bg-black absolute bottom-0 right-0 p-2 group-hover:p-3 duration-200 rounded-tl-xl' >CREATE</div>
              </div>

              <div className='rounded-xl overflow-hidden h-[25vh] relative group cursor-pointer' >
                <Image src={share} className='-translate-y-40 group-hover:brightness-110 duration-200' />
                <div className='bg-black absolute bottom-0 right-0 p-2 group-hover:p-3 duration-200 rounded-tl-xl' >SHARE</div>
              </div>
            </div>

        </div>
      </div>

          
    </div>
  )
}

export default page