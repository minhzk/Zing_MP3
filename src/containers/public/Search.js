import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { searchMenu } from '../../utils/menu'
import { useSelector } from 'react-redux'

const notActiveStyle = 'px-4 hover:text-text-hover cursor-pointer'
const activeStyle = 'px-4 hover:text-text-hover cursor-pointer border-b-2 border-text-hover h-[54px] flex items-center justify-center'

const Search = () => {
  const {keyword} = useSelector(state => state.music)
  console.log(keyword);
  return (
    <div className='w-full'>
      <div className='flex h-[50px] mb-7 items-center text-sm border-b border-[rgba(0,0,0,.1)] pb-1 mx-[-59px] pl-[59px]'>
        <span className='text-2xl font-bold pr-6 border-r border-[rgba(0,0,0,.1)] '>Kết Quả Tìm Kiếm</span>
        <div className='flex items-center font-medium text-black-100'>
          {searchMenu?.map(item => (
            <NavLink
              key={item?.path}
              to={`${item?.path}?q=${keyword}`}
              className={({isActive}) => isActive ? activeStyle : notActiveStyle}
            >
              {item?.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div className='w-full '>
        <Outlet/>
      </div>
      
    </div>
  )
}

export default Search