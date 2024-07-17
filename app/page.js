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
import { GiHamburgerMenu } from "react-icons/gi";
import create from "@/assets/create.png"
import play from "@/assets/play.png"
import share from "@/assets/share.png"
import { ImCross } from 'react-icons/im';

const page = () => {

  const router = useRouter();

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
    document.getElementById("shardModal").classList.remove("translate-y-[50rem]");
    document.getElementById("shardModal").classList.add("translate-y-10");
    // document.getElementById("shardModal").classList.add("-translate-y-[5rem]");
  }

  function removeModal(){
    document.getElementById("shardModal").classList.remove("translate-y-10");
    document.getElementById("shardModal").classList.add("translate-y-[50rem]");
    // document.getElementById("shardModal").classList.add("translate-y-[50rem]");
  }

  return (
    <div className="bg-black text-white w-full p-4 max-h-screen overflow-y-hidden">
        <div className='relative w-full md:hidden bottom-5'>
            <WalletConnectButtonElse/>  
        </div>

      
      <div className='md:grid md:grid-flow-cols md:grid-cols-5 h-fit relative z-50 rounded-xl'>
        <div className='col-span-4 flex items-center relative justify-center h-fit'>
          <div className="top-0 left-0 absolute w-full h-[95vh] object-contain overflow-hidden rounded-xl">
            <Image src={bg2} className="w-screen h-screen"/>
          </div>

          <button onClick={bringModal} className='absolute z-[100] hover:-translate-y-1 duration-200 md:hidden top-4 left-4 bg-black p-3 rounded-xl'>
            <GiHamburgerMenu/>
          </button>

          <div id='shardModal' className='translate-y-[50rem] md:hidden gap-5 border-t-4 border-t-black duration-200 flex flex-col items-center justify-start rounded-t-xl absolute z-[200] bg-[#ffe47c] h-screen w-screen p-4' >
              <div className='flex justify-center w-full' >
                <button className='w-full h-10 flex items-center mx-auto' onClick={removeModal} ><IoIosArrowDown className='text-black hover:text-red-500 mx-auto text-4xl duration-200'/></button>
              </div>

              <button onClick={()=>{router.push("/rumble")}} className='rounded-xl border-4 border-black overflow-hidden h-[25vh] relative group cursor-pointer' >
                <Image src={play} className='-translate-y-40 group-hover:brightness-110 duration-200' />
                <div className='bg-black absolute bottom-0 right-0 p-2 group-hover:p-3 duration-200 rounded-tl-xl' >PLAY</div>
              </button>

              <button onClick={()=>{router.push("/market")}} className='rounded-xl border-4 border-black overflow-hidden h-[25vh] relative group cursor-pointer' >
                <Image src={create} className='-translate-y-40 group-hover:brightness-110 duration-200' />
                <div className='bg-black absolute bottom-0 right-0 p-2 group-hover:p-3 duration-200 rounded-tl-xl' >SHOP</div>
              </button>

              <a target='_blank' href='https://x.com/intent/post?text=Join+the+adventure+with+%40JIMSRPG!%0A%0AFollow+us+and+turn+on+notifications+for+the+latest+updates.+🧙%E2%80%8D♂%EF%B8%8F⚔%EF%B8%8F%0A%0AJoin+the+adventure+at+jimsrpg.com%0A%23JIMSRPG+%23GameFi+%23CryptoGaming' className='rounded-xl border-4 border-black overflow-hidden h-[25vh] relative group cursor-pointer' >
                <Image src={share} className='-translate-y-40 group-hover:brightness-110 duration-200' />
                <div className='bg-black absolute bottom-0 right-0 p-2 group-hover:p-3 duration-200 rounded-tl-xl' >SHARE</div>
              </a>

          </div>


          <div className='w-full h-[95vh] relative p-6 flex flex-col items-start justify-end'>
            <div className='h-[90vh] w-full bg-gradient-to-b from-transparent to-black/70 absolute z-50 top-20 left-0' ></div>
            <div className='h-full z-50 flex flex-col md:justify-end md:items-end max-md:items-center max-md:justify-center mt-10'>
              <Image src={jimboTeam} className="w-full mx-auto"/>
              <h1 className='md:text-[8rem] text-[3.5rem] leading-[50px]' >JIMSRPG</h1>
              <h3 className='md:text-[4.2rem] text-[2rem]'>BE ADVENTUROUS</h3>
            </div>
            <a href='https://x.com/jimsrpg' target='_blank' className='bg-black w-16 h-16 rounded-tl-xl duration-200 hover:w-[4.2rem] hover:h-[4.2rem] z-50 absolute bottom-0 right-0 flex items-center justify-center cursor-pointer'><FaXTwitter className='text-2xl' /></a>
          </div>
        </div>
        <div className='col-span-1 bg-black pl-4 max-md:hidden rounded-r-xl h-screen relative z-50'>
            <div className='relative w-full right-2'>
                <WalletConnectButtonElse/>  
            </div>

            <div className='flex flex-col gap-5 h-full justify-end -translate-y-10' >
              <button onClick={()=>{router.push("/rumble")}} className='rounded-xl overflow-hidden h-[25vh] relative group cursor-pointer' >
                <Image src={play} className='-translate-y-40 group-hover:brightness-110 duration-200' />
                <div className='bg-black absolute bottom-0 right-0 p-2 group-hover:p-3 duration-200 rounded-tl-xl' >PLAY</div>
              </button>

              <button onClick={()=>{router.push("/market")}} className='rounded-xl overflow-hidden h-[25vh] relative group cursor-pointer' >
                <Image src={create} className='-translate-y-40 group-hover:brightness-110 duration-200' />
                <div className='bg-black absolute bottom-0 right-0 p-2 group-hover:p-3 duration-200 rounded-tl-xl' >SHOP</div>
              </button>

              <a target='_blank' href='https://x.com/intent/post?text=Join+the+adventure+with+%40JIMSRPG!%0A%0AFollow+us+and+turn+on+notifications+for+the+latest+updates.+🧙%E2%80%8D♂%EF%B8%8F⚔%EF%B8%8F%0A%0AJoin+the+adventure+at+jimsrpg.com%0A%23JIMSRPG+%23GameFi+%23CryptoGaming' className='rounded-xl overflow-hidden h-[25vh] relative group cursor-pointer' >
                <Image src={share} className='-translate-y-40 group-hover:brightness-110 duration-200' />
                <div className='bg-black absolute bottom-0 right-0 p-2 group-hover:p-3 duration-200 rounded-tl-xl' >SHARE</div>
              </a>
            </div>

        </div>
      </div>

          
    </div>
  )
}

export default page