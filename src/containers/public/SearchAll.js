import React from 'react'
import { useSelector } from 'react-redux'
import { handleNumber } from '../../utils/fn'
import { SongItem, List, Section, Artists } from '../../components'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

const SearchAll = () => {

  const { searchData } = useSelector(state => state.music)
  return (
    <div className='w-full flex flex-col mb-[400px] gap-[60px]'>
      <div className='flex flex-col'>
        <h3 className='text-xl font-bold mb-5'>Nổi Bật</h3>
        <div className='flex gap-8'>
          {searchData?.top && <Link to={searchData?.top?.link} className='p-[10px] flex-1 cursor-pointer bg-[rgba(254,255,255,0.2)] rounded-[5px] flex gap-2 items-center'>
              <img src={searchData?.top?.thumbnail} alt="thumbnail" className={`w-[84px] h-[84px] object-cover ${searchData?.top?.objectType === 'artist' && 'rounded-full'}`} />
              <div className='flex flex-col text-xs ml-[6px] text-text-secondary font-medium'>
                <span className='mb-2'>{searchData?.top?.objectType === 'artist' ? 'Nghệ sĩ' : ''}</span>
                <span className='font-bold text-[15px] text-black-100'>{searchData?.top?.title || searchData?.top?.name}</span>
                {searchData?.top?.objectType === 'artist' && <span className='mt-[6px]'>{handleNumber(searchData?.artists[0]?.totalFollow)} quan tâm</span>}
              </div>
          </Link>
          }
          {searchData?.songs?.filter((item, index) => [...Array(2).keys()].some(i => i === index))?.map(item => (
            <div className='flex-1 bg-[rgba(254,255,255,0.2)] rounded-[5px]' key={item?.encodeId}>
              <SongItem
                thumbnail={item?.thumbnail}
                title={item?.title}
                sid={item?.encodeId}
                artistsNames={item?.artistsNames}
                size='max-w-[84px]'
                song
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-bold mb-5'>Bài Hát</h3>
          <div className="text-text-secondary flex gap-1 cursor-pointer">
            <span className="text-[13px] font-medium ">
              TẤT CẢ
            </span>
            <span className="flex justify-center items-center pt-[1px]"><IoIosArrowForward size={20}/></span>
          </div>
        </div>
        <div className='flex justify-between flex-wrap'>
            {searchData?.songs?.filter((item, index) => index < 6)?.map((item, index) => (
              <div key={item.encodeId} className={`flex-auto w-[45%] ${index % 2 === 0 ? 'pr-4' : 'pl-4'}`}>
                <List songData={item} isHidePlaylist isHideIcon />
              </div>
            ))}
        </div>
      </div>
      <div className='flex flex-col'>
        <h3 className='text-xl font-bold mb-[-64px]'>Playlist/Album</h3>
        <Section data artists items={searchData?.playlists} />
      </div>
      <div className='flex flex-col'>
        <h3 className='text-xl font-bold mb-5'>Nghệ Sĩ/OA</h3>
        <div className='flex'>
            {searchData?.artists?.filter((item, index) => index < 5)?.map((item) => (
              <Artists
                key={item?.id}
                thumbnail={item?.thumbnail}
                name={item?.name}
                totalFollow={item?.totalFollow}
                link={item?.link}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default SearchAll