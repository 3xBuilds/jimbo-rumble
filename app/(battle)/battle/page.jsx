"use client"
import Image from 'next/image'

import { useState, useEffect } from 'react';
import { startGame } from '@/utils/wordPlay';

import wiz1 from '../../../assets/characters/wiz1.png'
import wiz2 from '../../../assets/characters/wiz2.png'
import war3 from '../../../assets/characters/war3.png'
import war2 from '../../../assets/characters/war2.png'

const page = () => {

    const [displayMessages, setDisplayMessages] = useState([]);
    const [startGameButton, setStartGameButton] = useState(false);

    useEffect(() => {
        if(startGameButton){
        const msg = startGame();
        let i = 0;
        const interval = setInterval(() => {
            if(i < msg.length-1){
                console.log(msg[i]);
                setDisplayMessages(prev => [...prev, msg[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 2000);

        return () => clearInterval(interval);}
    } ,[startGameButton]);

  return (
    <>
        <Image src={war2} className="w-48 max-md:w-28 max-md:right-1 absolute bottom-5 right-5"/>
        <Image src={war3} className="w-40 max-md:w-20 max-md:left-1 absolute bottom-5 left-5 transform -scale-x-100"/>
        <div className="w-[80%] max-md:w-[98%] mx-auto flex flex-col-reverse gap-2">
            {
                displayMessages?.map((message, index) => {
                    if(message?.startsWith("-----")) return (
                        <div className="bg-jimbo-green/50 border-jimbo-green border-[1px] rounded-xl h-16 flex items-center justify-center">
                            <p className="text-white text-sm text-center"> {message?.slice(6)}</p>
                        </div>)
                    else return (
                        <div key={index} className="bg-jimbo-green/10 rounded-xl h-16 flex items-center justify-center">
                            <p className="text-white text-sm text-center"> {message} </p>
                        </div>
                    )
                })
            }
        </div>
        
        {!startGameButton && <button onClick={()=>{setStartGameButton(true)}} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full self-end px-8 py-3 w-fit transition-all duration-100 ease-in-out hover:brightness-125 text-black bg-gradient-to-br from-jimbo-green to-jimbo-blue">
            START GAME
        </button>}
    </>
  )
}

export default page