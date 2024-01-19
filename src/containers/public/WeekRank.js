import React, {useEffect, useRef} from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { TopSongs } from '../../components'
import { IoIosPlay } from 'react-icons/io'

const notActiveStyle = 'font-bold py-[15px] text-[24px] text-black-100 cursor-pointer'
const activeStyle = 'font-bold py-[15px] text-[24px] text-text-hover border-b-[3px] border-text-hover cursor-pointer'


const WeekRank = ({weekChart}) => {

  const {pid} = useParams()
  const ref = useRef()

  useEffect(() => {
    // console.log(pid);
  }, [pid])

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
  }, [pid])

  return (
    <div ref={ref} className='flex flex-col w-full mt-[70px]'>
      <div className='relative top-8 left-0 right-0 bottom-1/2 flex flex-col gap-5'>
        <div className='flex items-center gap-4'>
          <h3 className='font-bold text-[42px] text-text-hover'>Bảng Xếp Hạng Tuần</h3>
          <span className='text-white p-1 rounded-full h-[46px] w-[46px] bg-main-500 opacity-100 hover:opacity-90 cursor-pointer mt-[6px] flex items-center justify-center'><IoIosPlay size={28} className='pl-[1px] pb-[1px]'/></span>
        </div>
        <div className='flex gap-10'>
          {weekChart?.map(item => (
            <NavLink key={item?.chartId} to={item?.link?.split('.')[0]} className={({isActive}) => isActive ? activeStyle : notActiveStyle}>
              {item?.country === 'vn' ? 'VIỆT NAM' : item?.country === 'us' ? 'US-UK' : 'K-POP'}
            </NavLink>
          ))}
        </div>
        <TopSongs 
          data={weekChart?.find(item => item?.link?.includes(pid))?.items}
          number={100}
        />  
      </div>
    </div>
  )
}

export default WeekRank