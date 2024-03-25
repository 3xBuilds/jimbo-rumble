"use client"

import { useEffect, useState } from "react";

import usePhantomProvider from "@/hooks/usePhantomProvider"
import axios from "axios"
import { useGlobalContext } from "@/context/MainContext";

const WalletConnectButton = () => {
  const {provider} = usePhantomProvider();
  const {publicKey, setPublicKey} = useGlobalContext();
  const {userName, setUserName} = useGlobalContext();


  const handleConnect = async () => {
    if (!provider) throw new Error("Phantom wallet not installed");

    try {
      await provider?.connect();
    } catch (err) {
      console.error(err);
    }
  }

  async function checkUser(){
    try{
      const wallet = String(publicKey)
      const res = await axios.get("/api/user/"+wallet);

      setUserName(res.data.user.username);
    }
    catch(err){
      console.log(err);
    }
  }

  const handleDisconnect = async () => {
    if (!provider) throw new Error("Phantom wallet not installed");

    try {
      await provider?.disconnect();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!provider) return;

    provider?.connect({ onlyIfTrusted: true })
      .catch((err) => {
        console.error(err);
      });

    provider?.on('connect', (publicKey) => {
      setPublicKey(publicKey);
    });

    provider?.on('disconnect', () => {
      setPublicKey(null);
    });

    provider?.on('accountChanged', (publicKey) => {
      if (publicKey) {
        setPublicKey(publicKey);
      } else {
        provider.connect().catch((error) => {
          console.error('Failed to reconnect:', error);
        });
      }
    });

  }, [provider]);

  useEffect(()=>{
    if(publicKey)
    checkUser();
  },[publicKey])

  return (
    <>
      {provider?.isConnected ?
        <button className=" cursor-pointer rounded-l-full px-8 py-3 absolute top-4 right-0 z-10 h-12  text-black bg-gradient-to-br from-jimbo-green to-jimbo-black" onClick={handleDisconnect}>
          {userName == ""?publicKey?.toString().slice(0, 6) + "..." + publicKey?.toString().slice(-6) : <h2>Welcome! <span className="font-bold">{userName}</span></h2> }
        </button> :
        <button className=" cursor-pointer rounded-l-full px-8 py-3 absolute top-4 right-0 z-10 h-12  text-black bg-gradient-to-br from-jimbo-green to-jimbo-black" onClick={handleConnect}>
          Wallet Connect
        </button>
      }

    </>
  )
}

export default WalletConnectButton