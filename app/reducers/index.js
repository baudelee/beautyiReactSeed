// reducers/index.js
import { combineReducers } from 'redux' // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理
//
import { home } from './home'

import { loadingBarReducer } from 'react-redux-loading-bar'


export default combineReducers({
    home ,
    routing: routerReducer ,
    loadingBar: loadingBarReducer,
})
