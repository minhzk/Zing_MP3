import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getArraySlider } from '../utils/fn';
import * as actions from '../store/actions'
import { useNavigate } from 'react-router-dom';
import {Button} from '../components'
import icons from '../utils/icons'

const { GrPrevious, GrNext} = icons

var intervalId

const Slider = () => {
    const { banner, currentWidth } = useSelector(state => state.app);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(2)
    const [isAuto, setIsAuto] = useState(true)

    // Animation for banner
    useEffect(() => {
        if (isAuto) {
            intervalId = setInterval(() => {
                handleAnimationBanner(1)
            }, 4000)
        }
        return() => {
            intervalId && clearInterval(intervalId)
        }
    }, [min,max, isAuto])

    const handleAnimationBanner = (step) => {
        const sliderEls = document.getElementsByClassName('slider-item')
        const list = getArraySlider(min, max, sliderEls.length - 1)
        for (let i = 0; i < sliderEls.length; i++) {
                // Delete classnames (css)
                sliderEls[i]?.classList.remove('animate-slide-right','order-last','z-10')
                sliderEls[i]?.classList.remove('animate-slide-left','order-first','z-20')
                sliderEls[i]?.classList.remove('animate-slide-left2','order-2','z-20')

                // Hide or show images
                if (list.some(item => item === i )) {
                    sliderEls[i].style.cssText = 'display: block;'
                } else {
                    sliderEls[i].style.cssText = 'display: none;'
                } 
        }
        // Add animations by adding classnames
        list.forEach(item => {
            if (item === max) {
                sliderEls[item]?.classList.add('animate-slide-right','order-last','z-10')
            } else if (item === min) {
                sliderEls[item]?.classList.add('animate-slide-left','order-first','z-20')
            } else {
                sliderEls[item]?.classList.add('animate-slide-left2','order-2','z-20')
            }
        })
        if (step === 1) {
            setMin(prev => prev === sliderEls.length - 1 ? 0 : prev + step)
            setMax(prev => prev === sliderEls.length - 1 ? 0 : prev + step)
        }
        if (step === -1) {
            setMin(prev => prev === 0 ? sliderEls.length - 1 : prev + step)
            setMax(prev => prev === 0 ? sliderEls.length - 1 : prev + step)
        }
    }

    const handleClickBanner = (item) => {
        if(item?.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId))
            dispatch(actions.play(true))
            dispatch(actions.setPlaylist(null))
            dispatch(actions.setRecent({thumbnail: item?.thumbnail, title: item?.title, sid: item?.encodeId, artistsNames: item?.artistsNames}))
        } else if (item?.type === 4) {
            const playlistPath = item?.link.split('.')[0]
            navigate(playlistPath)
        } else {
            dispatch(actions.setPlaylist(null))
        }
    }

    const handleClickBtn = useCallback((step) => {
        setIsAuto(false)
        handleAnimationBanner(step)
    }, [min, max])

    return (
        <div className='w-full overflow-hidden relative group'>
            <Button
                icon={<GrPrevious size={30}/>}
                style='absolute top-1/2 left-4 bg-[hsla(0,0%,100%,.15)] text-white btn-shadow hover:opacity-90 z-50 rounded-full h-[55px] w-[55px] hidden group-hover:block'
                handleOnClick={() => handleClickBtn(-1)}
            />
            <Button
                icon={<GrNext size={30}/>}
                style='absolute top-1/2 right-4 bg-[hsla(0,0%,100%,.15)] text-white btn-shadow hover:opacity-80 z-50 rounded-full h-[55px] w-[55px] hidden group-hover:block'
                handleOnClick={() => handleClickBtn(1)}
            />
            <div 
                className='flex gap-[30px] pt-8 '
                onMouseLeave={e => setIsAuto(true)}
                onMouseEnter={e => setIsAuto(false)}
            >
                {banner?.map((item, index) => (
                    <img 
                        key={item.encodeId}
                        src={item.banner} 
                        onClick={() => handleClickBanner(item)}
                        className={`slider-item cursor-pointer object-cover ${currentWidth < 1024 ? 'w-[48%]' : 'w-[31%]'} rounded-lg flex-1`}
                        alt='Banner'
                    />
                ))}
            </div>
            
        </div>
    );
};

export default Slider;
