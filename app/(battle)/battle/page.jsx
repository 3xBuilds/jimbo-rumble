"use client"
import Image from 'next/image'

import { useState, useEffect } from 'react';
import { startGame } from '@/utils/wordPlay';
import axios from "axios"
import moment from 'moment';
import wiz1 from '../../../assets/characters/wiz1.png'
import wiz2 from '../../../assets/characters/wiz2.png'
import war3 from '../../../assets/characters/war3.png'
import war2 from '../../../assets/characters/war2.png'
import { useGlobalContext } from '@/context/MainContext';
import {toast} from 'react-toastify';

const page = () => {


    const [alive, setAlive] = useState(true);
    const [game, setGame] = useState(null);
    const{user} = useGlobalContext();
    const [prevRounds, setPrevRounds] = useState(null);
    
    const [showRevivePopup, setShowRevivePopup] = useState(false);

    const [dialogues, setDialogues] = useState([]);
    // const [battleProgress, setBattleProgress] = useState()

    async function getCurrentGame(){
        try{
            await axios.get("/api/game/current").then((res)=>{setGame(res.data.currentGame);

            const playerAlive = res.data.currentGame.players.filter((item)=>{

                if(item.userId == user._id){
                    return true;
                }
            })
            setAlive(playerAlive[0]?.isAlive);
            console.log("slice",res.data.currentGame.rounds.slice(0,-1));
            setPrevRounds(
                res?.data?.currentGame?.rounds?.slice(0,-1)
            )
            
            
            }).catch((err)=>{
                console.log(err);
            });
        }
        catch(err){
            console.log(err);
        }
    }

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const mess = game?.rounds[game?.rounds?.length-1]?.messages;
        const intervalId = setInterval(() => {
            const now = Date.now();
            mess?.map((message, index) => {
                if (now >= Number(message.timeStamp)) {
                    setCurrentMessageIndex(index);
                }
            })} ,1000);
        return () => clearInterval(intervalId);
    }, [currentMessageIndex, game?.rounds[game?.rounds?.length-1]?.messages ]);

    useEffect(() => {
        if(user)
        getCurrentGame();
    } ,[user]);

    useEffect(()=>{
        revivePrompt();
    }, [currentMessageIndex, alive])

    const revivePrompt = () => {
        if(currentMessageIndex>=game?.rounds[game?.rounds?.length-1]?.messages.length-1 && !alive){
            getCurrentGame();
            setTimeout(()=>setShowRevivePopup(true),3000);
        }
        if(currentMessageIndex>=game?.rounds[game?.rounds?.length-1]?.messages.length-1 && alive){
            console.log("You are alive this round, wait for second round to start");
        }
    }

  return (
    <>
        <Image src={war2} className="w-48 max-md:w-28 max-md:right-1 absolute bottom-5 right-5"/>
        <Image src={war3} className="w-40 max-md:w-20 max-md:left-1 absolute bottom-5 left-5 transform -scale-x-100"/>
            
        <div className="w-[80%] text-white max-md:w-[98%] mx-auto flex flex-col-reverse gap-2">

            <h2 className='text-center text-jimbo-green mb-2'>------ {"Round-" + (game?.rounds?.length)} ------</h2>

            { game?.status == "ongoing" &&
                game?.rounds[game?.rounds?.length-1]?.messages?.slice(0, currentMessageIndex + 1)?.map((message, index) => {
                    // if(Date.now() >= message.timeStamp){
                        if(message?.message?.startsWith("-----")) return (
                            <div className="bg-jimbo-green/50 border-jimbo-green border-[1px] rounded-xl h-16 flex items-center justify-center">
                                <p className="text-white text-sm text-center"> {message?.message?.slice(6)}{currentMessageIndex}</p>
                            </div>)
                        else return (
                            <div key={index} className="bg-jimbo-green/10 rounded-xl h-16 flex items-center justify-center">
                                <p className="text-white text-sm text-center"> {message?.message} </p>
                            </div>
                        )
                    // }
                })
            }
        </div>

        <div className="w-[80%] text-white max-md:w-[98%] mx-auto flex flex-col-reverse gap-2">
        {
            prevRounds?.map((round, index) => (
                <>
                        <h2 className='text-center text-jimbo-green'>------ {"Round-" + (index+1)} ------</h2>
                    { game?.status == "ongoing" &&
                        round?.messages?.map((message, index) => {
                            // if(Date.now() >= message.timeStamp){
                                if(message?.message?.startsWith("-----")) return (
                                    <div className="bg-jimbo-green/50 border-jimbo-green border-[1px] rounded-xl h-16 flex items-center justify-center">
                                        <p className="text-white text-sm text-center"> {message?.message?.slice(6)}{currentMessageIndex}</p>
                                    </div>)
                                else return (
                                    <div key={index} className="bg-jimbo-green/10 rounded-xl h-16 flex items-center justify-center">
                                        <p className="text-white text-sm text-center"> {message?.message} </p>
                                    </div>
                                )
                            // }
                        })
                    }
                </>
            ))
        }
        </div>
        {showRevivePopup && <RevivePopup game={game} id={user._id} showRevivePopup={showRevivePopup} setShowRevivePopup={setShowRevivePopup} setAlive={setAlive}/>}
        
    </>
  )
}

const RevivePopup = ({game, id, showRevivePopup, setShowRevivePopup, setAlive}) => {

    const revivePlayer = async () => {
        try{
            const res = await axios.post(`/api/user/revive/${id}`);
            console.log(res);
            setAlive(true);
            toast.success("You are successfully revived");

        }
        catch(err){
            console.log(err);
            if(err.response.status == 409){
                toast.error(err.response.data.error);
            }
        }

    }

    return (
        <div className='w-screen h-screen fixed top-0 left-0 bg-black/20 backdrop-blur-lg flex items-center justify-center'>
            <div className='text-center flex flex-col items-center justify-center'>
                <h3 className='text-white'> You were killed this round <br /> You can revive now with <br /> <span className='text-jimbo-green text-2xl mt-3'>{game?.revivalFee || "--"} SOL</span></h3>
                <button onClick={()=>{revivePlayer()}} className='cursor-pointer mt-10 bg-jimbo-green/60 px-4 py-2 text-lg rounded-xl hover:bg-jimbo-green/90 duration-200'>Revive Player</button>
                <button onClick={()=>{setShowRevivePopup(false)}} className='cursor-pointer mt-2 bg-jimbo-green/30 px-4 py-2 text-lg rounded-xl hover:bg-jimbo-green/90 duration-200'>Spectate Game</button>
            </div>
        </div>
    )
}

const WaitPopup = ({game, id, showRevivePopup, setShowRevivePopup, setAlive}) => {

    return (
        <div className='w-screen h-screen fixed top-0 left-0 bg-black/20 backdrop-blur-lg flex items-center justify-center'>
            <div className='text-center flex flex-col items-center justify-center gap-10'>
                <h3 className='text-white'> You were killed this round <br /> You can revive now with <br /> <span className='text-jimbo-green text-2xl mt-3'>{game?.revivalFee || "--"} SOL</span></h3>
                <button onClick={()=>{revivePlayer()}} className='cursor-pointer bg-jimbo-green/60 px-4 py-2 text-lg rounded-xl hover:bg-jimbo-green/90 duration-200'>Revive Player</button>
            </div>
        </div>
    )
}

export default page