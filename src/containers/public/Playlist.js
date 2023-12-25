import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'
import { Lists, AudioLoading } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { useSelector } from 'react-redux'
import icons from '../../utils/icons'

const {IoIosPlay} = icons

const Playlist = () => {

    const { pid } = useParams()
    const { isPlaying } = useSelector((state) => state.music);
    const [playlistData, setPlaylistData] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
      const fetchDetailPlaylist = async() => {
        dispatch(actions.loading(true))
        const res = await apis.apiGetDetailPlaylist(pid)
        dispatch(actions.loading(false))
        if (res?.data.err === 0) {
          setPlaylistData(res.data?.data)
          dispatch(actions.setPlaylist(res.data?.data?.song?.items))
        }
      }

      fetchDetailPlaylist()
    }, [pid])
  return (
    <div className='flex relative gap-8 w-full h-full mt-[30px] pt-10 animate-scale-up-center'>
        <div className='flex-none w-[300px] flex flex-col items-center'>
          <div className='w-full relative rounded-lg cursor-pointer overflow-hidden'>
            <img src={playlistData?.thumbnailM} alt="thumbnail" className='object-contain w-full rounded-lg shadow-thumbnail scale-100 hover:scale-110 transition ease-in-out duration-700' />
            <div className={`absolute top-0 left-0 bottom-0 right-0 text-white flex items-center justify-center ${!isPlaying ? 'hover:bg-overlay-40' : 'hover:bg-transparent'}`}>
              <span 
                className='p-2 border border-white rounded-full flex items-center justify-center'>
                {isPlaying ? <AudioLoading/> : <IoIosPlay size={30}/>}
              </span>
            </div>
          </div>
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