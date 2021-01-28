import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

// 원래 redux store는 객체밖에 못받기 때문에, promise와 function도 받게하려고 미들웨어 사용
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__&&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
  >
    
    <App />,

  </Provider>
  ,document.getElementById('root')
);
