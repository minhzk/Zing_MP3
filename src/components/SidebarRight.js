import React, {useState, useEffect} from 'react'
import icons from '../utils/icons'
import { useSelector } from 'react-redux'
import {SongItem} from './'
import { apiGetDetailPlaylist } from '../apis'
import {Scrollbars} from 'react-custom-scrollbars-2'

const {BsTrash} = icons

const SidebarRight = () => {

  const [isRecent, setIsRecent] = useState(false)
  const [playlist, setPlaylist] = useState()
  const { curSongData, curPlaylistId, isPlaying } = useSelector(state => state.music)
  // console.log(curSongData);

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const res = await apiGetDetailPlaylist(curPlaylistId)
      if(res?.data?.err === 0) setPlaylist(res?.data?.data)
      console.log(res);
    }

    if (curPlaylistId && isPlaying) fetchDetailPlaylist()
  }, [curPlaylistId, isPlaying])
  return (
    <div className='flex flex-col text-xs w-full'>
      <div className='h-[70px] flex-none py-[14px] px-2 flex items-center justify-between gap-16'>
        <div className='flex flex-auto justify-center rounded-full bg-main-200 py-[3px] p-[3px]'>
          <span 
            className={`${!isRecent && ' bg-main-600 text-text-hover'} flex-1 py-[7px] flex justify-center rounded-full items-center cursor-pointer font-medium`}
            onClick={() => setIsRecent(prev => !prev)}
          >Danh sách phát</span>
          <span 
            className={`${isRecent && ' bg-main-600 text-text-hover'} flex-1 py-[7px] flex justify-center rounded-full items-center cursor-pointer font-medium`}
            onClick={() => setIsRecent(prev => !prev)}
          >Nghe gần đây</span>
        </div>
        <span className='p-2 rounded-full opacity-100 hover:opacity-80 cursor-pointer bg-main-200'><BsTrash size={14}/></span>
      </div>
      <div className='w-full flex flex-col px-2 '>
        <SongItem
          thumbnail={curSongData?.thumbnail}
          title = {curSongData?.title}
          artistsNames={curSongData?.artistsNames}
          sid={curSongData?.encodeId}
          sm
          style='bg-main-500'
        />
        <div className='flex flex-col pt-[15px] pb-[5px] px-2 text-sm'>
          <span className='text-black-100 font-bold'>Tiếp theo</span>
          <span className='text-[rgba(20,20,20,0.4)] flex gap-[5px]'>
            <span>Từ playlist </span>
            <span className='font-medium text-text-hover'>
              {playlist?.title > 20 ? `${playlist?.title?.slice(0,20)}...` : playlist?.title}
            </span>
          </span>
        </div>
        <Scrollbars autoHide style={{ width: '100%', height: "70vh" }}>
          {playlist && <div className='flex flex-col mb-[90px]'>
            {playlist?.song?.items?.map(item => (
              <SongItem
                key={item?.encodeId}
                thumbnail={item?.thumbnail}
                title = {item?.title}
                artistsNames={item?.artistsNames}
                sid={item?.encodeId}
                sm
              />
            ))}
          </div>}
        </Scrollbars>
      </div>
    </div>
  )
}

export default SidebarRight