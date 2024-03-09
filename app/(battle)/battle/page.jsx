import Image from 'next/image'

import wiz1 from '../../../assets/characters/wiz1.png'
import wiz2 from '../../../assets/characters/wiz2.png'
import war3 from '../../../assets/characters/war3.png'
import war2 from '../../../assets/characters/war2.png'

const page = () => {
  return (
    <>
        <Image src={war2} className="w-48 absolute bottom-5 right-5"/>
        <Image src={war3} className="w-40 absolute bottom-5 left-5 transform -scale-x-100"/>
        <div className="w-[80%] mx-auto flex flex-col gap-2">
            <div className="bg-jimbo-green/50 border-jimbo-green border-[1px] rounded-xl h-16 flex items-center justify-center">
                <p className="text-white text-sm text-center"> <span className="text-jimbo-green"> NEEDLE </span> is the last man standing</p>
            </div>
            <div className="bg-jimbo-green/10 rounded-xl h-16 flex items-center justify-center">
                <p className="text-white text-sm text-center"> <span className="text-jimbo-green"> NEEDLE </span> stabbed <span className="text-jimbo-green">ARITRA02</span> with a mythical dagger</p>
            </div>
            <div className="bg-jimbo-green/10 rounded-xl h-16 flex items-center justify-center">
                <p className="text-white text-sm text-center"> <span className="text-jimbo-green"> SAYAK69 </span> fell into a pit while drinking potion</p>
            </div>
            <div className="bg-jimbo-green/10 rounded-xl h-16 flex items-center justify-center">
                <p className="text-white text-sm text-center"> <span className="text-jimbo-green"> TEST1234 </span>  was blasted with a fireball by <span className="text-jimbo-green"> SAYAK69 </span> </p>
            </div>
        </div>
    </>
  )
}

export default page