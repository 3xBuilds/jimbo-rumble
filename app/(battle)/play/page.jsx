"use client"

import { useState } from "react";

import NFTCard from '@/components/global/NFTCards'

import useSolanaNFTFetch from '@/hooks/useSolanaNFTFetch'

const Play = () => {
  const { NFTs } = useSolanaNFTFetch({ apiKey: "AkEA6RnkX6IwV-Ni" });
  const [chosen, setChosen] = useState("")

  if (NFTs) {
    var jimboNFTs = NFTs.filter(nft => nft.collection.address == "9HQSqsxGZPvkLtGRjHww9sp6S2MZCr6QfjR32LMXA7E5")
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-jimbo-green text-left max-md:text-center">Current Fighters (26)</h3>

      <div className="flex flex-row gap-2 mt-2 noscr">
        <NFTCard username="Needle" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/814" type={"selected"} />
        <NFTCard username="Sayak" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/812" type={""} />
        <NFTCard username="Aritra" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/809" type={""} />
        <NFTCard username="Test02" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/810" type={""} />
        <NFTCard username="NewUser" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/808" type={""} />
      </div>

      <div className="bg-jimbo-green/20 h-[2px] w-full my-4"></div>

      <h3 className="text-jimbo-green text-left max-md:text-center">Select Your NFT to Play</h3>

      <div className="flex flex-row gap-2 mt-2 noscr">
        {jimboNFTs ? jimboNFTs.map((nft) => <>
          <NFTCard key={nft.name} id={nft.name} nftname={nft.name} image={nft.image_uri} type={"user"} setChosen={setChosen} selected={nft.name === chosen}/>
        </>) :
          <h1 className=" text-red-600">Loading...</h1>
        }
      </div>
    </div>
  )
}

export default Play