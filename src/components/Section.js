import React, {memo} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Section = () => {
    const {chill} = useSelector(state => state.app)
    const navigate = useNavigate()
    console.log(chill);
  return (
    <div className='mt-12'>
        <div className='flex items-center justify-between mb-5'>
            <h3 className='text-xl font-bold text-black-100'>{chill?.title}</h3>
            <span className='text-[13px] font-medium text-text-secondary'>TẤT CẢ</span>
        </div>
        <div className='flex items-center justify-between flex-auto gap-[28px]'>
            { chill && chill?.items?.length > 0 && chill.items.map((item, index) => (
                <div
                key={item.encodeId}
                onClick={() => {
                    navigate(item?.link.split('.')[0])
                }}
                className={`flex flex-col gap-2 w-1/5 cursor-pointer ${index <= 4 ? 'block' : 'hidden'}`}
                >
                    <img src={item.thumbnail} alt="thumbnail" className='w-full h-auto rounded-[5px]'/>
                    <span className='text-text-secondary text-sm font-normal'>{`${item.sortDescription?.slice(0, 58)}...`}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default memo(Section)