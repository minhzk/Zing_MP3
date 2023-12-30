const options = {
    responsive: true,
    pointRadius: 0,
    aspectRatio: 4,
    scales: {
        y: {
            ticks: { display: false },
            grid: { borderDash: [1, 4], color: 'gray' }
        },
        x: {
            ticks: { color: 'blue' },
            grid: { color: 'transparent' }
        },
    },
    plugins: {
        legend: false
    }
}