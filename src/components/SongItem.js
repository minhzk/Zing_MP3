import React, {memo} from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const SongItem = ({thumbnail, title, artistsNames, sid, releaseDate, order, percent}) => {

  const dispatch = useDispatch()
  return (
    <div 
    onClick={() => {
      dispatch(actions.setCurSongId(sid))
      dispatch(actions.play(true))
    }}
    className={`w-full flex-auto p-[10px] flex rounded-md cursor-pointer justify-between items-center ${order ? 'hover:bg-[hsla(0,0%,100%,0.5)] bg-[hsla(0,0%,100%,.07)]' : 'hover:bg-main-200'}`}>
        <div className='flex items-center'>
          {order && <span className={`mr-[15px] text-[34px] text-transparent font-[900] ${order === 1 ? 'font-outline-blue' : order === 2 ? 'font-outline-green' : 'font-outline-red'}`}>{order}</span>}
          <img src={thumbnail} alt="thumbnail" className='mr-[10px] w-[60px] h-[60px] object-cover rounded-md'/>
          <div className='flex flex-col gap-1'>
              <span className={`text-sm font-medium ${order ? 'text-white' : 'text-black-100'}`}>{title}</span>
              <span className={`text-xs font-normal ${order ? 'text-[hsla(0,0%,100%,.5)]' : 'text-text-secondary'}`}>{artistsNames}</span>
              {releaseDate && <span className='text-xs font-normal text-text-secondary'>{moment(releaseDate * 1000).fromNow()}</span>}
          </div>
        </div>
        {percent && <span className='text-white'>{`${percent}%`}</span>}
    </div>
  )
}

export default memo(SongItem)