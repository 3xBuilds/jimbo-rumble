import React from 'react'

const Timer = () => {
  return (
    <div className="w-72 border-2 border-jimbo-green bg-jimbo-green/10 border-b-0 rounded-t-3xl flex flex-col items-center justify-center gap-1 text-center p-10 py-5 mt-2">
        <h3 className="text-xl text-white">3d : 8h : 26m</h3>
        <div className="h-[1px] bg-white w-48"></div>
        <h4 className="text-sm text-jimbo-green">BATTLE STARTS IN</h4>
    </div>
  )
}

export default Timer