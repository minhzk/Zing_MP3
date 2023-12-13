import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'

const Playlist = () => {

    const { title, pid } = useParams()
    const [playlistData, setPlaylistData] = useState({})

    useEffect(() => {
      const fetchDetailPlaylist = async() => {
        const res = await apis.apiGetDetailPlaylist(pid)
        console.log(res);
        if (res?.data.err === 0) {
          setPlaylistData(res.data?.data)
        }
      }

      fetchDetailPlaylist()
    }, [pid])
  return (
    <div className='flex gap-8 w-full'>
      <div className='w-[300px] border border-red-500 flex flex-col items-center'>
        <img src={playlistData?.thumbnailM} alt="thumbnail" className='w-full object-contain rounded-lg shadow-thumbnail' />
        <h3 className='text-xl font-bold text-black-100 mt-3'>{playlistData.title}</h3>
        <div className='text-text-secondary text-[13px] font-normal leading-5 flex flex-col items-center'>
          <span className='flex gap-2 items-center'>
            <span>Cập nhật:</span>
            <span>{moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
          </span>
          <span>
            {playlistData?.artistsNames}
          </span>
          <span>{`${Math.round(playlistData?.like / 1000)}K người yêu thích`}</span>
        </div>
      </div>
      <div className='flex-auto border border-blue-500'>
        Playlist
      </div>
    </div>
  )
}

export default Playlist