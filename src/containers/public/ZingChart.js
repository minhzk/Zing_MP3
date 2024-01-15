import React, {useEffect, useState, useRef} from 'react'
import { apiGetChartHome } from '../../apis/music'
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { SongItem, TopSongs } from '../../components';
import _ from 'lodash'
import { IoIosPlay } from 'react-icons/io';
import bg from '../../assets/img/week-chart-bg.jpg'

const ZingChart = () => {

  const [chartData, setChartData] = useState(null)
  console.log(chartData);
  const [data, setData] = useState(null)
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  })
  const [selected, setSelected] = useState(null)
  const chartRef = useRef()
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
        y: {
            ticks: { display: false },
            grid: { drawTicks: false, color: 'rgba(0,0,0,0.2)' },
            min: chartData?.RTChart?.chart?.minScore,
            max: chartData?.RTChart?.chart?.maxScore,
            border: { dash: [2, 5] }
        },
        x: {
            ticks: { color: 'gray' },
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
                        data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 1)?.map(item => item.counter),
                        encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i]
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

  useEffect(() => {
    const fetchChartData = async() => {
      const res = await apiGetChartHome()
      if (res?.data?.err === 0) {
        setChartData(res?.data?.data)
      }
    }
    fetchChartData()
  }, [])

  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times?.filter(item => +item.hour % 2 === 1)?.map(item => `${item.hour}:00`)
    const datasets = []
    if (chartData?.RTChart?.chart?.items) {
        for ( let i = 0; i < 3; i++) {
            datasets.push({
                data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 1)?.map(item => item.counter),
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
  }, [chartData]) 
  // console.log(Object.entries(chartData?.weekChart));

  return (
    <div className='mt-[70px]'>
      <div className='flex flex-col w-full gap-8'>
        <div className='w-full flex flex-col'>
          <div className='flex gap-2 items-center mb-5'>
              <h3 className='text-[28px] text-white font-bold bg-zingchart bg-clip-text text-fill-color-transparent'>#zingchart</h3>
              <span className='text-black p-1 rounded-full bg-white opacity-100 hover:opacity-90'><IoIosPlay size={20}/></span>
          </div>
          <div className='flex-6 min-h-[300px] relative'>
            {data && <Line ref={chartRef} data={data} options={options}/>}
            <div style={{top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute'}}>
                <SongItem 
                    key={chartData?.RTChart?.items?.find(item => item?.encodeId === selected)?.encodeId}
                    thumbnail={chartData?.RTChart?.items?.find(item => item?.encodeId === selected)?.thumbnail}
                    title={chartData?.RTChart?.items?.find(item => item?.encodeId === selected)?.title}
                    artistsNames={chartData?.RTChart?.items?.find(item => item?.encodeId === selected)?.artistsNames}
                    sid={chartData?.RTChart?.items?.find(item => item?.encodeId === selected)?.encodeId}
                    percent={Math.round(chartData?.RTChart?.items?.find(item => item?.encodeId === selected)?.score / chartData?.RTChart?.chart?.totalScore*100)}
                    style= 'bg-[#4A90E2]'
                />
            </div>
          </div>
        </div>
        <TopSongs data={chartData?.RTChart?.items} number={10} isHidePlaylist={false} />
        <div className='relative mx-[-59px]'>
          <img src={bg} alt="week-chart-bg" className='w-full h-[610px] object-cover grayscale' />
          <div className='absolute inset-0 bg-grayscale'></div>
          <div className='absolute top-8 left-0 right-0 bottom-1/2 flex flex-col gap-5 px-[59px]'>
            <h3 className='font-bold text-[40px] text-text-hover'>Bảng Xếp Hạng Tuần</h3>
            <div className='flex gap-4'>
              {chartData && Object?.entries(chartData?.weekChart)?.map((item, index) => (
                <div className='flex-1 bg-[hsla(0,0%,100%,0.5)] rounded-md px-[10px] py-5 flex flex-col' key={index}>
                  <div className='flex gap-2'>
                    <h3 className='pl-10 pb-[10px] font-bold text-[24px] text-text-hover'>{item[0] === 'vn' ? 'Việt Nam' : item[0] === 'us' ? 'US-UK' : 'K-Pop'}</h3>
                    <span className='text-white p-1 rounded-full h-[29px] w-[29px] bg-main-500 opacity-100 hover:opacity-90 cursor-pointer mt-[6px]'><IoIosPlay size={22} className='pl-[1px] pb-[1px]'/></span>
                  </div>
                  <div className='h-fit'>
                    <TopSongs 
                      data={item[1]?.items}
                      number={5}
                      isHidePlaylist={true}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZingChart