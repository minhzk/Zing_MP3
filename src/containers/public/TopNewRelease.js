import React, {useState, useEffect} from 'react'
import { apiGetTopNewRealeaseSong } from '../../apis'

const TopNewRelease = () => {

    const [topNewReleaseData, setTopNewReleaseData] = useState(null)

    useEffect(() => {
        const fetchListData = async() => {
          const res = await apiGetTopNewRealeaseSong()
          if (res?.data?.err === 0) {
            setTopNewReleaseData(res?.data?.data)
          }
        }
        fetchListData()
      }, [])
    console.log(topNewReleaseData);

    return (
        <div>
            
        </div>
    )
}

export default TopNewRelease