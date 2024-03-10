"use client"
import Timer from '@/components/global/Timer'
import WalletConnectButton from '@/components/global/WalletConnectButton';
import { Bungee } from "next/font/google";
import { useRouter } from 'next/navigation';
const bungee = Bungee({ subsets: ["latin"], weight: ['400'] });


const layout = ({ children }) => {
  return (
    <>
      <div className="max-md:hidden"><WalletConnectButton/></div>
      <div className="flex flex-col items-center pt-3 w-screen h-screen overflow-hidden">
          <div className="max-md:hidden"><HomeLogo/></div>
          <div><Timer/></div>
          <div className="border-2 rounded-3xl overflow-hidden noscr bg-black/30 border-jimbo-green w-[90%] max-md:w-[98%] h-[80%] p-5 px-8 max-md:px-2">
              {children}
          </div>
      </div>
    </>
  )
}

const HomeLogo = () => {

    const router = useRouter();

    return (
        <button onClick={()=>{router.push("/")}} className=" cursor-pointer h-12 flex flex-row items-center justify-center gap-1 rounded-r-full border-[1px] border-jimbo-green px-8  py-3 absolute top-4 left-0 z-10 hover:from-jimbo-green/60 hover:to-jimbo-black/60 text-black bg-gradient-to-br from-jimbo-green/50 to-jimbo-black/50">

                <h1 className={ bungee.className + " text-2xl leading-none font-bold text-white"}>JIM'S</h1>
                <p className="text-xs text-left leading-none text-jimbo-green w-20 ">BATTLE GROUNDS</p>

        </button>
    )
}

export default layout