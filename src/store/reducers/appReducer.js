import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    chill: {}

}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
            }
    
        default:
            return state
    }
}

export default appReducer