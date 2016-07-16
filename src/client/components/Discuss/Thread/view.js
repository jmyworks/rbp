/*
 * React Ready (https://github.com/michaelchiang/react-ready)
 * Copyright (c) 2015 Michael Chiang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {connect} from 'react-redux';
import DiscussActions from '../../../actions/DiscussActions.js';
import utils from '../../../utils/utils';

import _ from 'lodash';

var Post = React.createClass({
    render: function() {
        return (
           <li>{this.props.content}</li>
        );
    }
});

var Thread = React.createClass({
    componentDidMount: function() {
        var id = this.props.params.id;
        const {dispatch} = this.props;

        dispatch(DiscussActions.getThread({id}));
    },
    render: function () {
        if (!this.props.id) {
            return <div></div>;
        }

        return (
            <div>
                <h2>{this.props.title}</h2>
                <p>{this.props.content}</p>
                <ul>
                    {_.map(this.props.posts, (post) => {
                        return <Post key={post.id} id={post.id} content={post.content} />;
                    })}
                </ul>
            </div>
        );
    }
});

function mapStateToProps(state) {
    var thread = utils.filterState(state, 'discuss.thread', {});

    return {...thread};
}

export default connect(mapStateToProps)(Thread);
