import { fromJS } from 'immutable'

import { CHANGE_HOME_DATA, ADD_HOME_LIST, TOGGLE_SCROLL_TOP } from './actions'

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    showScroll: false
})

export default (state = defaultState, action) => {
    switch(action.type) {
        case CHANGE_HOME_DATA:
            return state.merge(
                {
                    topicList: fromJS(action.topicList),
                    articleList: fromJS(action.articleList)
                }
            )
        case ADD_HOME_LIST:
            return state.set('articleList', state.get('articleList').concat(action.list))
        case TOGGLE_SCROLL_TOP:
            return state.set('showScroll', action.show)
        default:
            return state;
    }
}