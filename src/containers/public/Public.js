import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarLeft, SidebarRight, Player, Header } from '../../components'

const Public = () => {
  return (
    <div className='w-full relative h-screen flex flex-col bg-main-300'>
      <div className='w-full h-full flex flex-auto'>
        <div className='w-[240px] h-screen flex-none border border-blue-500'>
          <SidebarLeft/>
        </div>
        <div className='flex-auto border border-red-500 overflow-hidden'>
          <div className='h-[70px] flex items-center mb-10'>
            <Header/>
          </div>
          <div className='px-[59px]'>
            <Outlet/>
          </div>
        </div>
        <div className='w-[329px] hidden 1600:flex flex-none border border-pink-500 animate-slide-left'>
          <SidebarRight/>
        </div>
      </div>
      <div className='fixed bottom-0 left-0 right-0 h-[90px]'>
        <Player/>
      </div>
    </div>
  )
}

export default Public