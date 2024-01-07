import React, { useEffect } from 'react'
import { List, Lists } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const SearchSongs = () => {
  const { searchData, songs } = useSelector(state => state.music)
  const dispatch = useDispatch()
  // console.log(searchData);
  useEffect(() => {
    dispatch(actions.getSearchSong(searchData?.top?.playlistId))
  }, [searchData])
  return (
    <div className='flex flex-col mb-20'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-bold mb-5'>Bài Hát</h3>
        </div>
        <div className='flex justify-between flex-col'>
            {songs?.map(item=> (
                <List songData={item} key={item.encodeId} isHideIcon />
            ))}
        </div>
      </div>
  )
}

export default SearchSongs