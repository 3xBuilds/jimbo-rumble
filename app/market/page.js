"use client"
import Image from "next/image";
import coin from '../../assets/coin.png'
import { useEffect, useState } from "react";
import WalletConnectButton from "@/components/global/WalletConnectButton";
import { useGlobalContext } from "@/context/MainContext";
import { ShyftSdk, Network } from '@shyft-to/js';
import burn from "@/utils/burn";
import usePhantomProvider from "@/hooks/usePhantomProvider"
import axios from "axios";
import { ImCross } from "react-icons/im";
import Loader from "@/components/UI/Loader";
import paySolana from "@/utils/paySolana";
import { FaStore } from "react-icons/fa";
import crystal1 from "@/assets/crystals/1.png"
import crystal2 from "@/assets/crystals/2.png"
import crystal3 from "@/assets/crystals/3.png"
import crystal4 from "@/assets/crystals/4.png"
import crystal5 from "@/assets/crystals/5.png"
import Background from "@/components/global/Background";

import bg2 from "@/assets/bg-copy.png"


export default function Home() {
  // const [earnings, setEarnings] = useState(0);
  const [tokens, setTokens] = useState(0);
  const {publicKey, user, setUser} = useGlobalContext();

  const { provider } = usePhantomProvider();
  const [userNameModal, setUserNameModal] = useState(false);
  const [username, setUsername] = useState("");
  const [points, setPoints] = useState(0);
  const [referral, setReferral] = useState("");

  const [error, setError] = useState("");

  const[loading, setLoading] = useState(false);

  async function fetchBalance(){
    try{
      const shyft = new ShyftSdk({ apiKey: "AkEA6RnkX6IwV-Ni", network: Network.Mainnet });
      (async () => {
        const bal = await shyft.wallet.getTokenBalance({ wallet: String(publicKey), token: "CrkmpA8dx8UXFsRpXd3MD9MJ7r8qkk1U7SZeYHBeY7Px" });
        setTokens(bal.balance);
      })();
      
    }
    catch(err){
      console.log(err);
    }
  }

  function handleUserName(e){
    setError("");
    setUsername(e.target.value);
  }

  function handleReferral(e){
    setError("");
    setReferral(e.target.value);
  }

  async function userFetchCreate(){
    try{
      const res = await axios.get(`/api/user/${String(publicKey)}`);
      if(res.data.user == null){
        setUserNameModal(true);
      }
      else{
        setUser(res.data.user);
        setPoints(res.data.user.points)
        console.log(res.data.user);
      }
    }
    catch(err){
      console.log(err);
    }
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


   async function burnToken(amount, reward){
    try{
      // console.log(provider, 1);
      if(amount > 0){
        setLoading(true);
        const done = await burn(provider, amount * 10000);
        if(done){
          await axios.post(`/api/user/${String(publicKey)}/updatePoints`,{addPoints: reward}).then((res)=>{console.log(res); setLoading(false)});
        }
        else{
          setLoading(false);
        }
      }
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
   }

   async function buyXP(amount, reward){
    try{
      
      if(amount > 0){
        setLoading(true);
        const done = await paySolana(provider, amount * 1000000000);
        if(done){
          await axios.post(`/api/user/${String(publicKey)}/updatePoints`,{addPoints: reward}).then((res)=>{console.log(res); setLoading(false)});
        }
        else{
          setLoading(false);
        }
      }
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
   }
  
  useEffect(()=>{
    if(publicKey){
      fetchBalance();
      userFetchCreate();
    }
  },[publicKey, loading])

  return (
    <main className="w-screen sm:p-10 px-4 pt-20 pb-10 sm:h-screen text-white bg-gradient-to-b from-[#0a1021] to-[#00214d]">
        <WalletConnectButton/>
        <div className="absolute top-0 left-0 w-full -z-5">
          <Image src={bg2} className="w-full h-full"/>
      </div>
        <Loader loading={loading}/>
    {userNameModal && <div className="absolute z-[50] backdrop-blur-3xl w-full h-full top-0 left-0">
        <div className="flex items-center justify-center h-full">
          <div className="bg-gray-900 rounded-xl p-5 border-[1px] border-jimbo-green">
            <button onClick={()=>{setUserNameModal(false)}} className="flex w-full justify-end">
              <ImCross className="text-red-500 hover:text-red-400 duration-200"/>
            </button>
            <h2 className="text-jimbo-green mb-3 ">Set Username</h2>
            <input onChange={handleUserName} value={username} className="bg-gray-800 text-white p-2 w-full rounded-xl" placeholder="Enter name"></input>
            <h2 className="text-jimbo-green  mb-3 mt-5">Referral Username</h2>
            <input onChange={handleReferral} value={referral} className="bg-gray-800 text-white p-2 w-full mb-3 rounded-xl" placeholder="Optional"></input>
            <p className="text-sm text-red-500 mt-2">{error}</p>
            <button onClick={createUser} className="w-full p-3 bg-gradient-to-br from-jimbo-green to-cyan-400 rounded-xl mt-3 hover:brightness-125 duration-200">Submit</button>
          </div>
        </div>
      </div>}
      
      <div className="relative flex justify-center mt-5">
        <div className="flex items-center gap-5">
          <FaStore className="sm:text-[2.5rem] text-[1.7rem] text-fuchsia-400 shadow-2xl shadow-fuchsia-500"/>
          <h3 className="mx-auto text-fuchsia-500 sm:text-[2.5rem] text-[1.7rem]">Points Store</h3>
        </div>
        <h3 className="mx-auto absolute top-1 blur-[25px] text-fuchsia-600 sm:text-[2.5rem] text-[1.7rem]">Points Store</h3>
      </div>
      
      <div className=" mt-10">
        
      <div className="bg-white/5 px-5 py-10 rounded-xl">
        <div className="sm:grid sm:grid-flow-col sm:grid-cols-2 gap-10 text-center mb-5 hidden">
          <h4 className="text-[1.5rem]">JIMBO Points Packs</h4>
          <h4 className="text-[1.5rem]">SOL Points Packs</h4>
        </div>
      <div className="col-span-2 row-span-2 ">

        <div className="sm:grid sm:grid-flow-col sm:grid-cols-2 gap-10">
          <div className="sm:grid gap-3 sm:grid-flow-col sm:grid-cols-3 ">
          <h4 className="my-5 sm:hidden flex justify-center">JIMBO Points Packs</h4>
              <div className="sm:col-span-2 gap-3 sm:grid sm:grid-flow-col sm:grid-cols-2">
                  <div className="sm:grid sm:grid-flow-row sm:grid-rows-2 sm:gap-3">
                      
                      {/* box1 */}
                      <button onClick={()=>{burnToken(80000, 40)}} className="sm:my-0 my-4 text-center relative rounded-xl bg-[#7c06d3] group cursor-pointer hover:brightness-110 hover:shadow-2xl hover:shadow-purple-600/30 duration-200">
                        <h3 className="absolute w-full text-xl top-2 z-10">40</h3>
                          <Image className="group-hover:animate-pulse group-hover:brightness-110" src={crystal1}/>
                          <div className="h-8 flex text-center bg-purple-950/50 w-full rounded-b-xl items-center justify-center absolute bottom-0">
                              <h5>80k Jimbo</h5>
                          </div>
                      </button>

                      {/* box2 */}
                      <button onClick={()=>{burnToken(200000, 220)}} className="sm:my-0 my-4 text-center relative rounded-xl bg-[#7c06d3] group cursor-pointer hover:brightness-110 hover:shadow-2xl hover:shadow-purple-600/30 duration-200">
                        <h3 className="absolute w-full text-xl top-2 z-10">220</h3>
                          <Image className="group-hover:animate-pulse group-hover:brightness-110" src={crystal2}/>
                          <div className="h-8 flex text-center bg-purple-950/50 w-full rounded-b-xl items-center justify-center absolute bottom-0">
                              <h5>200k Jimbo</h5>
                          </div>
                      </button>
                  </div>
                  <div className="sm:grid sm:grid-flow-row sm:grid-rows-2 sm:gap-3">

                    {/* box3 */}
                  <button onClick={()=>{burnToken(400000, 480)}} className="sm:my-0 my-4 text-center relative rounded-xl bg-[#7c06d3] group cursor-pointer hover:brightness-110 hover:shadow-2xl hover:shadow-purple-600/30 duration-200">
                        <h3 className="absolute w-full text-xl top-2 z-10">480</h3>
                          <Image className="group-hover:animate-pulse group-hover:brightness-110" src={crystal3}/>
                          <div className="h-8 flex text-center bg-purple-950/50 w-full rounded-b-xl items-center justify-center absolute bottom-0">
                              <h5>400k Jimbo</h5>
                          </div>
                      </button>

                      {/* box4 */}
                      <button onClick={()=>{burnToken(1000000, 1200)}} className="sm:my-0 my-4 text-center relative rounded-xl bg-[#7c06d3] group cursor-pointer hover:brightness-110 hover:shadow-2xl hover:shadow-purple-600/30 duration-200">
                        <h3 className="absolute w-full text-xl top-2 z-10">1200</h3>
                          <Image className="group-hover:animate-pulse group-hover:brightness-110" src={crystal4}/>
                          <div className="h-8 flex text-center bg-purple-950/50 w-full rounded-b-xl items-center justify-center absolute bottom-0">
                              <h5>1M Jimbo</h5>
                          </div>
                      </button>
                  </div>
              </div>

              {/* box5 */}
              <button onClick={()=>{burnToken(2000000, 2100)}} className="sm:my-0 my-4 h-full text-center flex items-center relative rounded-xl bg-[#7c06d3] group cursor-pointer hover:brightness-110 hover:shadow-2xl hover:shadow-purple-600/30 duration-200">
                        <h3 className="absolute w-full text-xl top-2 z-10">2100</h3>
                          <Image className="group-hover:animate-pulse group-hover:brightness-110" src={crystal5}/>
                          <div className="h-8 flex text-center bg-purple-950/50 w-full rounded-b-xl items-center justify-center absolute bottom-0">
                              <h5>2M Jimbo</h5>
                          </div>
              </button>
          </div>

          <div className="sm:grid gap-5 sm:grid-flow-col sm:grid-cols-3 ">
          <h4 className="my-5 sm:hidden flex justify-center">SOL Points Packs</h4>
          <div className="sm:col-span-2 gap-3 sm:grid sm:grid-flow-col sm:grid-cols-2">
                  <div className="sm:grid sm:grid-flow-row sm:grid-rows-2 sm:gap-3">
                      
                      {/* box1 */}
                      <button onClick={()=>{buyXP(0.06, 350)}} className="sm:my-0 my-4 text-center relative rounded-xl bg-[#7c06d3] group cursor-pointer hover:brightness-110 hover:shadow-2xl hover:shadow-purple-600/30 duration-200">
                        <h3 className="absolute w-full text-xl top-2 z-10">350</h3>
                          <Image className="group-hover:animate-pulse group-hover:brightness-110" src={crystal1}/>
                          <div className="h-8 flex text-center bg-purple-950/50 w-full rounded-b-xl items-center justify-center absolute bottom-0">
                              <h5>0.06 SOL</h5>
                          </div>
                      </button>

                      {/* box2 */}
                      <button onClick={()=>{buyXP(0.12, 720)}} className="sm:my-0 my-4 text-center relative rounded-xl bg-[#7c06d3] group cursor-pointer hover:brightness-110 hover:shadow-2xl hover:shadow-purple-600/30 duration-200">
                        <h3 className="absolute w-full text-xl top-2 z-10">720</h3>
                          <Image className="group-hover:animate-pulse group-hover:brightness-110" src={crystal2}/>
                          <div className="h-8 flex text-center bg-purple-950/50 w-full rounded-b-xl items-center justify-center absolute bottom-0">
                              <h5>0.12 SOL</h5>
                          </div>
                      </button>
                  </div>
                  <div className="sm:grid sm:grid-flow-row sm:grid-rows-2 sm:gap-3">

                    {/* box3 */}
                  <button onClick={()=>{buyXP(0.25, 1500)}} className="sm:my-0 my-4 text-center relative rounded-xl bg-[#7c06d3] group cursor-pointer hover:brightness-110 hover:shadow-2xl hover:shadow-purple-600/30 duration-200">
                        <h3 className="absolute w-full text-xl top-2 z-10">1500</h3>
                          <Image className="group-hover:animate-pulse group-hover:brightness-110" src={crystal3}/>
                          <div className="h-8 flex text-center bg-purple-950/50 w-full rounded-b-xl items-center justify-center absolute bottom-0">
                              <h5>0.25 SOL</h5>
                          </div>
                      </button>

                      {/* box4 */}
                      <button onClick={()=>{buyXP(0.5, 3500)}} className="sm:my-0 my-4 text-center relative rounded-xl bg-[#7c06d3] group cursor-pointer hover:brightness-110 hover:shadow-2xl hover:shadow-purple-600/30 duration-200">
                        <h3 className="absolute w-full text-xl top-2 z-10">3500</h3>
                          <Image className="group-hover:animate-pulse group-hover:brightness-110" src={crystal4}/>
                          <div className="h-8 flex text-center bg-purple-950/50 w-full rounded-b-xl items-center justify-center absolute bottom-0">
                              <h5>0.5 SOL</h5>
                          </div>
                      </button>
                  </div>
              </div>

              {/* box5 */}
              <button onClick={()=>{buyXP(1, 7500)}} className="sm:my-0 my-4 h-full text-center flex items-center relative rounded-xl bg-[#7c06d3] group cursor-pointer hover:brightness-110 hover:shadow-2xl hover:shadow-purple-600/30 duration-200">
                        <h3 className="absolute w-full text-xl top-2 z-10">7500</h3>
                          <Image className="group-hover:animate-pulse group-hover:brightness-110" src={crystal5}/>
                          <div className="h-8 flex text-center bg-purple-950/50 w-full rounded-b-xl items-center justify-center absolute bottom-0">
                              <h5>1 SOL</h5>
                          </div>
              </button>
          </div>
        </div>

  

        
        </div>
      </div>
        
        
      </div>
    </main>
  );
}
