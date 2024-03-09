import Image from 'next/image'
import bg from '../../assets/bg.png'

const Background = () => {
  return (
    <div className="w-screen h-screen overflow-hidden fixed top-0 left-0 -z-10">
        <Image src={bg} className="w-full h-full object-cover"/>
    </div>
  )
}

export default Background