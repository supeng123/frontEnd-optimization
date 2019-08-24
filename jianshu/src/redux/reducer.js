import { combineReducers } from 'redux-immutable'
import headerReducer from '../common/header/store/header-reducer'

export default combineReducers({
    header: headerReducer
})