import React from 'react'
import { Fade } from 'react-awesome-reveal'
Fade


function LoadingScreen() {
  return (
    <Fade>
        <div className=' h-[100vh] w-[100vw] flex justify-center'>
            <h1 className='text-[60px] font-extrabold text-white'>
                Please Wait
            </h1>
        </div>
    </Fade>
  )
}

export default LoadingScreen