import React from 'react'

const Button = (text, style) => {
  return (
    <button type='button' className={style ? style : 'py-1 px-4 rounded-l-full opacity-80 hover:opacity-100 rounded-r-full border bg-transparent'}>
        {text}
    </button>
  )
}

export default Button