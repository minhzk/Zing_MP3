import React, { useEffect } from 'react'
import { Header } from '../../components'
import * as apis from '../../apis'

const Home = () => {

  useEffect(() => {
    const fetchDataHome = async() => {
      const res = await apis.getHome()
      console.log(res);
    }

    fetchDataHome()
  }, [])

  return (
    <div className='overflow-y-auto px-[59px]'>
      <div className='h-[70px] flex items-center'>
        <Header/>
      </div>

    </div>
  )
}

export default Home