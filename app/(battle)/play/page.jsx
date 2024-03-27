"use client"

import axios from "axios"

import { useEffect, useState } from "react";
import NFTCard from '@/components/global/NFTCards'
import useSolanaNFTFetch from '@/hooks/useSolanaNFTFetch'
import { useGlobalContext } from "@/context/MainContext";
import Link, { useRouter } from "next/navigation"

const Play = () => {

  const router = useRouter();
  const { NFTs } = useSolanaNFTFetch({ apiKey: "AkEA6RnkX6IwV-Ni" });
  const [chosen, setChosen] = useState("");
  const [players, setPlayers] = useState([]);
  const {user} = useGlobalContext();

  const [entryFee, setEntryFee] = useState(null);

  if (NFTs) {
    var jimboNFTs = NFTs.filter(nft => nft.collection.address == "9HQSqsxGZPvkLtGRjHww9sp6S2MZCr6QfjR32LMXA7E5")
  }

  const paySolana = () => {
    return true;
  }

  const joinBattle = async () => {
    if (chosen) {
      if (paySolana()) {
        const parts = chosen?.split("#");
        const extractedNumber = parts[1];
        console.log({
          id: user._id,
          tokenId: extractedNumber
        })
        const res = axios.post("/api/game/join",{
          id: user._id,
          tokenId: extractedNumber
        })
        .then((res) => {
          console.log(res.data);
          alert(`You have joined the battle!`)
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.error)
        })
        

        console.log("Battle Joined")
      } else {
        console.log("Payment Failed")
      }
    } else {
      console.log("Please select an NFT to play")
    }
  }

  async function getCurrentGame(){
    try{

      const res = await axios.get("/api/game/current");
      setEntryFee(res.data.currentGame.fee);
      
    }
    catch(err){
      console.log(err);
    }
  }

  const getPlayers = () => {

      axios.get("/api/game/players/active")
        .then((res) => {
          console.log(res);
          setPlayers(res.data.activePlayers);
        }).catch((err)=>{
          console.log(err)
        })

  
  }

  useEffect(()=>{
    getPlayers();
    getCurrentGame()
  }, [user])


  if(entryFee != null)
  return (
    <div className="flex flex-col">
      <h3 className="text-jimbo-green text-left max-md:text-center">Current Fighters ({players.length})</h3>

      <div className={`grid ${!players.some(player => player.userId == user._id) || (players?.length <=11) ? "grid-rows-1" : "grid-rows-2"} grid-flow-col items-center justify-start gap-2 mt-2 noscr h-full`}>
        {
          players.map((player) => (
            <NFTCard username={player.username} nftname={`#Jimbo${player.tokenId}`} image={`https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/${player.tokenId}`} type={user._id==player.userId? "selected": ""} />
            ))
          }
          
      </div>

        {!players.some(player => player.userId == user._id) ? <>
          <div className="bg-jimbo-green/20 h-[2px] w-full my-4"></div>

          <h3 className="text-jimbo-green text-left max-md:text-center">Select Your NFT to Play</h3>

          <div className="flex flex-row gap-2 mt-2 noscr">
            { jimboNFTs ? jimboNFTs?.map((nft) => <>
              <NFTCard key={nft.name} id={nft.name} entryFee={entryFee} nftname={nft.name} joinBattle={joinBattle} image={nft.image_uri} type={"user"} setChosen={setChosen} selected={nft.name === chosen}/>
            </>) :
              <h1 className=" text-red-600">Loading...</h1>
            }
          </div>
        </>:
        <>
          <h3 className="text-white text-center text-sm max-md:text-center mt-8 mb-2">You have already Joined</h3>
          <button onClick={()=>{router.push("/battle")}} className="bg-jimbo-green/70 hover:bg-jimbo-green/80 duration-200 py-2 px-12 w-fit mx-auto rounded-2xl">Go to Battle</button>
        </>
        }
    </div>
  )

  else{
    return(
      <div className="w-full h-full items-center flex justify-center">
        <h2 className="text-jimbo-green text-xl">No Games Scheduled!</h2>
      </div>
    )
  }
}

export default Play