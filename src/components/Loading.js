import React, {memo} from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const Loading = () => {
  return (
    <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
    />
  )
}

export default memo(Loading)