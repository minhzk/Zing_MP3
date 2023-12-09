import React, { useEffect } from 'react'
import { Header, Slider } from '../../components'

const Home = () => {

  return (
    <div className='overflow-y-auto px-[59px] w-full'>
      <div className='h-[70px] flex items-center'>
        <Header/>
      </div>
      <Slider/>

    </div>
  )
}

export default Home