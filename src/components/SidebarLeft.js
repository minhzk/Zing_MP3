import React from 'react'
import logo from '../assets/img/logo.svg'
import { sidebarMenu } from '../utils/menu'
import { NavLink } from 'react-router-dom'

const notActiveStyle = 'py-2 px-[25px] font-semibold text-[15px] text-[#32323D] flex gap-3 items-center'
const activeStyle = 'py-2 px-[25px] font-semibold text-[15px] text-[#0f7070] flex gap-3 items-center'

const SidebarLeft = () => {
  return (
    <div className='flex flex-col bg-[#DDE4E4]'>
      <div className='w-full py-[15px] px-[25px] flex justify-start items-center'>
        <img src={logo} alt="logo" className='w-[120px] h-10'/>
      </div>
      <div className='flex flex-col'>
        <NavLink
          to={'/'}
          className='py-2 px-[25px] font-bold'
        >
          Home
        </NavLink>
        {sidebarMenu.map(item => (
          <NavLink
            to={item.path}
            key={item.path}
            end={item.end}
            className={({isActive}) => isActive ? activeStyle : notActiveStyle}
          >
            {item.icon}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default SidebarLeft