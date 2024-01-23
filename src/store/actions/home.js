import actionTypes from "./actionTypes"
import * as apis from '../../apis'

export const getHome =  () => async (dispatch) => {
    try {
        const res = await apis.getHome()
        if (res.data.err === 0) {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: res.data.data.items
            })
        } else {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: null
            })
        }
    } catch (error) {
        dispatch({
                type: actionTypes.GET_HOME,
                homeData: null
            })
    }
}

export const setCurrentWidth = (w) => ({
    type: actionTypes.CURRENT_WIDTH,
    w
})