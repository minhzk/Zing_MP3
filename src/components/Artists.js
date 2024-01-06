import React, {memo} from 'react'
import { handleNumber } from '../utils/fn'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Artists = ({name, thumbnail, totalFollow, link}) => {
  return (
    <div className='w-1/5 flex flex-col items-center justify-center'>
        <Link
          className='relative overflow-hidden cursor-pointer group rounded-full'
          to={link}
        >
          <div className='absolute z-20 inset-0 flex items-center justify-center rounded-full group-hover:bg-overlay-10'></div>
          <img src={thumbnail} alt="singer" className='w-[204px] h-[204px] object-contain rounded-full scale-100 group-hover:scale-110 transition-transform ease-in-out duration-700'/>
        </Link>
        <Link className='text-sm font-medium text-black-100 mt-[15px] mb-1 cursor-pointer hover:text-text-hover hover:underline' to={link}>{name}</Link>
        <span className='text-text-secondary text-xs'>{`${handleNumber(totalFollow)} quan tâm`}</span>
        <button 
            type='button'
            className='bg-main-500 px-[19px] py-[6px] mx-10 mt-[15px] mb-5 text-sm rounded-full text-white flex items-center justify-center gap-1'
        >
            <span><AiOutlineUserAdd size={18}/></span>
            <span className='text-xs font-medium opacity-90'>QUAN TÂM</span>
        </button>
    </div>
  )
}

export default memo(Artists)