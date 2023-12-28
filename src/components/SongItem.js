import React, {memo} from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const SongItem = ({thumbnail, title, artistsNames, sid, releaseDate}) => {

  const dispatch = useDispatch()
  return (
    <div 
    onClick={() => {
      dispatch(actions.setCurSongId(sid))
      dispatch(actions.play(true))
    }}
    className='w-[45%] laptop:w-[30%] flex-auto p-[10px] flex hover:bg-main-200 rounded-md cursor-pointer'>
        <img src={thumbnail} alt="thumbnail" className='mr-[10px] w-[60px] h-[60px] object-cover rounded-md'/>
        <div className='flex flex-col gap-1'>
            <span className='text-sm font-medium text-black-100'>{title}</span>
            <span className='text-xs font-normal text-text-secondary'>{artistsNames}</span>
            <span className='text-xs font-normal text-text-secondary'>{moment(releaseDate * 1000).fromNow()}</span>
        </div>
    </div>
  )
}

export default memo(SongItem)