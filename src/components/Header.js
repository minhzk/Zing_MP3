import React from 'react'
import icons from '../utils/icons'
import { Search } from './'
import { useNavigate } from 'react-router-dom'

const { BsArrowLeft, BsArrowRight } = icons

const Header = () => {

    const navigate = useNavigate()
  return (
    <div className='flex justify-between items-center px-[59px] max-w-[1248px] w-full'>
        <div className='flex gap-6 w-full items-center'>
            <div className='flex gap-6 text-gray-400'>
                <span onClick={() => navigate(-1)} className='cursor-pointer'><BsArrowLeft size={24}/></span>
                <span onClick={() => navigate(1)} className='cursor-pointer'><BsArrowRight size={24}/></span>
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