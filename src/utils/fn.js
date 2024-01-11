export const getArraySlider = (start, end, number) => {
    const limit = start > end ? number : end
    let output = []
    for(let i = start; i <= limit; i++) {
        output.push(i)
    }
    if (start > end) {
        for(let i = 0; i <= end; i++) {
            output.push(i)
        }
    }
    return output
}

export const handleNumber = number => {
    if (number > Math.pow(10, 6)) {
        return `${Math.round(number * 10 / Math.pow(10, 6)) / 10}M`
    } else if (number < 1000) {
        return number
    } else {
        return `${Math.round(number / Math.pow(10, 3))}K`
    }
}

export const formatNumber = number => {

    // Sử dụng toLocaleString để chuyển đổi số thành chuỗi với định dạng số ngăn cách hàng nghìn
    const formattedNumber = number?.toLocaleString();
    // Thay thế dấu phân cách hàng nghìn thành dấu chấm
    const customFormattedNumber = formattedNumber?.replace(/,/g, '.');

    return customFormattedNumber
}