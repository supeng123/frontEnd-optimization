import { combineReducers } from 'redux-immutable'
import headerReducer from '../common/header/store/header-reducer'
import homeReducer from '../pages/home/store/reducer'
import detailReducer from '../pages/detail/store/reducer'

export default combineReducers({
    header: headerReducer,
    home: homeReducer,
    detail: detailReducer
})