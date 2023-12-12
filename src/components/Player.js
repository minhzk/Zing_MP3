import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as apis from '../apis'
import icons from '../utils/icons'

const { IoMdHeart, IoMdHeartEmpty, BsThreeDots } = icons

const Player = () => {

  const { curSongId } = useSelector(state => state.music)
  const [songInfo, setSongInfo] = useState(null)

  // useEffect kh sd được bất đồng bộ
  useEffect(() => {
    const fetchDetailSong = async () => {
      const res = await apis.getDetailSong(curSongId)
      // console.log(res);
      if (res.data.err === 0) {
        setSongInfo(res.data.data)
      }
    }

    fetchDetailSong()
  }, [curSongId])

  return (
    <div className='bg-main-400 px-5 h-full flex'>
      <div className='w-[30%] flex-auto border border-red-500 flex items-center gap-[10px]'>
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
      <div className='w-[40%] flex-auto border border-red-500'>
        Main Player
      </div>
      <div className='w-[30%] flex-auto border border-red-500'>
        Volume
      </div>
    </div>
  )
}

export default Player