import React from 'react'
import { useSelector } from 'react-redux'
import { handleNumber } from '../../utils/fn'

const SearchAll = () => {

  const { searchData } = useSelector(state => state.music)
  console.log(searchData);
  return (
    <div className='w-full flex flex-col'>
      <div className='flex flex-col'>
        <h3 className='text-lg font-bold mb-5'>Nổi bật</h3>
        <div className='flex gap-8'>
          {searchData?.top && <div className='p-[10px] flex-1 bg-[rgba(254,255,255,0.2)] rounded-[5px] flex gap-2 items-center'>
              <img src={searchData?.top?.thumbnail} alt="thumbnail" className={`w-[84px] h-[84px] object-cover ${searchData?.top?.objectType === 'artist' && 'rounded-full'}`} />
              <div className='flex flex-col text-xs ml-[6px] text-text-secondary font-medium'>
                <span className='mb-2'>{searchData?.top?.objectType === 'artist' ? 'Nghệ sĩ' : ''}</span>
                <span className='font-bold text-[15px] text-black-100'>{searchData?.top?.title || searchData?.top?.name}</span>
                {searchData?.top?.objectType === 'artist' && <span className='mt-[6px]'>{handleNumber(searchData?.artists[0]?.totalFollow)} quan tâm</span>}
              </div>
          </div>
          }
          <div className='flex-1 bg-[rgba(254,255,255,0.2)] rounded-[5px]'>song 1</div>
          <div className='flex-1 bg-[rgba(254,255,255,0.2)] rounded-[5px]'>song 2</div>
        </div>
      </div>
    </div>
  )
}

export default SearchAll