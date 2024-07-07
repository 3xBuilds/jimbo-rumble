"use client"

import Image from 'next/image'
import bg from '../../assets/bg.png'
import bg2 from "@/assets/bg-copy.png"
import { usePathname } from 'next/navigation'

const Background = () => {

  const pathname = usePathname();
  console.log(pathname)

  if (pathname != "/" && pathname != "/market" && pathname != "/tap")
  return (
    <div className="w-screen h-screen overflow-hidden fixed top-0 left-0 -z-5">
        <Image src={bg} className="w-full h-full object-cover"/>
    </div>
  )
}

export default Background