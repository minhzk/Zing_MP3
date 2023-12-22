import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as apis from '../apis';
import icons from '../utils/icons';
import * as actions from '../store/actions'
import moment from 'moment';
import { toast } from 'react-toastify';

const {
    IoMdHeart,
    IoMdHeartEmpty,
    BsThreeDots,
    RiSkipBackFill,
    RiSkipForwardFill,
    PiRepeatLight,
    IoIosPlay,
    PiShuffleLight,
    IoIosPause,
    PiRepeatOnceLight
} = icons;

var intervalId
const Player = () => {
    const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
    const [songInfo, setSongInfo] = useState(null);
    const [audio, setAudio] = useState(new Audio())
    const [curSecond, setCurSecond] = useState(0)
    const [isShuffle, setIsShuffle] = useState(false)
    const [repeatMode, setRepeatMode] = useState(0)
    const dispatch = useDispatch()
    const thumbRef = useRef()
    const trackRef = useRef()

    // useEffect kh sd được bất đồng bộ
    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId),
            ]);
            // console.log(res);
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data);
            }
            if (res2.data.err === 0) {
                audio.pause()
                setAudio(new Audio(res2.data.data['128']))
            } else {
                audio.pause()
                setAudio(new Audio())
                dispatch(actions.play(false))
                toast.warn(res2.data.msg)
                setCurSecond(0)
                thumbRef.current.style.cssText = `right: 100%`
            }
        };

        fetchDetailSong();
    }, [curSongId]);

    useEffect(() => {
        intervalId && clearInterval(intervalId)
        audio.pause()
        audio.load()
        if (isPlaying && thumbRef.current) {
            audio.play()
            intervalId = setInterval(() => {
                let percent = Math.round(audio.currentTime * 10000 / songInfo?.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percent}%`
                setCurSecond(Math.round(audio.currentTime))
            }, 100)
        } else {
            toast.warn()
        }
    }, [audio]);

    useEffect(() => {
        if (!isPlaying) {
            intervalId && clearInterval(intervalId)
        }
    })

    useEffect(() => {
        const handleEnded = () => {
            console.log('end');
            if (isShuffle || (repeatMode === 1 && isShuffle)) {
                handleShuffle()
            } else if (repeatMode) {
                repeatMode === 1 ? handleNextSong() : handleRepeatOnce()
            } else {
                audio?.pause()
                dispatch(actions.play(false))
            }
        }

        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('ended', handleEnded)
        }
    }, [audio, isShuffle, repeatMode])

    const handleTogglePlayMusic = () => {
        if (isPlaying) {
            audio?.pause()
            dispatch(actions.play(false))
        } else {
            audio?.play()
            dispatch(actions.play(true))
        }
    };

    const handleClickProgressbar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect()
        const percent = Math.round((e.clientX - trackRect.left) / trackRect.width * 10000) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        audio.currentTime = percent * songInfo?.duration / 100
        console.log(curSecond);
    }

    const handleNextSong = () => {
        if (songs) {
            let currentSongIndex
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) currentSongIndex = index
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handlePrevSong = () => {
        if (songs) {
            let currentSongIndex
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) currentSongIndex = index
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs?.length ) - 1
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
        dispatch(actions.play(true))
    }

    const handleRepeatOnce = () => {
        audio.play()
    }

    return (
        <div className="bg-main-400 px-5 h-full flex py-2">
            <div className="w-[30%] flex-auto flex items-center gap-[10px]">
                <img
                    src={songInfo?.thumbnail}
                    alt="thumbnail"
                    className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex flex-col">
                    <span className="font-medium text-black-100 text-[15px]">
                        {songInfo?.title}
                    </span>
                    <span className="text-gray-500 text-[13px] font-normal">
                        {songInfo?.artistsNames}
                    </span>
                </div>
                <div className="flex gap-4 pl-2">
                    <span>
                        <IoMdHeartEmpty size={16} />
                    </span>
                    <span>
                        <BsThreeDots size={16} />
                    </span>
                </div>
            </div>
            <div className="w-[40%] flex-auto flex flex-col justify-center items-center border border-red-500 gap-1">
                <div className="flex gap-8 justify-center items-center text-black-100">
                    <span
                        onClick={() => setIsShuffle(prev => !prev)}
                        className={`cursor-pointer ${isShuffle ? 'text-text-hover' : 'text-black-100'}`}
                        title="Bật phát ngẫu nhiên"
                    >
                        <PiShuffleLight size={20} />
                    </span>
                    <span 
                    onClick={handlePrevSong}
                    className={`${!songs ? 'text-gray-500' : 'cursor-pointer' }`}>
                        <RiSkipBackFill size={21} />
                    </span>
                    <span
                        className="p-2 cursor-pointer border border-gray-700 rounded-full flex items-center justify-normal hover:text-text-hover hover:border-text-hover"
                        onClick={handleTogglePlayMusic}
                    >
                        {isPlaying ? (
                            <IoIosPause size={22} />
                        ) : (
                            <IoIosPlay size={22} />
                        )}
                    </span>
                    <span 
                    onClick={handleNextSong}
                    className={`${!songs ? 'text-gray-500' : 'cursor-pointer' }`}>
                        <RiSkipForwardFill size={21} />
                    </span>
                    <span
                        className={`cursor-pointer ${repeatMode && 'text-text-hover'}`}
                        onClick={() => setRepeatMode(prev => prev === 2 ? 0 : prev + 1)}
                    >
                        {repeatMode === 2 ? <PiRepeatOnceLight title='Bật phát lại tất cả' size={20}/> : <PiRepeatLight title='Bật phát lại một bài' size={20} /> }
                    </span>
                </div>
                <div className='w-full flex justify-center items-center gap-[10px] text-xs text-black-100 font-medium'>
                    <span className='opacity-50'>{moment.utc(curSecond*1000).format('mm:ss')}</span>
                    <div 
                    className='w-3/4 h-1 hover:h-[6px] relative bg-[rgba(0,0,0,0.1)] rounded-[4px] flex cursor-pointer justify-center items-center'
                    onClick={handleClickProgressbar}
                    ref={trackRef}
                    >
                        <div ref={thumbRef} className='absolute top-0 left-0 bottom-0 bg-main-500 rounded-[4px]'></div>
                    </div>
                    <span>{moment.utc(songInfo?.duration*1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className="w-[30%] flex-auto border border-red-500">
                Volume
            </div>
        </div>
    );
};

export default Player;
