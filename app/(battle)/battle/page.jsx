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
import { useRouter } from 'next/navigation';

const page = () => {

    const router = useRouter();


    const [alive, setAlive] = useState(true);
    const [game, setGame] = useState(null);
    const{user} = useGlobalContext();
    const [prevRounds, setPrevRounds] = useState(null);
    const [roundEndTime, setRoundEndTime] = useState("");
    const [revivalTime, setRevivalTime] = useState("");

    const [revivalStopped, setRevivalStopped] = useState(false);
    const [roundEnded, setRoundEnded] = useState(false);
    
    const [showRevivePopup, setShowRevivePopup] = useState(false);
    const [showWaitPopup, setShowWaitPopup] = useState(true);
    const [revivesLeft, setRevivesLeft] = useState(null);

    const [survivalMessage, setSurvivalMessage] = useState("");

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

            setRevivesLeft(game?.reviveLimit - playerAlive[0]?.revives);
            setPrevRounds(
                res?.data?.currentGame?.rounds?.slice(0,-1)
            )
            
            }).catch((err)=>{
                // toast.error("No Ongoing Battle")
                if(err.response.status == 404){
                    router.push("/")
                }
            });
        }
        catch(err){
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
        if(game?.status !== "ended"){
            const intervalId = setInterval(() => {

                revivalStopCountDown()
                roundEndCountDown()

                checkRevivalStopTime()
                checkRoundEndStopTime()

            } ,1000);
            return () => clearInterval(intervalId);
        }
    }, [
        game
    ]);

    const checkRevivalStopTime = () => {
        const now = Date.now();
        if(Number(game?.rounds[game?.rounds?.length-1]?.revivalStopTime) <= now){
            setShowRevivePopup(false);
            setRevivalStopped(true);
        }
    }

    const checkRoundEndStopTime = () => {
        const now = Date.now();
        if(Number(game?.rounds[game?.rounds?.length-1]?.roundEndTime) <= now){
            setRoundEnded(true);
            window.location.reload();
        }
    }

    const revivalStopCountDown = () => {
        setRevivalTime(` ${(moment.duration(Number(game?.rounds[game?.rounds?.length-1]?.revivalStopTime) - Date.now())).minutes()} : ${(moment.duration(Number(game?.rounds[game?.rounds?.length-1]?.revivalStopTime) - Date.now())).seconds().toString().padStart(2, '0')}`);
    }
    const roundEndCountDown = () => {
        setRoundEndTime(`${(moment.duration(Number(game?.rounds[game?.rounds?.length-1]?.roundEndTime) - Date.now())).minutes()} : ${(moment.duration(Number(game?.rounds[game?.rounds?.length-1]?.roundEndTime) - Date.now())).seconds().toString().padStart(2, '0')}`);
    }

    useEffect(() => {
        if(user)
        getCurrentGame();
    } ,[user]);

    useEffect(()=>{
        revivePrompt();
    }, [currentMessageIndex, alive]);

    // useEffect(()=>{
    //     if(roundEnded){
    //         window.location.reload();
    //     }
    // }, [roundEnded])

    const revivePrompt = () => {
        if(currentMessageIndex>=game?.rounds[game?.rounds?.length-1]?.messages.length-1 && !alive){
            getCurrentGame();
            setTimeout(()=>setShowRevivePopup(true),3000);
        }
        if(currentMessageIndex>=game?.rounds[game?.rounds?.length-1]?.messages.length-1 && alive){
            setRevivalStopped(true);
            setSurvivalMessage("You Survived This Round")
        }
    }

  return (
    <>
        <Image src={war2} className="w-48 max-md:w-28 max-md:right-1 absolute bottom-5 right-5"/>
        <Image src={war3} className="w-40 max-md:w-20 max-md:left-1 absolute bottom-5 left-5 transform -scale-x-100"/>
            
        <div className="w-[80%] text-white max-md:w-[98%] mx-auto flex flex-col-reverse gap-2">

            { game?.status !== "ended" && game && <h2 className='text-center text-jimbo-green mb-2'>------ {"Round-" + (game?.rounds?.length)} ------</h2>}

            { game?.status == "ended" && <h2 className='text-center text-jimbo-green'>------ Game Ended ------</h2>}

            { 
            // game?.status == "ongoing" &&
                game?.rounds[game?.rounds?.length-1]?.messages?.slice(0, currentMessageIndex + 1)?.map((message, index) => {
                    // if(Date.now() >= message.timeStamp){
                        if(message?.message?.startsWith("-----")) return (
                            <div className="bg-jimbo-green/50 border-jimbo-green border-[1px] rounded-xl h-16 flex items-center justify-center">
                                <p className="text-white text-sm text-center"> {message?.message?.slice(6)}</p>
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
        // game?.status == "ongoing" &&
            prevRounds?.map((round, index) => (
                <>
                        {game?.status !== "ended" && <h2 className='text-center text-jimbo-green'>------ {"Round-" + (index+1)} ------</h2>}
                    { game?.status == "ongoing" &&
                        round?.messages?.map((message, index) => {
                            // if(Date.now() >= message.timeStamp){
                                if(message?.message?.startsWith("-----")) return (
                                    <div className="bg-jimbo-green/50 border-jimbo-green border-[1px] rounded-xl h-16 flex items-center justify-center">
                                        <p className="text-white text-sm text-center"> {message?.message?.slice(6)}</p>
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

        {game?.status == "ongoing" && <>
        {showRevivePopup && !revivalStopped && <RevivePopup setRevivesLeft={setRevivesLeft} revivesLeft={revivesLeft} revivalStopped={revivalStopped} revivalTime={revivalTime} game={game} id={user._id} showRevivePopup={showRevivePopup} setShowRevivePopup={setShowRevivePopup} setAlive={setAlive}/>}
        {showWaitPopup && revivalStopped && !roundEnded && <WaitPopup revivesLeft={revivesLeft} survivalMessage={survivalMessage} roundEndTime={roundEndTime} game={game} id={user._id} showWaitPopup={showWaitPopup} setShowWaitPopup={setShowWaitPopup} />}
        </>}
    </>
  )
}

const RevivePopup = ({game, id, revivalStopped,revivesLeft,setRevivesLeft, showRevivePopup, revivalTime, setShowRevivePopup, setAlive}) => {

    const revivePlayer = async () => {
        try{
            const res = await axios.post(`/api/user/revive/${id}`);
            setAlive(true);
            toast.success("You are successfully revived");
            setShowRevivePopup(false);
            revivalStopped(true);
            setRevivesLeft(prev=>prev-1)
        }
        catch(err){
            if(err?.response?.status == 409){
                toast.error(err.response.data.error);
            }
        }

    }

    return (
        <div className='w-screen h-screen fixed top-0 left-0 bg-black/20 backdrop-blur-lg flex items-center justify-center'>
            <div className='text-center flex flex-col items-center justify-center'>

                <h3 className='text-white bg-white/10 rounded-lg px-4 py-2 mb-2 border-[1px] border-jimbo-green'> Revive within: <span className='text-jimbo-green text-2xl mt-3'>{revivalTime}</span></h3>
                <h3 className='text-white'>  Revives Left : <span className='text-jimbo-green text-base mt-2'>  {revivesLeft} </span></h3>
                <br />
                <h3 className='text-white'> You were killed this round <br /> You can revive now with <br /> <span className='text-jimbo-green text-2xl mt-3'>{game?.revivalFee || "--"} SOL</span></h3>
                <button onClick={()=>{revivePlayer()}} className='cursor-pointer mt-10 bg-jimbo-green/60 px-4 py-2 text-lg rounded-xl hover:bg-jimbo-green/90 duration-200'>Revive Player</button>
                <button onClick={()=>{setShowRevivePopup(false)}} className='cursor-pointer mt-2 bg-jimbo-green/30 px-4 py-2 text-lg rounded-xl hover:bg-jimbo-green/90 duration-200'>Spectate Game</button>
            </div>
        </div>
    )
}

const WaitPopup = ({game, id, roundEndTime, revivesLeft, showWaitPopup, survivalMessage, setShowWaitPopup}) => {

    return (
        <div className='w-screen h-screen fixed top-0 left-0 bg-black/20 backdrop-blur-lg flex items-center justify-center'>
            <div className='text-center flex flex-col items-center justify-center gap-10'>
                <h3 className='text-white bg-white/10 rounded-lg px-4 py-2 border-[1px] border-jimbo-green'>  <span className='text-jimbo-green text-2xl'> {survivalMessage} </span></h3>
                {/* <h3 className='text-white'>  Revives Left : <span className='text-jimbo-green text-base'>  {revivesLeft} </span></h3> */}
                <h3 className='text-white'> Next Round Starting in <br /> <span className='text-jimbo-green text-2xl mt-3'> {roundEndTime} </span></h3>
                <button onClick={()=>{setShowWaitPopup(false)}} className='cursor-pointer mt-2 bg-jimbo-green/30 px-4 py-2 text-lg rounded-xl hover:bg-jimbo-green/90 duration-200'>Spectate Game</button>
            </div>
        </div>
    )
}

export default page