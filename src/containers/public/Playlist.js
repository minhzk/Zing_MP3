import React, {useEffect, useState} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'
import { Lists, AudioLoading } from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { useSelector } from 'react-redux'
import icons from '../../utils/icons'


const {IoIosPlay, IoIosPause, IoMdHeartEmpty, BsThreeDots} = icons

const Playlist = () => {
    const location = useLocation()

    const { pid } = useParams()
    const { isPlaying } = useSelector((state) => state.music);
    const [playlistData, setPlaylistData] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(actions.setCurPlaylistId(pid))
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

    useEffect(() => {
      if ( location?.state?.playAlbum ) {
        const randomSong = Math.round(Math.random() * playlistData?.song?.items?.length) - 1
        dispatch(actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId))
        dispatch(actions.play(true))
      }
    }, [pid])

    const handleTogglePlayMusic = () => {
      if (isPlaying) {
        dispatch(actions.play(false))
      } else {
        dispatch(actions.play(true))
      }
    }
  return (
    <div className='flex relative gap-8 w-full h-full mt-[70px] pt-10 animate-scale-up-center'>
        <div className='flex-none w-[300px] flex flex-col items-center'>
          <div className='w-full relative rounded-lg cursor-pointer overflow-hidden group'>
            <img src={playlistData?.thumbnailM} alt="thumbnail" className='object-contain w-full rounded-lg shadow-thumbnail scale-100 group-hover:scale-110 transition ease-in-out duration-700' />
            <div className={`absolute inset-0 z-20 text-white flex items-center justify-center ${!isPlaying ? 'group-hover:bg-overlay-50' : 'hover:bg-transparent'}`}>
              <span 
                className={`p-2 border border-white rounded-full m-auto ${isPlaying ? 'block' : 'hidden'} group-hover:block`}>
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
            <div className='flex flex-col'>
              <div 
              className='flex gap-1 justify-center items-center text-white bg-main-500 rounded-full py-[9px] px-6 cursor-pointer my-4'
              onClick={handleTogglePlayMusic}
              >
                <span>{isPlaying ? <IoIosPause size={22}/> : <IoIosPlay size={22}/>}</span>
                <span className='font-medium text-sm '>{isPlaying ? 'TẠM DỪNG' : 'TIẾP TỤC PHÁT'}</span>
              </div>
              <div className='flex gap-[10px] items-center justify-center'>
                <span className='w-[35px] h-[35px] rounded-full p-[5px] cursor-pointer flex items-center justify-center  bg-[hsla(0,0%,100%,0.3)] hover:brightness-90'><IoMdHeartEmpty size={18}/></span>
                <span className='w-[35px] h-[35px] rounded-full p-[5px] cursor-pointer flex items-center justify-center  bg-[hsla(0,0%,100%,0.3)] hover:brightness-90'><BsThreeDots size={18}/></span>
              </div>
            </div>
          </div>
        </div>
        <Scrollbars autoHide style={{ width: '100%', height: "70vh" }}>
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