import * as headerTypes from './header-action-types'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    focused: false,
    list: []
})

export default (state = defaultState, action) => {
    if (action.type === headerTypes.SEARCH_FOCUS) {
        return state.set('focused', true)
    } else if (action.type === headerTypes.SEARCH_BLUR) {
        return state.set('focused', false)
    } else if (action.type === headerTypes.CHANGE_LIST) {
        return state.set('list', action.data)
    }
    return state;
}