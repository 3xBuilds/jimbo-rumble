"use client"

import Timer from "@/components/global/Timer"
import WalletConnectButton from "@/components/global/WalletConnectButton"
import Hero from "@/components/home/Hero"

const Home = () => {
  return (
    <>
      <div className="text-white"><WalletConnectButton/></div>
      <main className="flex min-h-screen flex-col relative z-0 overflow-hidden items-center justify-center">
        <Hero/>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
          <p className="text-xs text-jimbo-green text-center">JOIN BEFORE ITS TOO LATE</p>
          <Timer/>
        </div>
      </main>
    </>
  )
}

export default Home