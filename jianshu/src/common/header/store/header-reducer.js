import * as headerTypes from './header-action-types'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    focused: false,
    mouseIn: false,
    list: [],
    page: 1,
    totalPage: 1
})

export default (state = defaultState, action) => {
    if (action.type === headerTypes.SEARCH_FOCUS) {
        return state.set('focused', true)
    } else if (action.type === headerTypes.SEARCH_BLUR) {
        return state.set('focused', false)
    } else if (action.type === headerTypes.CHANGE_LIST) {
        return state.merge(
                {
                    list: action.data,
                    totalPage: action.totalPage
                })
    } else if(action.type === headerTypes.MOUSE_ENTER) {
        return state.set('mouseIn', true)
    } else if(action.type === headerTypes.MOUSE_LEAVE) {
        return state.set('mouseIn', false)
    } else if(action.type === headerTypes.CHANGE_PAGE_LIST) {
        return state.set('page', action.page)
    }
    return state;
}