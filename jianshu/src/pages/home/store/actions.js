import axios from 'axios'
import { fromJS } from 'immutable'

export const CHANGE_HOME_DATA = 'home/CHANGE_HOME_DATA'
export const ADD_HOME_LIST = 'home/ADD_HOME_LIST'
export const TOGGLE_SCROLL_TOP = 'home/TOGGLE_SCROLL_TOP'

const changeHomeData = (result) => ({
    type: CHANGE_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList
})

const addHomeList = (list) => ({
    type: ADD_HOME_LIST,
    list: fromJS(list)
})

export const toggleTopShow = (show) => ({
    type: TOGGLE_SCROLL_TOP,
    show
})

export const getHomeInfo = () => {
    return (dispatch) => {
        axios.get('./api/home.json')
        .then((res) => {
            const result = res.data.data
            const action = changeHomeData(result)
            dispatch(action)
        })
    }
}

export const getMoreList = () => {
    return (dispatch) => {
        axios.get('./api/homeList.json')
        .then((res) => {
            const result = res.data.data
            const action = addHomeList(result)
            dispatch(action)
        })
    }
}

