import React, {memo, useState, useEffect} from 'react'
import { List} from './'
import { useNavigate } from 'react-router-dom'

const TopSongs = ({data, number, isHidePlaylist, link}) => {
    const [isShowAll, setIsShowAll] = useState(false)
    const [songs, setSongs] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isShowAll) {
            setSongs(data?.filter((item, index) => index < number))
        } else {
            setSongs(data)
        }
        }, [isShowAll, data])
  return (
    <div className='w-full flex flex-col'>
        <div className='mb-5'>
          {songs?.map((item, index) => (
            <List songData={item} order={index + 1} isHidePlaylist={isHidePlaylist} isHideIcon key={item?.encodeId}/>
          ))}
        </div>
        {number !== 100 && <button type='button' onClick={() => link ? navigate(link?.split('.')[0]) : setIsShowAll(prev => !prev) } className='py-2 px-[25px] border border-main-500 w-fit mx-auto text-sm rounded-full font-medium text-text-hover hover:bg-[hsla(0,0%,100%,0.3)]'>
          {isShowAll ? 'Ẩn top 100' : 'Xem top 100'}
        </button>}
    </div>
  )
}

export default memo(TopSongs)