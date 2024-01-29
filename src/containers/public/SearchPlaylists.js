import React, {memo, useEffect, useState} from 'react'
import { apiGetArtist } from '../../apis'
import { useSelector } from 'react-redux'
import { Section } from '../../components'

const SearchPlaylists = () => {

  const { searchData } = useSelector(state => state.music)
  const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const res = await apiGetArtist(searchData?.top?.alias)
      if (res.data.err === 0) {
        setPlaylists(res?.data?.data?.sections[1]?.items)
        console.log(res);
      }
    }
    fetch()
  }, [searchData])
  return (
    <div className='flex flex-col mb-[100px]'>
      <div className='flex items-center'>
        <h3 className='text-xl font-bold'>Playlist/Album</h3>
      </div>
      <Section
        data={playlists}
        items={playlists}
        number={100}
        artists
        wrap
        showAll
      />
    </div>
  )
}

export default memo(SearchPlaylists)