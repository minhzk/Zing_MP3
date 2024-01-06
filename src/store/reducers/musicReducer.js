import { data } from "autoprefixer";
import actionTypes from "../actions/actionTypes";

const initState = {
    curSongId: null,
    curSongData: null,
    isPlaying: false,
    atAlbum: false,
    songs: null,
    curPlaylistId: null,
    recentSongs: [],
    searchData: {},
    keyword: '',
}

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid || null
            }
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag
            }
        case actionTypes.SET_ALBUM:
            return {
                ...state,
                atAlbum: action.flag
            }
        case actionTypes.PLAYLIST:
            return {
                ...state,
                songs: action.songs || null
            }
        case actionTypes.SET_CUR_SONG_DATA:
            return {
                ...state,
                curSongData: action.data || null
            }
        case actionTypes.SET_CUR_PLAYLIST_ID:
            return {
                ...state,
                curPlaylistId: action.pid || null
            }
        case actionTypes.SET_RECENT:
            let songs = state.recentSongs
            if (action.data) {
                if (state.recentSongs?.some(item => item.sid === action.data.sid)) {
                    songs = songs.filter((item) => item.sid !== action.data.sid)
                }
                if (songs.length >= 20) {
                    songs = songs.filter((item, index, self) => index !== self.length - 1)
                }
                songs = [action.data, ...songs]
            }
            return {
                ...state,
                recentSongs: songs
            }
        case actionTypes.SEARCH:
            return {
                ...state,
                searchData: action.data || {},
                keyword: action.keyword || ''
            }
    // songs.filter((item, index, self) => index !== self.length - 1)
        default:
            return state
    }
}

export default musicReducer