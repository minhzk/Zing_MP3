import React, {memo} from 'react'

const Button = ({text, style, icon, handleOnClick}) => {
  return (
    <button 
      type='button' 
      className={style ? style : 'py-1 px-4 rounded-l-full opacity-80 hover:opacity-100 rounded-r-full border bg-transparent'}
      onClick={handleOnClick}
    >
        {text && <span>{text}</span>}
        {icon && <span className='flex justify-center items-center'>{icon}</span>}
    </button>
  )
}

export default memo(Button)