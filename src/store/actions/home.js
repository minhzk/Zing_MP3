import actionTypes from "./actionTypes"
import * as apis from '../../apis'

export const getHome =  () => async (dispatch) => {
    try {
        const res = await apis.getHome()
        console.log(res)
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