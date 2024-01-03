import React, {useState, useEffect} from 'react'
import icons from '../utils/icons'
import { apiSearch } from '../apis'

const { GoSearch }  = icons

const Search = () => {

  const [keyword, setKeyword] = useState('')

  // useEffect(() => {
  //   window.addEventListener('keyup', handleSearch)

  //   return () => {
  //     window.removeEventListener('keyup', handleSearch)
  //   }
  // }, [])

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      const res = await apiSearch(keyword)
      console.log(res);
    }
  }


  return (
    <div className='w-full flex items-center'>
      <span className='h-10 pl-4 bg-[#DDE4E4] flex items-center justify-center rounded-l-[20px] text-gray-500'>
        <GoSearch size={20}/>
      </span>
      <input 
        type="text"
        className='outline-none bg-[#DDE4E4] pl-2 pr-4 py-2 rounded-r-[20px] h-10 w-full text-gray-700 placeholder:text-gray-500'
        placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onKeyUp={handleSearch}
       />
    </div>
  )
}

export default Search