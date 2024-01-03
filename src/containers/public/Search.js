import React from 'react'
import { Outlet } from 'react-router-dom'

const Search = () => {
  return (
    <div>
      <div className='flex h-[50px] mb-7 items-center text-sm border-b border-[rgba(0,0,0,.1)] pb-1 mx-[-59px] pl-[59px]'>
        <span className='text-2xl font-bold pr-6 border-r border-[rgba(0,0,0,.1)] '>Kết Quả Tìm Kiếm</span>
        <div className='flex items-center font-medium text-black-100'>
          <span className='px-4 hover:text-text-hover cursor-pointer'>TẤT CẢ</span>
          <span className='px-4 hover:text-text-hover cursor-pointer'>BÀI HÁT</span>
          <span className='px-4 hover:text-text-hover cursor-pointer '>PLAYLIST/ALBUM</span>
          <span className='px-4 hover:text-text-hover cursor-pointer '>NGHỆ SĨ/OA</span>
        </div>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Search