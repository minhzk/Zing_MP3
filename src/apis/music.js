import axios from '../axios'

export const getSong = (sid) => new Promise(async(resolve, reject) => {
    try {
        const res = await axios({
            url: '/song',
            method: 'get',
            params: {id: sid}
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})

export const getDetailSong = (sid) => new Promise(async(resolve, reject) => {
    try {
        const res = await axios({
            url: '/infosong',
            method: 'get',
            params: {id: sid}
        })
        resolve(res)
    } catch (error) {
        reject(error)
    }
})