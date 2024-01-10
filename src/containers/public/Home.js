import React from 'react'
import { Section, NewRelease, ChartSection, SongItem } from '../../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import Slider from "react-slick"

const Home = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true
  }
  const {chill, sad, top100, hotAlbum, weekChart, remix, topYear, topNewSong} = useSelector(state => state.app)
  // console.log(weekChart);

  return (
    <div className='overflow-y-auto w-full'>
      {/* <Slider/> */}
      <NewRelease/>
      <Section data={remix} items={remix?.items}/>
      <Section data={topYear} items={topYear?.items}/>
      <Section data={chill} items={chill?.items}/>
      <Section data={sad} items={sad?.items}/>
      <div className='mt-12 w-full'>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-black-100">{topNewSong?.title}</h3>
          <div className="text-text-secondary flex gap-1 cursor-pointer">
            <span className="text-[13px] font-medium ">
              TẤT CẢ
            </span>
            <span className="flex justify-center items-center pt-[1px]"><IoIosArrowForward size={20}/></span>
          </div>
        </div>
        <div className="w-full">
          <Slider {...settings}>
            {topNewSong?.items?.map((item, index) => (
              <div key={item?.encodeId} className={`px-[14px]`}>
                <SongItem
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artistsNames={item?.artistsNames}
                  sid={item?.encodeId}
                  bgColor='bg-[hsla(0,0%,100%,0.3)]'
                  size='max-w-[120px]'
                  topSongReleaseData={item?.releaseDate}
                  rankSong={index + 1}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <ChartSection/>
      <div className='flex items-center w-full mt-7'>
        {weekChart?.map((item, index) => (
          <Link to={item?.link?.split('.')[0]} key={item?.link} className={`flex-1 ${index === 1 && 'px-7'}`}>
            <img src={item?.cover} alt="cover" className='w-full object-cover rounded-md'/>
          </Link>
        ))}
      </div>
      <Section data={top100} artists items={top100?.items}/>
      <Section data={hotAlbum} artists items={hotAlbum?.items}/>

      <div className='w-full h-[500px]'></div>
    </div>
  )
}

export default Home