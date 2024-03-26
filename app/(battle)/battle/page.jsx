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

const page = () => {


    const [alive, setAlive] = useState(true);
    const [game, setGame] = useState(null);
    const{user} = useGlobalContext();

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
            
            }).catch((err)=>{
                console.log(err);
            });

                
        }
        catch(err){
            console.log(err);
        }
    }

    async function parseGameDialogues(){
        try{
            const roundNo = game?.rounds.length - 1;
            const messagesArr = game?.rounds[roundNo].messages;
            let i = 0;

            for(let i = 0; i<messagesArr.length; i++){
                if(messagesArr[i].timeStamp <= Date.now()){
                    console.log(messagesArr[i].message);
                    setDialogues(oldArr => [...oldArr , messagesArr[i]?.message]);
                }

                else{
                    i--;
                }
            }

        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(game)
        parseGameDialogues();
    },[game])

    useEffect(() => {
        if(user)
        getCurrentGame();
        
    } ,[user]);

  return (
    <>
        <Image src={war2} className="w-48 max-md:w-28 max-md:right-1 absolute bottom-5 right-5"/>
        <Image src={war3} className="w-40 max-md:w-20 max-md:left-1 absolute bottom-5 left-5 transform -scale-x-100"/>
        <div className="w-[80%] text-white max-md:w-[98%] mx-auto flex flex-col-reverse gap-2">


            { game?.status == "ongoing" &&
                dialogues.map((message, index) => {
                    // if(Date.now() >= message.timeStamp){
                        if(message?.startsWith("-----")) return (
                            <div className="bg-jimbo-green/50 border-jimbo-green border-[1px] rounded-xl h-16 flex items-center justify-center">
                                <p className="text-white text-sm text-center"> {message?.slice(6)}</p>
                            </div>)
                        else return (
                            <div key={index} className="bg-jimbo-green/10 rounded-xl h-16 flex items-center justify-center">
                                <p className="text-white text-sm text-center"> {message} </p>
                            </div>
                        )
                    // }
                })
            }

            {game?.status == "halted" && 
            <div className='text-center'>
                <div className="bg-jimbo-green/50 border-jimbo-green border-[1px] rounded-xl h-16 flex items-center justify-center">
                    <p className="text-white text-sm text-center"> {game?.rounds[game.rounds.length - 1].messages[game?.rounds[0].messages.length - 1].message.slice(6)} </p>
                </div>

               
                 {!alive && <button className='bg-jimbo-green/80 px-4 mt-10 py-3 hover:bg-jimbo-green/70 duration-200 hover:translate-y-1 shadow-lg shadow-black hover:shadow-jimbo-green/30 border-white border-2 rounded-xl text-xl'>Revive | {game?.revivalFee} SOL</button>}
                
                </div>
            }
        </div>
        
    </>
  )
}

export default page