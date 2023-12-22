import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'
import { Lists } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

const Playlist = () => {

    const { title, pid } = useParams()
    const [playlistData, setPlaylistData] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
      const fetchDetailPlaylist = async() => {
        const res = await apis.apiGetDetailPlaylist(pid)
        console.log(res);
        if (res?.data.err === 0) {
          setPlaylistData(res.data?.data)
          dispatch(actions.setPlaylist(res.data?.data?.song?.items))
        }
      }

      fetchDetailPlaylist()
    }, [pid])
  return (
    <div className='flex gap-8 w-full h-full mt-[30px] pt-10'>
        <div className='flex-none w-[300px] flex flex-col items-center'>
          <img src={playlistData?.thumbnailM} alt="thumbnail" className='w-full object-contain rounded-lg shadow-thumbnail' />
          <h3 className='text-xl font-bold text-black-100 mt-3'>{playlistData.title}</h3>
          <div className='text-text-secondary text-[13px] font-normal leading-5 flex flex-col items-center'>
            <span className='flex gap-2 items-center'>
              <span>Cập nhật:</span>
              <span>{moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
            </span>
            <span className='text-center'>
              {playlistData?.artistsNames}
            </span>
            <span>{`${Math.round(playlistData?.like / 1000)}K người yêu thích`}</span>
          </div>
        </div>
        <Scrollbars style={{ width: '100%', height: "70vh" }}>
          <div className='flex-auto mb-40'>
            <span className='text-sm mb-[10px]'>
              <span className='text-text-secondary'>Lời tựa </span>
              <span className='text-black-100 font-normal'>{playlistData?.sortDescription}</span>
            </span>
            <Lists totalDuration={playlistData?.song?.totalDuration} />
          </div>
        </Scrollbars>
      </div>
  )
}

export default Playlist