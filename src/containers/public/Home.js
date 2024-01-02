import React from 'react'
import { Slider, Section, NewRelease, ChartSection } from '../../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  const {chill, sad, top100, hotAlbum, weekChart} = useSelector(state => state.app)
  // console.log(weekChart);

  return (
    <div className='overflow-y-auto w-full'>
      <Slider/>
      <NewRelease/>
      <Section data={chill}/>
      <Section data={sad}/>
      <ChartSection/>
      <div className='flex items-center w-full mt-7'>
        {weekChart?.map((item, index) => (
          <Link to={item?.link?.split('.')[0]} key={item?.link} className={`flex-1 ${index === 1 && 'px-7'}`}>
            <img src={item?.cover} alt="cover" className='w-full object-cover rounded-md'/>
          </Link>
        ))}
      </div>
      <Section data={top100}/>
      <Section data={hotAlbum}/>

      <div className='w-full h-[500px]'></div>
    </div>
  )
}

export default Home