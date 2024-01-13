import React, {useEffect, useState, useRef } from 'react'
import { formatNumber } from '../../utils/fn'
import { useParams } from 'react-router-dom'
import { apiGetArtist } from '../../apis'
import icons from '../../utils/icons'
import { List, Section, Artists } from '../../components'
import { capitalizeEachWord } from '../../utils/fn'

const {IoIosPlay, AiOutlineUserAdd, IoIosArrowForward} = icons

const Singer = () => {
  const {singer} = useParams()
  const [artistData, setArtistData] = useState(null)
  const ref = useRef()
  // console.log(artistData);
  useEffect(() => {
    const fetchArtistData = async () => {
      const res = await apiGetArtist(singer)
      if (res.data.err === 0) {
        setArtistData(res?.data?.data)
      }
    }
    singer && fetchArtistData()
  }, [singer])

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }, [singer])
  return (
    <div className='gap-[48px] flex flex-col mb-[400px] w-full'>
      <div ref={ref} className='flex flex-col w-full justify-center items-center'>
        <div className='bg-[rgba(84,101,101,0.2)] h-[372px] w-[1400px] mt-[-70px] relative'>
          <div className='absolute bottom-[24px] left-[141px] right-[141px] top-[232px] flex justify-between items-center'>
            <div className='flex gap-8'>
              <img src={artistData?.thumbnail} alt="" className='w-[140px] h-[140px] rounded-full'/>
              <div className='flex flex-col'>
                <div className='flex gap-5 items-center justify-center'>
                  <span className='text-[60px] font-bold text-black-100'>{artistData?.name}</span>
                  <span className='w-[52px] h-[52px] bg-main-500 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 text-white'><IoIosPlay size={34}/></span>
                </div>
                <div className='flex items-center'>
                  <span className='text-black-100 text-sm font-medium'>{`${formatNumber(artistData?.follow)} người quan tâm`}</span>
                  <button 
                      type='button'
                      className='px-[19px] py-[6px] mx-10 mt-[15px] mb-5 text-sm rounded-full text-black-100 flex items-center justify-center gap-1 border border-[rgba(0,0,0,0.1)]'
                  >
                      <span><AiOutlineUserAdd size={18}/></span>
                      <span className='text-xs font-medium opacity-90'>QUAN TÂM</span>
                  </button>
                </div>
              </div>
            </div>
            <div className='flex items-end h-full'>
              <div className='w-[42px] h-[44px]'>
                <svg width="100%" height="100%" viewBox="0 0 38 40">
                  <g fill="none" fillRule="evenodd">
                    <path fill='currentColor' d="M37.838 0v40H0V0h37.838zM6.645 30.47L5 33.778l3.307-.008-1.662-3.298zm11.905 0l-2.307 1.66 2.315 1.647-.008-3.306zm-2.317 0l-.32.001.01 3.306h.32l-.01-3.306zm-6.344 0h-.26l.942 3.307h.297l.913-2.98.91 2.98h.296l.941-3.306h-.26l-.834 2.97-.909-2.97h-.292l-.904 2.97-.84-2.97zm12.254 0h-1.27v3.307h.244v-1.355h1.017l.773 1.355h.28l-.8-1.388c.207-.057.373-.17.506-.345.133-.175.203-.374.203-.596 0-.269-.092-.496-.281-.69-.189-.193-.41-.287-.672-.287zm4.349 0h-1.32v3.307h1.32c.477 0 .873-.16 1.184-.477.316-.32.472-.713.472-1.176 0-.463-.156-.855-.472-1.172-.311-.32-.707-.481-1.184-.481zm4.457 0c-.29 0-.528.078-.724.239-.19.155-.286.361-.286.623 0 .16.053.293.11.389.057.092.205.192.295.247.043.028.114.06.205.096l.21.078.238.074c.295.091.514.183.652.279.138.096.21.229.21.408 0 .38-.3.64-.838.64-.534 0-.881-.247-1-.645l-.22.124c.153.462.605.755 1.22.755.328 0 .595-.077.795-.238.2-.16.3-.375.3-.641 0-.261-.1-.458-.343-.6-.119-.073-.229-.128-.333-.17-.1-.04-.243-.091-.429-.15-.29-.092-.495-.18-.624-.266-.128-.087-.19-.216-.19-.39 0-.361.295-.618.752-.618.414 0 .7.183.857.554l.215-.114c-.172-.399-.553-.673-1.072-.673zm-4.457.237c.406 0 .742.137 1.003.41.261.27.392.606.392 1.007 0 .402-.13.737-.392 1.011-.26.27-.597.406-1.003.406h-1.054v-2.834zm-4.349 0c.198 0 .364.07.502.217s.207.321.207.524c0 .204-.07.378-.207.525-.138.142-.304.212-.502.212h-1.026v-1.478zm3.029-7.511h-1.323v6.283h1.323v-6.283zm-18.87 0H5v6.283h1.266v-4.066l1.807 2.908h.147l1.807-2.917v4.075h1.256v-6.283H9.981l-1.835 2.97-1.844-2.97zm22.939 0c-.888 0-1.623.302-2.206.906-.584.595-.871 1.346-.871 2.235 0 .89.287 1.631.87 2.235.584.605 1.32.907 2.207.907 1.082 0 2.037-.553 2.544-1.424l-1.006-.596c-.279.527-.862.854-1.538.854-.575 0-1.04-.18-1.395-.552-.347-.37-.524-.846-.524-1.424 0-.587.177-1.062.524-1.433.355-.37.82-.552 1.395-.552.676 0 1.242.32 1.538.863l1.006-.595c-.507-.872-1.47-1.424-2.544-1.424zm-9.078 0c-.551 0-1.032.164-1.426.492-.394.319-.587.759-.587 1.303 0 .552.202.966.578 1.243.385.267.718.396 1.269.56.499.139.84.268 1.033.389.192.112.289.276.289.492 0 .371-.307.638-.98.638-.701 0-1.173-.31-1.41-.923l-1.032.596c.341.923 1.19 1.493 2.406 1.493.657 0 1.19-.164 1.602-.492.411-.328.621-.768.621-1.33 0-.345-.096-.647-.227-.854-.114-.207-.394-.423-.578-.535-.087-.06-.219-.12-.385-.181-.166-.07-.298-.121-.394-.147l-.42-.138c-.455-.138-.761-.268-.927-.38-.158-.12-.237-.276-.237-.466 0-.354.306-.604.805-.604.534 0 .928.259 1.173.777l1.015-.579c-.42-.854-1.199-1.354-2.188-1.354zm-6.372 0h-1.185v4.144c0 .651.216 1.17.649 1.558.432.387.986.58 1.661.58.684 0 1.238-.193 1.67-.58.433-.388.65-.907.65-1.558v-4.144H16.04v4.047c0 .643-.355 1.048-1.125 1.048s-1.125-.405-1.125-1.048v-4.047zM11.614 6.33H5.218v2.095h3.973L5 19.908v1.965h6.614v-2.096H7.336L11.614 8.1V6.33zm3.307 0h-2.315v15.542h2.315V6.33zm2.863 0h-2.202v15.542h2.274V12.53l3.505 9.343h2.157V6.33h-2.274v9.364l-3.46-9.364zM28.314 6c-1.01 0-1.877.314-2.603.943-.8.716-1.2 1.673-1.2 2.872v8.243c0 1.199.4 2.149 1.2 2.85.726.644 1.594.965 2.602.965 1.008 0 1.876-.321 2.602-.965.8-.701 1.201-1.651 1.201-2.85v-4.91h-4.07v1.972h1.802v2.938c0 .512-.145.903-.434 1.173-.289.27-.656.406-1.1.406-.446 0-.801-.132-1.068-.395-.312-.277-.467-.672-.467-1.184V9.815c0-.512.155-.906.467-1.184.267-.263.622-.395 1.067-.395.445 0 .812.135 1.101.406.29.27.434.661.434 1.173v.789h2.268v-.79c0-1.198-.4-2.155-1.2-2.871C30.188 6.314 29.32 6 28.312 6z">
                    </path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col mt-[-18px]'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-bold mb-5'>
            {artistData?.sections[0]?.title
              ? capitalizeEachWord(artistData.sections[0].title)
              : ''}
          </h3>
          <div className="text-text-secondary flex gap-1 cursor-pointer">
            <span className="text-[13px] font-medium ">
              TẤT CẢ
            </span>
            <span className="flex justify-center items-center pt-[1px]"><IoIosArrowForward size={20}/></span>
          </div>
        </div>
        <div className='flex justify-between flex-wrap'>
            {artistData?.sections[0]?.items?.filter((item, index) => index < 6)?.map((item, index) => (
              <div key={item.encodeId} className={`flex-auto w-[45%] ${index % 2 === 0 ? 'pr-4' : 'pl-4'}`}>
                <List songData={item} isHidePlaylist isHideIcon />
              </div>
            ))}
        </div>
      </div>
      <div className='flex flex-col'>
        <h3 className='text-xl font-bold mb-[-64px]'>
            {artistData?.sections[1]?.title
              ? capitalizeEachWord(artistData.sections[1].title)
              : ''}
          </h3>
        <Section data releaseYear items={artistData?.sections[1]?.items} />
      </div>
      <div className='flex flex-col'>
        <h3 className='text-xl font-bold mb-[-64px]'>
          {artistData?.sections[1]?.title
            ? capitalizeEachWord(artistData.sections[2].title)
            : ''}
        </h3>
        <Section data releaseYear items={artistData?.sections[2]?.items} />
      </div>
      <div className='flex flex-col'>
        <h3 className='text-xl font-bold mb-[-64px]'>
          {artistData?.sections[1]?.title
            ? capitalizeEachWord(artistData.sections[4].title)
            : ''}
        </h3>
        <Section data artists items={artistData?.sections[4]?.items} />
      </div>
      <div className='flex flex-col'>
        <h3 className='text-xl font-bold mb-[-64px]'>
          {artistData?.sections[1]?.title
            ? capitalizeEachWord(artistData.sections[5].title)
            : ''}
        </h3>
        <Section data artists items={artistData?.sections[5]?.items} />
      </div>
      <div className='flex flex-col'>
        <h3 className='text-xl font-bold mb-5'>
          {artistData?.sections[6]?.title
            ? capitalizeEachWord(artistData.sections[6].title)
            : ''}
        </h3>
        <div className='flex'>
            {artistData?.sections[6]?.items?.filter((item, index) => index < 5)?.map((item) => (
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
      <div className='flex flex-col'>
        <h3 className='text-xl font-bold mb-5'>
          Về {artistData?.name}
        </h3>
        <div className='flex'>
          <img src={artistData?.thumbnailM} alt="" className='w-[38%] h-[300px] object-cover rounded-md mr-[30px]' />
          <div className='flex-col flex flex-1'>
            <p dangerouslySetInnerHTML={{__html: artistData?.biography}} className='text-sm text-text-secondary font-normal mb-12'></p>
            <div className='flex'>
              <div className='flex flex-col mr-[52px]'>
                <span className='mb-1 text-black-100 font-bold text-[20px]'>{formatNumber(artistData?.follow)}</span>
                <span className='text-sm text-text-secondary font-normal'>Người quan tâm</span>
              </div>
              <div className='flex flex-col mr-6'>
                <span className='mb-1 text-black-100 font-bold text-[20px]'>{artistData?.awards?.length}</span>
                <span className='text-sm text-text-secondary font-normal'>Giải thưởng</span>
              </div>
              <div className='w-[42px] h-full'>
                <svg width="100%" height="100%" viewBox="0 0 38 40">
                  <g fill="none" fillRule="evenodd">
                    <path fill='currentColor' d="M37.838 0v40H0V0h37.838zM6.645 30.47L5 33.778l3.307-.008-1.662-3.298zm11.905 0l-2.307 1.66 2.315 1.647-.008-3.306zm-2.317 0l-.32.001.01 3.306h.32l-.01-3.306zm-6.344 0h-.26l.942 3.307h.297l.913-2.98.91 2.98h.296l.941-3.306h-.26l-.834 2.97-.909-2.97h-.292l-.904 2.97-.84-2.97zm12.254 0h-1.27v3.307h.244v-1.355h1.017l.773 1.355h.28l-.8-1.388c.207-.057.373-.17.506-.345.133-.175.203-.374.203-.596 0-.269-.092-.496-.281-.69-.189-.193-.41-.287-.672-.287zm4.349 0h-1.32v3.307h1.32c.477 0 .873-.16 1.184-.477.316-.32.472-.713.472-1.176 0-.463-.156-.855-.472-1.172-.311-.32-.707-.481-1.184-.481zm4.457 0c-.29 0-.528.078-.724.239-.19.155-.286.361-.286.623 0 .16.053.293.11.389.057.092.205.192.295.247.043.028.114.06.205.096l.21.078.238.074c.295.091.514.183.652.279.138.096.21.229.21.408 0 .38-.3.64-.838.64-.534 0-.881-.247-1-.645l-.22.124c.153.462.605.755 1.22.755.328 0 .595-.077.795-.238.2-.16.3-.375.3-.641 0-.261-.1-.458-.343-.6-.119-.073-.229-.128-.333-.17-.1-.04-.243-.091-.429-.15-.29-.092-.495-.18-.624-.266-.128-.087-.19-.216-.19-.39 0-.361.295-.618.752-.618.414 0 .7.183.857.554l.215-.114c-.172-.399-.553-.673-1.072-.673zm-4.457.237c.406 0 .742.137 1.003.41.261.27.392.606.392 1.007 0 .402-.13.737-.392 1.011-.26.27-.597.406-1.003.406h-1.054v-2.834zm-4.349 0c.198 0 .364.07.502.217s.207.321.207.524c0 .204-.07.378-.207.525-.138.142-.304.212-.502.212h-1.026v-1.478zm3.029-7.511h-1.323v6.283h1.323v-6.283zm-18.87 0H5v6.283h1.266v-4.066l1.807 2.908h.147l1.807-2.917v4.075h1.256v-6.283H9.981l-1.835 2.97-1.844-2.97zm22.939 0c-.888 0-1.623.302-2.206.906-.584.595-.871 1.346-.871 2.235 0 .89.287 1.631.87 2.235.584.605 1.32.907 2.207.907 1.082 0 2.037-.553 2.544-1.424l-1.006-.596c-.279.527-.862.854-1.538.854-.575 0-1.04-.18-1.395-.552-.347-.37-.524-.846-.524-1.424 0-.587.177-1.062.524-1.433.355-.37.82-.552 1.395-.552.676 0 1.242.32 1.538.863l1.006-.595c-.507-.872-1.47-1.424-2.544-1.424zm-9.078 0c-.551 0-1.032.164-1.426.492-.394.319-.587.759-.587 1.303 0 .552.202.966.578 1.243.385.267.718.396 1.269.56.499.139.84.268 1.033.389.192.112.289.276.289.492 0 .371-.307.638-.98.638-.701 0-1.173-.31-1.41-.923l-1.032.596c.341.923 1.19 1.493 2.406 1.493.657 0 1.19-.164 1.602-.492.411-.328.621-.768.621-1.33 0-.345-.096-.647-.227-.854-.114-.207-.394-.423-.578-.535-.087-.06-.219-.12-.385-.181-.166-.07-.298-.121-.394-.147l-.42-.138c-.455-.138-.761-.268-.927-.38-.158-.12-.237-.276-.237-.466 0-.354.306-.604.805-.604.534 0 .928.259 1.173.777l1.015-.579c-.42-.854-1.199-1.354-2.188-1.354zm-6.372 0h-1.185v4.144c0 .651.216 1.17.649 1.558.432.387.986.58 1.661.58.684 0 1.238-.193 1.67-.58.433-.388.65-.907.65-1.558v-4.144H16.04v4.047c0 .643-.355 1.048-1.125 1.048s-1.125-.405-1.125-1.048v-4.047zM11.614 6.33H5.218v2.095h3.973L5 19.908v1.965h6.614v-2.096H7.336L11.614 8.1V6.33zm3.307 0h-2.315v15.542h2.315V6.33zm2.863 0h-2.202v15.542h2.274V12.53l3.505 9.343h2.157V6.33h-2.274v9.364l-3.46-9.364zM28.314 6c-1.01 0-1.877.314-2.603.943-.8.716-1.2 1.673-1.2 2.872v8.243c0 1.199.4 2.149 1.2 2.85.726.644 1.594.965 2.602.965 1.008 0 1.876-.321 2.602-.965.8-.701 1.201-1.651 1.201-2.85v-4.91h-4.07v1.972h1.802v2.938c0 .512-.145.903-.434 1.173-.289.27-.656.406-1.1.406-.446 0-.801-.132-1.068-.395-.312-.277-.467-.672-.467-1.184V9.815c0-.512.155-.906.467-1.184.267-.263.622-.395 1.067-.395.445 0 .812.135 1.101.406.29.27.434.661.434 1.173v.789h2.268v-.79c0-1.198-.4-2.155-1.2-2.871C30.188 6.314 29.32 6 28.312 6z">
                    </path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Singer