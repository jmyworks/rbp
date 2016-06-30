/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import {Router} from 'react-router';
import AsyncProps from 'react-router/lib/experimental/AsyncProps';
import routerHelper from './utils/routerHelper.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

import 'normalize.css/normalize.css';

var rootRoute = routerHelper({
    match: '',
    path: '',
    children: [
        'Index', 'Document', 'Download', 'Discuss', 'About'
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

React.render((
        <Router
            children={rootRoute}
            history={new BrowserHistory()}
            createElement={AsyncProps.createElement} />
    ), document.getElementsByTagName('body')[0]);
