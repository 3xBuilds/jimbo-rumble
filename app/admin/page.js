"use client"

import { useEffect, useState } from 'react'
import { useGlobalContext } from '@/context/MainContext';
import { CreateGame } from '@/components/admin/createGame';
import { useRouter } from 'next/navigation';
import { UpcomingGames } from '@/components/admin/upcomingGames';

export default function Admin() {

    const {user} = useGlobalContext();
    const router = useRouter()

//     useEffect(()=>{
//         if(user.walletId != "4X4eo2nJEnbCp74YNgzeZsSFno5YuV8qPrdzDKDDFyV7"){
//             router.push("/");
//         }
//     },[user])

// if(user.walletId == "4X4eo2nJEnbCp74YNgzeZsSFno5YuV8qPrdzDKDDFyV7")
  return (
    <div className="text-white flex min-h-screen flex-col relative p-12 z-0 overflow-hidden items-center justify-start">
        <h1 className='text-3xl text-jimbo-green font-bold'>Admin Panel</h1>
        <CreateGame/>
        <UpcomingGames/>
    </div>
  )
}
