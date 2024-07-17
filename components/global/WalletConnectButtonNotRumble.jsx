"use client"

import { useEffect, useState } from "react";

import usePhantomProvider from "@/hooks/usePhantomProvider"
import axios from "axios"
import { useGlobalContext } from "@/context/MainContext";
import { usePathname } from "next/navigation";

const WalletConnectButtonElse = () => {
  const {provider} = usePhantomProvider();
  const {publicKey, setPublicKey} = useGlobalContext();
  const {user} = useGlobalContext();

  const pathname = usePathname();

  const handleConnect = async () => {
    if (!provider) throw new Error("Phantom wallet not installed");

    try {
      await provider?.connect();
    } catch (err) {
      console.error(err);
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

  return (
    <>
      {provider?.isConnected ?
        <button className={` cursor-pointer rounded-xl w-48 h-16 truncate absolute z-[200] top-7 max-md:text-[1rem] right-[1.8vw] text-white bg-black border-[1px] border-white duration-200 hover:-translate-y-1`} onClick={handleDisconnect}>
          {user == null? publicKey?.toString().slice(0, 6) + "..." + publicKey?.toString().slice(-6) : <h2 className="" ><span className="font-bold">{user.username} | {user?.points ? user.points.toLocaleString() : "--"}</span></h2> }
        </button> :
        <button className={`cursor-pointer rounded-xl w-48 h-16 absolute top-7 max-md:text-[1rem] right-[3vw] z-[200] text-white bg-black border-[1px] border-white duration-200 hover:-translate-y-1`} onClick={handleConnect}>
          Wallet Connect
        </button>
      }

    </>
  )
}

export default WalletConnectButtonElse;