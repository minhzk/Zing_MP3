import React from 'react'
import icons from '../utils/icons'
import { Search } from './'

const { BsArrowLeft, BsArrowRight } = icons

const Header = () => {
  return (
    <div className='flex justify-between w-full items-center px-[59px]'>
        <div className='flex gap-6 w-full items-center'>
            <div className='flex gap-6 text-gray-400'>
                <span><BsArrowLeft size={24}/></span>
                <span><BsArrowRight size={24}/></span>
            </div>
            <div className='w-1/2'>
                <Search/>
            </div>
        </div>
        <div className='bg-main-200 rounded-full py-1 px-2'>
            Login
        </div>
    </div>
  )
}

export default Header