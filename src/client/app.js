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
import {Router, browserHistory} from 'react-router';
import routerHelper from './utils/routerHelper.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

import 'normalize.css/normalize.css';

var rootRoute = routerHelper({
    match: '',
    path: '',
    children: [
        'Index', 'Discuss', 'Document', 'Download', 'About'
    ]
});

var app = React.createClass({
   render: function() {
       return (
           <div id="app">
               <Header></Header>
               <div id="content">
                   {this.props.children}
               </div>
               <Footer></Footer>
           </div>
       );
   }
});

rootRoute.component = app;

var configureStore = (initialState) => {
    return createStore(
        discussReducers,
        initialState,
        applyMiddleware(promiseMiddleware));
};

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <Router
            children={rootRoute}
            history={browserHistory} />
    </Provider>
), document.getElementById('app-container'));
