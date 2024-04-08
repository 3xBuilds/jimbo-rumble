"use client"

import axios from "axios"

import { useEffect, useState } from "react";
import NFTCard from '@/components/global/NFTCards'
import useSolanaNFTFetch from '@/hooks/useSolanaNFTFetch'
import { useGlobalContext } from "@/context/MainContext";
import Link, { useRouter } from "next/navigation"
import { toast } from "react-toastify"

import usePhantomProvider from "@/hooks/usePhantomProvider"
import paySolana from "@/utils/paySolana"
import payToken from "@/utils/payToken";

const Play = () => {

  const router = useRouter();
  const { NFTs } = useSolanaNFTFetch({ apiKey: "AkEA6RnkX6IwV-Ni" });
  const [chosen, setChosen] = useState("");
  const [players, setPlayers] = useState([]);
  const { user } = useGlobalContext();
  const [game, setGame] = useState(null);

  const [entryFee, setEntryFee] = useState(null);

  const { provider } = usePhantomProvider();

  if (NFTs) {
    var jimboNFTs = NFTs.filter(nft => nft.collection.address == "9HQSqsxGZPvkLtGRjHww9sp6S2MZCr6QfjR32LMXA7E5")
  }

  const joinBattle = async () => {
    if (chosen) {
      let transaction;
      if(game.currency == "SOL"){
        transaction = await paySolana(provider, entryFee * 1000000000, process.env.NEXT_PUBLIC_JIMBO_KEY)
      }
      else{
        transaction = await payToken(provider, entryFee * 1000000, process.env.NEXT_PUBLIC_JIMBO_KEY)
      }

      if (transaction) {
        const parts = chosen?.split("#");
        const extractedNumber = parts[1];

        const res = axios.post("/api/game/join", {
          id: user._id,
          tokenId: extractedNumber
        })
          .then((res) => {
            toast.success(`You have joined the battle!`)
            getPlayers()
          })
          .catch((err) => {
            toast.error(err.response.data.error)
          })
      } else {
        toast.error("Payment Failed")
      }
    } else {
      toast.error("Please select an NFT to play")
    }
  }

  async function getCurrentGame() {
    try {
      const res = await axios.get("/api/game/current");
      setEntryFee(res.data.currentGame.fee);
      setGame(res.data.currentGame)
    }
    catch (err) {
      // toast.error("No Ongoing Battle")
      if (err.response.status == 404) {
        router.push("/")
      }
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now()
      if (now >= Number(game?.battleStartTime)) {
        router.push("/battle")
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [game]);

  const getPlayers = () => {

    axios.get("/api/game/players/active")
      .then((res) => {
        setPlayers(res.data.activePlayers);
      }).catch((err) => {
      })


  }

  useEffect(() => {
    getPlayers();
    getCurrentGame()
  }, [user])


  if (entryFee != null)
    return (
      <div className="flex flex-col">
        <h3 className="text-jimbo-green text-left max-md:text-center">Current Fighters ({players.length})</h3>

        <div className={`grid ${!players.some(player => player.userId == user._id) || (players?.length <= 11) ? "grid-rows-1" : "grid-rows-2"} grid-flow-col items-center justify-start gap-2 mt-2 noscr h-full`}>
          {
            players.map((player) => (
              <NFTCard currency={game.currency} username={player.username} nftname={`#Jimbo${player.tokenId}`} image={`https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/${player.tokenId}`} type={user._id == player.userId ? "selected" : ""} />
            ))
          }

        </div>

        {!players.some(player => player.userId == user._id) ? <>
          <div className="bg-jimbo-green/20 h-[2px] w-full my-4"></div>

          <h3 className="text-jimbo-green text-left max-md:text-center">Select Your NFT to Play</h3>

          <div className="flex flex-row gap-2 mt-2 noscr">
            {jimboNFTs ? jimboNFTs?.map((nft) => <>
              <NFTCard key={nft.name} currency={game.currency} id={nft.name} entryFee={entryFee} nftname={nft.name} joinBattle={joinBattle} image={nft.image_uri} type={"user"} setChosen={setChosen} selected={nft.name === chosen} />
            </>) :
              <h1 className=" text-red-600">Loading...</h1>
            }
          </div>
        </> :
          <>
            <h3 className="text-white text-center text-sm max-md:text-center mt-8 mb-2">You have already Joined</h3>
            <button onClick={() => { router.push("/battle") }} className="bg-jimbo-green/70 hover:bg-jimbo-green/80 duration-200 py-2 px-12 w-fit mx-auto rounded-2xl">Go to Battle</button>
          </>
        }
      </div>
    )

  else {
    return (
      <div className="w-full h-full items-center flex justify-center">
        <h2 className="text-jimbo-green text-xl">No Games Scheduled!</h2>
      </div>
    )
  }
}

export default Play