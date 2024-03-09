import Image from 'next/image'
import avatar from '../../assets/characters/war4.png'
import { Bungee } from "next/font/google";

const bungee = Bungee({ subsets: ["latin"], weight: ['400'] });

const Hero = () => {
  return (
    <div className="flex flex-col">
        <div className="flex flex-row flex-wrap justify-center items-center gap-5">
            <Image src={avatar} className="w-[20vw]"/>
            <div className="flex flex-col items-center justify-center">
                <h1 className={ bungee.className + " text-[10vw] leading-none font-bold text-white"}>JIM'S</h1>
                <p className="text-[2.5vw] leading-none text-jimbo-green ">BATTLE GROUNDS</p>
            </div>
        </div>
        <button className=" cursor-pointer rounded-full self-end px-8 py-3 w-fit transform transition-all duration-300 ease-in-out hover:translate-y-1 text-black bg-gradient-to-br from-jimbo-green to-jimbo-blue">
            PLAY NOW
        </button>
        
    </div>
  )
}

export default Hero