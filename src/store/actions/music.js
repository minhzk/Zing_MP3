import actionTypes from "./actionTypes"

export const setCurSongId =  (sid) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    sid
})

export const play =  (flag) => ({
    type: actionTypes.PLAY,
    flag
})

export const playAlbum =  (flag) => ({
    type: actionTypes.SET_ALBUM,
    flag
})

export const setPlaylist =  (songs) => ({
    type: actionTypes.PLAYLIST,
    songs
})

export const loading =  (flag) => ({
    type: actionTypes.LOADING,
    flag
})

export const setCurSongData =  (data) => ({
    type: actionTypes.SET_CUR_SONG_DATA,
    data
})

export const setCurPlaylistId =  (pid) => ({
    type: actionTypes.SET_CUR_PLAYLIST_ID,
    pid
})

// export const fetchDetailPlaylist = (pid) => async(dispatch) => {
//     try {
//         const res = await apis.apiGetDetailPlaylist(pid)
//         if (res?.data.err === 0) {
//             dispatch({
//                 type: actionTypes.PLAYLIST,
//                 songs: res.data?.data?.song?.items
//             })
//         }
//     } catch (error) {
//         dispatch({
//             type: actionTypes.PLAYLIST,
//             songs: null
//         })
//     }
// }
