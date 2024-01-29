import React, {memo} from 'react' 
// Dùng memo để kh re render do sử dụng props để lấy danh sách song
// chỉ render lại khi mà props từ lớp cha thật sự thay đổi
// Nếu kh sd memo thì dù props có đổi hay kh mà chỉ cần lớp cha re-render 
// là props cx re-render lại 
import moment from 'moment';
import icons from '../utils/icons';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';

const { LuMusic } = icons

const List = ({songData, isHidePlaylist, isHideIcon, order, minTitle, playlistData, recommend}) => {

    const dispatch = useDispatch()

  return (
    <div 
    className='flex justify-between items-center p-[10px] text-xs border-b border-[rgba(0,0,0,0.05)] hover:bg-main-200 cursor-pointer'
    onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId))
        dispatch(actions.play(true))
        dispatch(actions.playAlbum(true))
        dispatch(actions.setRecent({thumbnail: songData?.thumbnail, title: songData?.title, sid: songData?.encodeId, artistsNames: songData?.artistsNames}))
        dispatch(actions.setRecentPlaylists({thumbnail: playlistData?.thumbnailM, title: playlistData?.title, pid: playlistData?.encodeId, link: playlistData?.link}))
    }}
    >
        <div className='flex items-center gap-2 flex-[5]'>
            {recommend && <span className='text-[15px] flex items-center justify-center text-text-secondary font-normal flex-none w-[10%] mr-[15px]'>Gợi ý</span>}
            {order && <span className={`mr-[15px] text-[34px] text-transparent font-[900] flex justify-center items-center flex-none w-[10%] ${order === 1 ? 'font-outline-blue' : order === 2 ? 'font-outline-green' : order === 3 ? 'font-outline-red' : 'font-outline-gray'}`}>{order}</span>}
            {!isHideIcon && <span className='text-song-item-action'><LuMusic size={15}/></span>}
            <img src={songData?.thumbnail} alt="thumbnail" className='w-10 h-10 object-cover rounded-md' />
            <span className='flex flex-col w-full'>
                <span className='text-sm font-medium text-black-100'>{songData?.title?.length > minTitle ? `${songData?.title?.slice(0, (minTitle || 34))}...` : songData?.title}</span>
                <span className='text-text-secondary font-normal'>{songData?.artistsNames?.length > minTitle ? `${songData?.artistsNames?.slice(0, (minTitle || 34))}...` : songData?.artistsNames}</span>
            </span>
        </div>
        {!isHidePlaylist && <div className='flex-[5] flex items-center justify-start text-song-item-action'>
            {songData?.album?.title?.length > 46 ? `${songData?.album?.title?.slice(0, 46)}...` : songData?.album?.title}
        </div>
        }
        <div className='flex-1 flex justify-end text-song-item-action font-normal'>
            {moment.utc(songData?.duration*1000).format('mm:ss')}
        </div>
    </div>
  )
}

export default memo(List)