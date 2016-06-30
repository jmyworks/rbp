/*
 * React Ready (https://github.com/michaelchiang/react-ready)
 * Copyright (c) 2015 Michael Chiang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from 'react-router/lib/Link.js';
import ThreadsActions from '../../../actions/ThreadsActions.js';
import ThreadsStore from '../../../stores/ThreadsStore.js';
import Reflux from 'Reflux';
import _ from 'lodash';

var ThreadItem = React.createClass({
    render: function () {
        return (
            <li>
                <Link to={'/Discuss/Thread/' + this.props.id}>{this.props.title}</Link>
                <button onClick={this.props.handleDeleteThread}>X</button>
                <Link to={'/Discuss/EditThread/' + this.props.id}>Edit</Link>
            </li>
        );
    }
});

var ThreadList = React.createClass({
    mixins: [Reflux.connect(ThreadsStore)],
    handleDeleteThread: function (id) {
        var thisArg = this;
        ThreadsActions.deleteThread(id, (error, success) => {
            if (!error && success === true) {
                // refresh page
                ThreadsActions.getThreads((_error, _data) => {
                    if (!_error) {
                        thisArg.setState({list: _data});
                    }
                });
            }
        });
    },
    getInitialState: function() {
        ThreadsActions.getThreads((error, data) => {
            if (!error) {
                this.setState({list: data});
            }
        });
    },
    render: function () {
        if (!this.state.list) {
            return <ul></ul>;
        }

        return (
            <ul>
                {_.map(this.state.list, (item) => {
                    return <ThreadItem key={item.id} id={item.id} title={item.title} handleDeleteThread={this.handleDeleteThread.bind(this, item.id)} />;
                })}
            </ul>
        );
    }
});

export default ThreadList;
