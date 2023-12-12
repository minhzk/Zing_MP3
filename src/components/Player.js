import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as apis from '../apis'
import icons from '../utils/icons'

const { 
  IoMdHeart, IoMdHeartEmpty, BsThreeDots, RiSkipBackFill, RiSkipForwardFill, 
  PiRepeatLight, IoIosPlay, PiShuffleLight, IoIosPause 

} = icons

const Player = () => {

  const audioEl = new Audio()
  const { curSongId, isPlaying } = useSelector(state => state.music)
  const [songInfo, setSongInfo] = useState(null)
  const [source, setSource] = useState(null)
  // const [isPlaying, setIsPlaying] = useState(false)


  // useEffect kh sd được bất đồng bộ
  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.getDetailSong(curSongId),
        apis.getSong(curSongId)
      ])
      // console.log(res);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data)
      }
      if (res2.data.err === 0) {
        setSource(res2.data.data['128'])
      }
    }

    fetchDetailSong()
  }, [curSongId])

  useEffect(() => {
    // audioEl.play()
  }, [curSongId])

  const handleTogglePlayMusic = () => {
  }

  return (
    <div className='bg-main-400 px-5 h-full flex py-2'>
      <div className='w-[30%] flex-auto flex items-center gap-[10px]'>
        <img src={songInfo?.thumbnail} alt="thumbnail" className='w-16 h-16 object-cover rounded-md' />
        <div className='flex flex-col'>
          <span className='font-medium text-black-100 text-[15px]'>{songInfo?.title}</span>
          <span className='text-gray-500 text-[13px] font-normal'>{songInfo?.artistsNames}</span>
        </div>
        <div className='flex gap-4 pl-2'>
          <span>
            <IoMdHeartEmpty size={16}/>
          </span>
          <span>
            <BsThreeDots size={16}/>
          </span>
        </div>
      </div>
      <div className='w-[40%] flex-auto flex flex-col justify-center items-center border border-red-500 gap-2'>
        <div className='flex gap-8 justify-center items-center'>
          <span className='cursor-pointer' title='Bật phát ngẫu nhiên'><PiShuffleLight size={20}/></span>
          <span className='cursor-pointer'><RiSkipBackFill size={21}/></span>
          <span 
          className='p-2 cursor-pointer border border-gray-700 rounded-full flex items-center justify-normal hover:text-text-hover hover:border-text-hover'
          onClick={handleTogglePlayMusic}
          >
            {isPlaying ? <IoIosPause size={22}/> : <IoIosPlay size={22}/>}
          </span>
          <span className='cursor-pointer'><RiSkipForwardFill size={21}/></span>
          <span className='cursor-pointer' title='Bật phát lại tất cả'><PiRepeatLight size={20}/></span>
        </div>
        <div>
          progress bar
        </div>
      </div>
      <div className='w-[30%] flex-auto border border-red-500'>
        Volume
      </div>
    </div>
  )
}

export default Player