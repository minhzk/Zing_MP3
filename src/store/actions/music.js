import actionTypes from "./actionTypes"
import * as apis from "../../apis";

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

export const setRecent =  (data) => ({
    type: actionTypes.SET_RECENT,
    data
})

export const setRecentPlaylists =  (data) => ({
    type: actionTypes.SET_RECENT_PLAYLIST,
    data
})

export const search = (keyword) => async (dispatch) => {
    try {
        const res = await apis.apiSearch(keyword)
        if (res.data.err === 0) {
            dispatch({
                type: actionTypes.SEARCH,
                data: res.data.data,
                keyword
            })
        } else {
            dispatch({
                type: actionTypes.SEARCH,
                data: null
            }) 
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SEARCH,
            data: null
        })
    }
}

export const getSearchSong = (singerId) => async (dispatch) => {
    try {
        const res = await apis.apiGetArtistSongs(singerId)
        if (res.data.err === 0) {
            dispatch({
                type: actionTypes.PLAYLIST,
                songs: res.data.data.items
            })
        } else {
            dispatch({
                type: actionTypes.PLAYLIST,
                songs: null
            }) 
        }
    } catch (error) {
        dispatch({
            type: actionTypes.PLAYLIST,
            songs: null
        })
    }
}

