import React, {memo} from 'react'
import { RotatingLines } from 'react-loader-spinner'

const SongLoading = () => {
  return (
    <RotatingLines
        visible={true}
        height="22"
        width="22"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
  )
}

export default memo(SongLoading)