import React, {memo} from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'
import { IoIosPlay } from 'react-icons/io'

const SongItem = ({thumbnail, title, artistsNames, sid, releaseDate, order, percent, style, size, song, bgColor, topSongReleaseData, rankSong}) => {

  const dispatch = useDispatch()
  return (
    <div 
    onClick={() => {
      dispatch(actions.setCurSongId(sid))
      dispatch(actions.play(true))
      dispatch(actions.setRecent({thumbnail, title, sid, artistsNames}))
    }}
    className={`w-full flex-auto p-[10px] flex rounded-md cursor-pointer justify-between items-center ${style || 'hover:bg-main-200'} ${bgColor || ''}`}>
        <div className='flex items-center h-full w-full'>
          {rankSong && !topSongReleaseData && <span className={`mr-[15px] text-[34px] text-transparent font-[900] ${rankSong === 1 ? 'font-outline-blue' : rankSong === 2 ? 'font-outline-green' : 'font-outline-red'}`}>{rankSong}</span>}
          <div className={`mr-[10px] w-full rounded-md relative overflow-hidden group ${size || 'max-w-[60px]'}`}>
            <div className='absolute inset-0 z-20 group-hover:bg-overlay-50 text-white flex items-center justify-center'>
              {rankSong && <span className="pl-[6px] pr-[2px] pt-1 pb-1 hidden group-hover:flex border border-white rounded-full">
                <IoIosPlay size={34}/>
              </span>}
              {!rankSong && <span className='hidden group-hover:flex'>
                <IoIosPlay size={24}/>
              </span>}
            </div>
            <img src={thumbnail} alt="thumbnail" className={`w-full object-contain rounded-md scale-100 ${rankSong && 'group-hover:scale-110 transition-transform ease-in-out duration-700'}`}/>
          </div>
          <div className={`flex flex-col w-full justify-between ${rankSong && 'h-[120px]'}`}>
            <div className='flex flex-col gap-1'>
              {song && <span className='text-text-secondary text-xs font-medium'>Bài hát</span>}
              <span className={`text-sm font-medium ${order || style ? 'text-white' : 'text-black-100'}`}>{title?.length > 30 ? `${title?.slice(0,30)}...` : title}</span>
              <span className={`text-xs font-normal ${order || style ? 'text-[hsla(0,0%,100%,.5)]' : 'text-text-secondary'}`}>{artistsNames?.length > 30 ? `${artistsNames?.slice(0,30)}...` : artistsNames}</span>
              {releaseDate && <span className='text-xs font-normal text-text-secondary'>{moment(releaseDate * 1000).fromNow()}</span>}
            </div>
            {rankSong && topSongReleaseData && <div className='flex justify-between relative'>
              <span className={`absolute left-0 bottom-0 text-[46px] text-transparent font-[900] ${rankSong === 1 ? 'font-outline-blue' : rankSong === 2 ? 'font-outline-green' : 'font-outline-red'}`}>{`#${rankSong}`}</span>
              {topSongReleaseData && <span className='text-sm font-medium opacity-70 text-text-secondary absolute bottom-4 right-0'>{moment(topSongReleaseData * 1000).format("DD.MM.YYYY")}</span>}
            </div>}
          </div>
        </div>
        {percent && <span className='text-white'>{`${percent}%`}</span>}
    </div>
  )
}

export default memo(SongItem)