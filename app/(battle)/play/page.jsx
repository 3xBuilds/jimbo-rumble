import NFTCard from '@/components/global/NFTCards'
import React from 'react'

const Play = () => {
  return (
    <div className="flex flex-col">
      <h3 className="text-jimbo-green text-left">Current Fighters (26)</h3>

      <div className="flex flex-row gap-2 mt-2 noscr">
        <NFTCard username="Needle" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/814" type={"selected"}/>
        <NFTCard username="Sayak" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/812" type={""}/>
        <NFTCard username="Aritra" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/809" type={""}/>
        <NFTCard username="Test02" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/810" type={""}/>
        <NFTCard username="NewUser" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/808" type={""}/>
      </div>

      <div className="bg-jimbo-green/20 h-[2px] w-full my-4"></div>

      <h3 className="text-jimbo-green text-left">Select Your NFT to Play</h3>

      <div className="flex flex-row gap-2 mt-2 noscr">
        <NFTCard username="Sayak" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/821" type={"chosen"}/>
        <NFTCard username="Aritra" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/822" type={"user"}/>
        <NFTCard username="Aritra" nftname="#Jimbo234" image="https://images.pinit.io/ipfs/QmREHsnRoKN4ZGWU9oozBwDDTCfxkcDuB8V7o3CoCNtyfN/816" type={"user"}/>
      </div>
    </div>
  )
}

export default Play