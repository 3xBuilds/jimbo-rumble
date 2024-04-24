"use client"

import { useEffect } from 'react'
import { useGlobalContext } from '@/context/MainContext';
import { CreateGame } from '@/components/admin/createGame';
import { useRouter } from 'next/navigation';
import { UpcomingGames } from '@/components/admin/upcomingGames';
import WalletConnectButton from '@/components/global/WalletConnectButton';

export default function Admin() {

    const {user} = useGlobalContext();
    const router = useRouter()

    useEffect(()=>{
      if(user){
        if(![process.env.NEXT_PUBLIC_JIMBO_KEY, "H8PSKXvNNrDV2fZU25X4mQNouEbxYAEWKHa96edHgVwX"  , "5paTCF4VDAgPUdbTy7qkkd3SMbfg61U2HKL2D4EYC21u", "4X4eo2nJEnbCp74YNgzeZsSFno5YuV8qPrdzDKDDFyV7"].includes(user?.walletId)){
          router.push("/");
        }
      }
    },[user])

  return (
    <div className="text-white flex min-h-screen flex-col relative p-12 z-0 overflow-hidden items-center justify-start">
      <WalletConnectButton/>
        {[process.env.NEXT_PUBLIC_JIMBO_KEY, "H8PSKXvNNrDV2fZU25X4mQNouEbxYAEWKHa96edHgVwX"  , "5paTCF4VDAgPUdbTy7qkkd3SMbfg61U2HKL2D4EYC21u", "4X4eo2nJEnbCp74YNgzeZsSFno5YuV8qPrdzDKDDFyV7"].includes(user?.walletId) &&
          <>
            <h1 className='text-3xl text-jimbo-green font-bold'>Admin Panel</h1>
            <CreateGame/>
            <UpcomingGames/>
          </>
        }
    </div>
  )
}
