import React, {memo, useState, useEffect, useRef} from 'react'
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { useSelector } from 'react-redux';
import {SongItem} from './';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import path from '../utils/path';
import icons from '../utils/icons';

const {IoIosPlay} = icons

const ChartSection = () => {

    const [data, setData] = useState(null)
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,

    })
    const [selected, setSelected] = useState(null)
    const { chart, rank } = useSelector(state => state.app)
    const chartRef = useRef()
    // console.log({chart, rank});
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { drawTicks: false, color: 'rgba(255,255,255,0.2)' },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [2, 5] }
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' }
            },
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({tooltip}) => {
                    if (!chartRef || !chartRef.current) return
                    if (tooltip.opacity === 0) {
                        if (tooltipState !== 0) setTooltipState(prev => ({...prev, opacity: 0}))
                        return
                    }
                    const counters = []
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                            encodeId: Object.keys(chart?.items)[i]
                        })
                    }
                    // console.log(+tooltip.body[0]?.lines[0]?.replace(',', ''));
                    const rs = counters.find(item => item.data.some(n => n === +tooltip.body[0]?.lines[0]?.replace(',', '')))
                    setSelected(rs.encodeId)
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    }
                    if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
                }
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    }

    // console.log(tooltipState);
    // console.log(selected);
    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
        const datasets = []
        if (chart?.items) {
            for ( let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                    borderColor: i === 0 ? '#4A90E2' : i === 1 ? '#27BD9C' : '#E35050',
                    tension: 0.3,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 5,
                    pointBorderColor: i === 0 ? '#4A90E2' : i === 1 ? '#27BD9C' : '#E35050',
                    pointHoverBorderWidth: 3,
                    pointHitRadius: 5,

                })
                setData({labels, datasets})
            }
        }
    }, [chart])
    return (
        <div className='mt-12 relative min-[1324px]:max-h-[430px] h-[790px] rounded-lg '>
            <div className='bg-[rgba(51,16,76,0.9)] absolute inset-0 min-h-[400px] z-10 rounded-lg'></div>
            <div className='absolute inset-0 flex flex-col z-20 p-5 rounded-lg'>
                <Link to={path.ZING_CHART} className='flex gap-2 items-center mb-5'>
                    <h3 className='text-[28px] text-white font-bold bg-zingchart bg-clip-text text-fill-color-transparent'>#zingchart</h3>
                    <span className='text-black p-1 rounded-full bg-white opacity-100 hover:opacity-90'><IoIosPlay size={20}/></span>
                </Link>
                <div className='min-[1324px]:flex-row flex flex-col gap-4 h-full'>
                    <div className='flex-4 flex flex-col gap-[10px]'>
                        {rank?.filter((i, index) => index < 3)?.map((item, index) => (
                            <SongItem 
                                key={item?.encodeId}
                                thumbnail={item?.thumbnail}
                                title={item?.title}
                                artistsNames={item?.artistsNames}
                                sid={item?.encodeId}
                                order={index + 1}
                                percent={Math.round(item?.score / chart?.totalScore*100)}
                                style= 'hover:bg-[hsla(0,0%,100%,0.5)] bg-[hsla(0,0%,100%,.07)]'
                            />
                        ))}
                        <Link to={path.ZING_CHART} className='px-[25px] py-[5px] mt-[5px] text-white hover:bg-[hsla(0,0%,100%,.1)] border border-white rounded-full w-fit m-auto'>Xem thêm</Link>
                    </div>
                    <div className='flex-6 order-first min-[1324px]:order-last min-[1324px]:w-[500px] h-full relative'>
                        {data && <Line ref={chartRef} data={data} options={options}/>}
                        <div style={{top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute'}}>
                            <SongItem 
                                key={rank?.find(item => item?.encodeId === selected)?.encodeId}
                                thumbnail={rank?.find(item => item?.encodeId === selected)?.thumbnail}
                                title={rank?.find(item => item?.encodeId === selected)?.title}
                                artistsNames={rank?.find(item => item?.encodeId === selected)?.artistsNames}
                                sid={rank?.find(item => item?.encodeId === selected)?.encodeId}
                                percent={Math.round(rank?.find(item => item?.encodeId === selected)?.score / chart?.totalScore*100)}
                                style= 'bg-[#4A90E2]'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ChartSection)