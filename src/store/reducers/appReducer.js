import actionTypes from "../actions/actionTypes";

const initState = {
    banner: null,
    chill: null,
    sad: null,
    top100: null,
    hotAlbum: null,
    remix: null,
    topYear: null,
    seasonPlaylists: null,
    isLoading: false,
    newRelease: null,
    weekChart: null,
    chart: null,
    rank: null,
    topNewSong: null,
    currentWidth: null,
    
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || null,
                sad: action.homeData?.find(item => item.sectionId === 'hEditorTheme4') || null,
                top100: action.homeData?.find(item => item.sectionId === 'h100') || null,
                hotAlbum: action.homeData?.find(item => item.sectionId === 'hAlbum') || null,
                remix: action.homeData?.find(item => item.sectionId === 'hEditorTheme3') || null,
                topYear: action.homeData?.find(item => item.sectionId === 'hArtistTheme') || null,
                seasonPlaylists: action.homeData?.find(item => item.sectionId === 'hSeasonTheme') || null,
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || null,
                weekChart: action.homeData?.find(item => item.sectionType === 'weekChart')?.items || null,
                chart: action.homeData?.find(item => item.sectionId === 'hZC')?.chart || null,
                rank: action.homeData?.find(item => item.sectionId === 'hZC')?.items || null,
                topNewSong: action.homeData?.find(item => item.sectionId === 'hNewrelease') || null,
            }
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag
            }
        case actionTypes.CURRENT_WIDTH:
            return {
                ...state,
                currentWidth: action.w
            }
    
        default:
            return state
    }
}

export default appReducer