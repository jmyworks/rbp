/*
 * React Ready (https://github.com/michaelchiang/react-ready)
 * Copyright (c) 2015 Michael Chiang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {connect} from 'react-redux';
import Link from 'react-router/lib/Link.js';
import DiscussActions from '../../../actions/DiscussActions.js';
import _ from 'lodash';
import utils from '../../../../common/utils';

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
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(DiscussActions.getThreads());
    },
    handleDeleteThread(id) {
        const {dispatch} = this.props;
        dispatch(DiscussActions.deleteThread({id}));
    },
    render: function () {
        if (!this.props.list) {
            return <ul></ul>;
        }

        return (
            <ul>
                {_.map(this.props.list, (item) => {
                    return <ThreadItem key={item.id} id={item.id} title={item.title} handleDeleteThread={this.handleDeleteThread.bind(this, item.id)} />;
                })}
            </ul>
        );
    }
});

function mapStateToProps(state) {
    var list = utils.filterState(state, 'discuss.threads', []);

    return {list};
}

export default connect(mapStateToProps)(ThreadList);
