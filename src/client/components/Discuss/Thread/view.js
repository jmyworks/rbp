/*
 * React Ready (https://github.com/michaelchiang/react-ready)
 * Copyright (c) 2015 Michael Chiang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ThreadsActions from '../../../actions/ThreadsActions.js';
import ThreadsStore from '../../../stores/ThreadsStore.js';
import Reflux from 'Reflux';
import _ from 'lodash';

var Post = React.createClass({
    render: function() {
        return (
           <li>{this.props.content}</li>
        );
    }
});

var Thread = React.createClass({
    mixins: [Reflux.connect(ThreadsStore)],
    componentDidMount: function() {
        var id = this.props.routeParams.id;
        ThreadsActions.getThread(id, (error, data) => {
            if (!error) {
                this.setState(data);
            }
        });
    },
    render: function () {
        if (!this.state.id) {
            return <div></div>;
        }

        return (
            <div>
                <h2>{this.state.title}</h2>
                <p>{this.state.content}</p>
                <ul>
                    {_.map(this.state.posts, (post) => {
                        return <Post key={post.id} id={post.id} content={post.content} />;
                    })}
                </ul>
            </div>
        );
    }
});

export default Thread;
