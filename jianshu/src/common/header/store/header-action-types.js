import axios from 'axios'
import { fromJS } from 'immutable'

export const SEARCH_FOCUS = 'header/SEARCH_FOCUS'
export const SEARCH_BLUR = 'header/SEARCH_BLUR'
export const CHANGE_LIST = 'header/CHANGE_LIST'
export const MOUSE_ENTER = 'header/MOUSE_ENTER'
export const MOUSE_LEAVE = 'header/MOUSE_LEAVE'
export const CHANGE_PAGE_LIST = 'header/CHANGE_PAGE_LIST'

export const searchFocus = () => ({
    type: SEARCH_FOCUS
})

export const searchBlur = () => ({
    type: SEARCH_BLUR
})

export const changeList = (data) => ({
    type: CHANGE_LIST,
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 2)
})

export const mouseEnter = () =>({
    type: MOUSE_ENTER
})

export const mouseLeave = () =>({
    type: MOUSE_LEAVE
})

export const changePageList = (page) =>({
    type: CHANGE_PAGE_LIST,
    page
})

export const getList = () => {
    return (dispatch) => {
        console.log('222')
        axios.get('/api/headerList.json')
        .then((res) => {
            const data = res.data;
            const action = changeList(data.data)
            dispatch(action)
        })
        .catch(() => {
            console.log('err')
        })
    }
}