import React, {useEffect, useState} from 'react'
import { Section } from '../../components'
import { apiGetTop100 } from '../../apis'

const Top100 = () => {
    const [top100Data, setTop100Data] = useState(null)

    useEffect(() => {
        const fetchChartData = async() => {
          const res = await apiGetTop100()
          if (res?.data?.err === 0) {
            setTop100Data(res?.data?.data)
          }
        }
        fetchChartData()
      }, [])
    console.log(top100Data);

    return (
        <div className='mt-[82px]'>
            {top100Data && <> <Section data={top100Data[0]} items={top100Data[0]?.items} artists showAll />
            <Section data={top100Data[1]} items={top100Data[1]?.items} wrap number={100} artists showAll />
            <Section data={top100Data[2]} items={top100Data[2]?.items} wrap number={100} artists showAll />
            <Section data={top100Data[3]} items={top100Data[3]?.items} wrap number={100} artists showAll />
            <Section data={top100Data[4]} items={top100Data[4]?.items} wrap number={100} artists showAll /> </>}
        </div>
    )
}

export default Top100