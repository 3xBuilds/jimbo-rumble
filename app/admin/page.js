"use client"

import { useEffect, useState } from 'react'
import { useGlobalContext } from '@/context/MainContext';
import { CreateGame } from '@/components/admin/createGame';
import { useRouter } from 'next/navigation';
import { UpcomingGames } from '@/components/admin/upcomingGames';
import WalletConnectButton from '@/components/global/WalletConnectButton';

export default function Admin() {

    const {user} = useGlobalContext();
    const router = useRouter()




  return (
    <div className="text-white flex min-h-screen flex-col relative p-12 z-0 overflow-hidden items-center justify-start">
      <WalletConnectButton/>
        <h1 className='text-3xl text-jimbo-green font-bold'>Admin Panel</h1>
        <CreateGame/>
        <UpcomingGames/>
    </div>
  )
}
