import axios from '../axios';

export const apiGetSong = (sid) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: '/song',
                method: 'get',
                params: { id: sid },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetDetailSong = (sid) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: '/infosong',
                method: 'get',
                params: { id: sid },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiGetDetailPlaylist = (pid) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: '/detailplaylist',
                method: 'get',
                params: { id: pid },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });

export const apiSearch = (keyword) =>
    new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: '/search',
                method: 'get',
                params: { keyword },
            });
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
