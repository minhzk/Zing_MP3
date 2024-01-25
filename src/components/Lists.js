import React, {memo} from 'react'
import {List} from './';
import icons from '../utils/icons'
import moment from 'moment';
import { useSelector } from 'react-redux';

const { LuDot  } = icons

const Lists = ({totalDuration, playlistData}) => {
  const { songs } = useSelector(state => state.music)
  return (
    <div className='w-full flex flex-col '>
        <div className='flex justify-between items-center text-xs text-text-secondary p-[10px] font-semibold  border-b border-[rgba(0,0,0,0.05)]'>
            <span>BÀI HÁT</span>
            <span>ALBUM</span>
            <span>THỜI GIAN</span>
        </div>
        <div className='flex flex-col'>
            {songs?.map(item => (
              <List key={item.encodeId} songData={item} playlistData={playlistData} />
            ))}
        </div>
        <span className='flex items-center gap-1 pt-[16px] text-text-secondary text-sm font-normal'>
          <span>{`${songs?.length} bài hát`}</span>
          <LuDot className='items-center' size={24}/>
          <span>{moment.utc(totalDuration*1000).format('HH:mm:ss')}</span>
        </span>
    </div>
  )
}

export default memo(Lists)