import React, {memo, useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { useSelector } from 'react-redux';

const ChartSection = () => {

    const [data, setData] = useState(null)
    const { chart, rank } = useSelector(state => state.app)
    // console.log({chart, rank});
    const options = {
        responsive: true,
        pointRadius: 0,
        aspectRatio: 4,
        scales: {
            y: {
                ticks: { display: false },
                grid: { borderDash: [4, 20], color: 'rgba(255,255,255,0.5)' }
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' }
            },
        },
        plugins: {
            legend: false
        }
    }
    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => item.hour)
        const datasets = []
        if (chart?.items) {
            for ( let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                    borderColor: i === 0 ? 'blue' : i === 1 ? 'yellow' : 'red',
                    tension: 0.2,
                    borderWidth: 2
                })
                setData({labels, datasets})
            }
        }
    }, [chart])
    return (
        <div className='mt-12 min-h-[415px] relative'>
            <div className='bg-[rgba(51,16,76,0.9)] absolute inset-0'></div>
            <div className='absolute inset-0 p-5'>
                <h3 className='text-2xl text-white font-bold'>#zingchart</h3>
                <div className='flex gap-4 h-full'>
                    <div className='flex-4 border border-white'>rank</div>
                    <div className='flex-6 h-full'>
                        {data && <Line data={data} options={options}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ChartSection)