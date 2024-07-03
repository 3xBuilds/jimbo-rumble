import React from 'react'
import { Grid } from 'react-loader-spinner'

const Loader = ({loading}) => {
  if(loading) return (
    <div className='flex flex-col gap-5 text-white items-center justify-center w-screen h-screen absolute top-0 left-0 backdrop-blur-lg bg-/40 z-[9999]'>
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#ffffff"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
          />
            <h1 className='text-xl font-bold'>Don't refresh or data will be lost </h1>
    </div>
  )
}

export default Loader