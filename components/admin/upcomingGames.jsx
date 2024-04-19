"use client"

import React, { useState, useEffect } from 'react'
import axios from "axios"
import moment from 'moment'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaFlag } from "react-icons/fa"
import { toast } from "react-toastify"

import usePhantomProvider from '@/hooks/usePhantomProvider';
import paySolana from '@/utils/paySolana';
import payToken from '@/utils/payToken';

export const UpcomingGames = () => {

    const { provider } = usePhantomProvider();

    const [upcomingGames, setUpcomingGames] = useState([])

    const [game, setGame] = useState(null);

    const [roundEndTime, setRoundEndTime] = useState("");
    const [revivalTime, setRevivalTime] = useState("");

    const [revivalStopped, setRevivalStopped] = useState(false);
    const [roundEnded, setRoundEnded] = useState(false);


    const [playersAlive, setPlayersAlive] = useState(0);

    // const [showRevivePopup, setShowRevivePopup] = useState(false);
    // const [showWaitPopup, setShowWaitPopup] = useState(true);

    const checkRevivalStopTime = () => {
        const now = Date.now();
        if (Number(game?.rounds[game?.rounds?.length - 1]?.revivalStopTime) <= now) {
            // setShowRevivePopup(false);
            setRevivalStopped(true);
        }
    }

    const checkRoundEndStopTime = () => {
        const now = Date.now();
        if (Number(game?.rounds[game?.rounds?.length - 1]?.roundEndTime) <= now) {
            setRoundEnded(true);
            window.location.reload();
        }
    }

    const revivalStopCountDown = () => {
        setRevivalTime(` ${(moment.duration(Number(game?.rounds[game?.rounds?.length - 1]?.revivalStopTime) - Date.now())).minutes()} : ${(moment.duration(Number(game?.rounds[game?.rounds?.length - 1]?.revivalStopTime) - Date.now())).seconds().toString().padStart(2, '0')}`);
    }

    const roundEndCountDown = () => {
        setRoundEndTime(`${(moment.duration(Number(game?.rounds[game?.rounds?.length - 1]?.roundEndTime) - Date.now())).minutes()} : ${(moment.duration(Number(game?.rounds[game?.rounds?.length - 1]?.roundEndTime) - Date.now())).seconds().toString().padStart(2, '0')}`);
    }

    async function getGames() {
        try {
            const res = await axios.get("/api/game");
            const scheduledGames = res.data.games.reverse()

            setGame(scheduledGames[0]);

            setPlayersAlive(scheduledGames[0].players.filter(i => i.isAlive).length)

            setUpcomingGames(scheduledGames);

        }
        catch (err) {
        }
    }

    useEffect(() => {
        if (game?.status !== "ended") {
            const intervalId = setInterval(() => {

                revivalStopCountDown()
                roundEndCountDown()

                checkRevivalStopTime()
                checkRoundEndStopTime()

            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [
        game
    ]);

    async function deleteGame(id) {
        try {
            await axios.delete("/api/admin/game/" + id).then((res) => {
                toast.success("Game Deleted Successfully");
                window.location.reload();
            });

        }
        catch (err) {
        }
    }

    async function startGame(id) {
        try {
            await axios.get("/api/admin/game/" + id + "/start").then((res) => {
                toast.success("Game Started Successfully");
            });
            window.location.reload();
        }
        catch (err) {
            toast.error("Game could not start");
        }
    }

    async function endGame(id) {
        try {
            const res = await axios.get("/api/admin/game/" + id + "/end")

            toast.success(res.data.message);
            getGames();
        }
        catch (err) {
            toast.error(err.response.data.error);
        }
    }

    async function sendSolana(key) {
        try {
            console.log(provider);
            await paySolana(provider, upcomingGames[key]?.rewardPool * 700000000, upcomingGames[key].winner.walletId);
            toast.success("Reward Distributed Successfully");
        }
        catch (err) {
            console.log(err);
        }
    }

    async function sendToken(key) {
        try {
            console.log(provider);
            await payToken(provider, upcomingGames[key]?.rewardPool * 7000, upcomingGames[key].winner.walletId);
            toast.success("Reward Distributed Successfully");
        }
        catch (err) {
            console.log(err);
        }
    }



    useEffect(() => {
        getGames();
    }, [])

    return (
        <div className='mt-10 w-[90%] mx-auto text-center flex flex-col items-center'>
            <h3 className='text-jimbo-green text-2xl my-5'>Games</h3>

            {game?.status == "ongoing" && !revivalStopped && <h3 className='text-center mx-auto text-white my-2'>Revival Ongoing Till: <br /> <span className='text-2xl text-jimbo-green'>{revivalTime}</span></h3>}
            {game?.status == "ongoing" && revivalStopped && !roundEnded && <h3 className='text-center mx-auto text-white my-2'>Round Ends In: <br /> <span className='text-2xl text-jimbo-green'>{roundEndTime}</span></h3>}
            {game?.status == "ongoing" && <h3 className='text-center mx-auto text-white my-2'>Alive: {playersAlive}</h3>}
            <div className='bg-black/40 rounded-xl px-6 py-3 w-[90%] max-h-[30rem] overflow-scroll noscr'>
                {upcomingGames.map((i, key) => (
                    <div className={`relative my-4 p-3 rounded-xl overflow-hidden ${i.status == "upcoming" ? " bg-gradient-to-br from-jimbo-green/80 to-jimbo-green/20 " : " bg-gray-400 "} ${i.status == "ended" ? " bg-slate-600 " : i.status == "ongoing" ? " bg-yellow-500 " : " bg-gradient-to-br from-jimbo-green/80 to-jimbo-green/20 "} `}>

                        {
                            // i.status == "upcoming" &&
                            <div>
                                <button onClick={() => { deleteGame(i._id) }} className='bg-red-500 rounded hover:bg-red-400 float-left duration-200 px-2 py-2 rounded-2'><RiDeleteBin6Fill /></button>

                            </div>}

                        <div className=' bg-black/40 rounded-bl-xl absolute top-0 right-0 px-5 py-2'>
                            <h3 className='text-white'>${i.currency}</h3>
                        </div>

                        <h2 className='text-xl text-center mb-5'>Entrants: {i.players.length} -- ({i.status})</h2>
                        {game?.status == "ended" && <h3 className='bg-black/20 rounded-lg w-fit px-4 py-1 mx-auto mb-2'>Winner: {i.winner?.username}</h3>}
                        <div className='grid grid-flow-col text-center gap-3'>
                            <h2 className='bg-white/50 text-black px-5 py-1 rounded'>Registration Closes: <br /> {moment(Number(i.regCloseTime)).format('LLL')}</h2>
                            <h2 className='bg-white/50 text-black px-5 py-1 rounded'>Starts on: <br /> {moment(Number(i.battleStartTime)).format('LLL')}</h2>
                        </div>
                        <div className='grid grid-flow-col text-center bg-black/60 rounded py-1 mt-2'>
                            <h2>Fee: {i.fee}</h2>
                            <h2>Revival Fee: {i.revivalFee}</h2>
                            <h2>Max Revives: {i.reviveLimit}</h2>
                        </div>
                        <button onClick={() => {
                            startGame(i._id);
                        }} className='bg-black/30 border-jimbo-green border-[1px] hover:bg-white/50 hover:text-black duration-300 px-5 py-1 rounded-lg mt-4'>{i.status == "upcoming" ? "Start Round" : i.status == "ongoing" ? "Start Next Round" : "Resume Game"}</button>
                        {i.status !== "ended" && <button onClick={() => {
                            endGame(i._id);
                        }} className='bg-black/30 border-jimbo-green border-[1px] ml-2 hover:bg-white/50 hover:text-black duration-300 px-5 py-1 rounded-lg mt-4'>End Game</button>}

                        {i.status == "ended" && <button className='bg-black/30 border-jimbo-green border-[1px] ml-2 hover:bg-white/50 hover:text-black duration-300 px-5 py-1 rounded-lg mt-4' onClick={() => {
                            game.currency == "SOL" ? sendSolana(key) : sendToken(key)
                        }}>Distribute Reward</button>}
                    </div>
                ))}
            </div>
        </div>
    )
}
