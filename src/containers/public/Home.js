import React, { useEffect } from 'react'
import { Slider, Section, NewRelease } from '../../components'
import { useSelector } from 'react-redux'

const Home = () => {
  const {chill, sad, top100, hotAlbum} = useSelector(state => state.app)

  return (
    <div className='overflow-y-auto w-full'>
      <Slider/>
      <NewRelease/>
      <Section data={chill}/>
      <Section data={sad}/>
      <Section data={top100}/>
      <Section data={hotAlbum}/>
      <div className='w-full h-[500px]'></div>
    </div>
  )
}

export default Home