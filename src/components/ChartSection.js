import React, {memo, useState, useEffect, useRef} from 'react'
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { useSelector } from 'react-redux';
import {SongItem} from './';

const ChartSection = () => {

    const [data, setData] = useState(null)
    const [tooltip, setTooltip] = useState({
        opacity: 0,
        top: 0,
        left: 0,

    })
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
                external: (context) => {
                    console.log(context);
                }
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    }
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
        <div className='mt-12 relative min-h-[375px]'>
            <div className='bg-[rgba(51,16,76,0.9)] absolute inset-0 min-h-[375px] z-10'></div>
            <div className='absolute inset-0 flex flex-col z-20 p-5'>
                <h3 className='text-2xl text-white font-bold mb-5'>#zingchart</h3>
                <div className='flex gap-4 h-full'>
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
                            />
                        ))}
                    </div>
                    <div className='flex-6 h-full'>
                        {data && <Line ref={chartRef} data={data} options={options}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ChartSection)