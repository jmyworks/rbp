/*
 * React Ready (https://github.com/michaelchiang/react-ready)
 * Copyright (c) 2015 Michael Chiang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import Route from './Route.js';
import {Provider} from 'mobx-react';
import BookStore from './stores/BookStore';
import UI from './stores/UIStore';

import 'normalize.css/normalize.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

const bookStore = new BookStore();
bookStore.loadBooks();

ReactDOM.render((
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider bookStore={bookStore} UI={UI}>
            <Router
                children={Route}
                history={browserHistory} />
        </Provider>
    </MuiThemeProvider>
), document.getElementById('app-container'));
