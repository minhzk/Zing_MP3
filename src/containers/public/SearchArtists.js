import React from 'react'
import { Artists } from '../../components'
import { useSelector } from 'react-redux'
const SearchArtists = () => {
    const { searchData } = useSelector(state => state.music)
    return (
        <div>
            <div className='flex flex-col'>
            <h3 className='text-xl font-bold mb-5'>Nghệ Sĩ/OA</h3>
            <div className='flex'>
                {searchData?.artists?.filter((item, index) => index < 5)?.map((item) => (
                <Artists
                    key={item?.id}
                    thumbnail={item?.thumbnail}
                    name={item?.name}
                    totalFollow={item?.totalFollow}
                    link={item?.link}
                />
                ))}
            </div>
        </div>
        </div>
    )
}

export default SearchArtists