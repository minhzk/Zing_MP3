import React, {memo} from 'react'
import { handleNumber } from '../utils/fn'
import { AiOutlineUserAdd } from 'react-icons/ai'

const Artists = ({name, thumbnail, totalFollow}) => {
  return (
    <div className='w-1/5 flex flex-col items-center justify-center'>
        <img src={thumbnail} alt="singer" className='w-[204px] h-[204px] object-contain rounded-full'/>
        <span className='text-sm font-medium text-black-100 mt-[15px] mb-1'>{name}</span>
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