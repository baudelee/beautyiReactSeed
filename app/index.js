//引入React
import React from 'react';
import { render } from 'react-dom';


//redux
import { Provider } from 'react-redux'; //利用Provider可以使我们的 store 能为下面的组件所用
import { Router, Route, browserHistory, Redirect} from 'react-router' // Browser history 是由 React Router 创建浏览器应用推荐的 history
import { syncHistoryWithStore } from 'react-router-redux' // 利用react-router-redux提供的syncHistoryWithStore我们可以结合store同步导航事件

import finalCreateStore from './store/configureStore'  //引入store配置
import reducer from './reducers'  // 引入reducers集合
//引入配置文件
import injectTapEventPlugin from 'react-tap-event-plugin';

import './css/common/base.css'

injectTapEventPlugin();


// 给增强后的store传入reducer
export const store = finalCreateStore(reducer)
// 创建一个增强版的history来结合store同步导航事件
const history = syncHistoryWithStore(browserHistory, store)

import { Home  , TM404 } from './components/index'

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Home}></Route>
            <Route path="*" component={TM404} />
        </Router>
    </Provider>,
    document.getElementById('app')
)
