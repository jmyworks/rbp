/*
 * React Ready (https://github.com/michaelchiang/react-ready)
 * Copyright (c) 2015 Michael Chiang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import promiseMiddleware from 'redux-promise';
import discussReducers from './reducers/DiscussReducers';
import UIReducers from './reducers/UIReducers';
import {Router, browserHistory} from 'react-router';
import {handleActions} from 'redux-actions';
import Route from './Route.js';

import 'normalize.css/normalize.css';

var configureStore = (initialState) => {
    return createStore(
        handleActions({...discussReducers, ...UIReducers}),
        initialState,
        applyMiddleware(promiseMiddleware));
};

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
            <Router
                children={Route}
                history={browserHistory} />
    </Provider>
), document.getElementById('app-container'));
