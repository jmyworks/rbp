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

import serialize from 'form-serialize';

var EditThread = React.createClass({
    handleUpdateThread: function(evt) {
        evt.preventDefault();

        var form = document.querySelector('#updateThread');
        var params = serialize(form, {hash: true});

        const {dispatch} = this.props;
        dispatch(DiscussActions.updateThread(params));
    },
    componentDidMount: function() {
        var id = this.props.params.id;
        var dispatch = this.props.dispatch;

        dispatch(DiscussActions.getThread({id}));
    },
    render: function() {
        if (!this.props.id) {
            return <div></div>;
        }

        return (
            <div>
                <form id="updateThread">
                    <input type="text" name="title" valueLink={this.linkState('title')} />
                    <textarea name="content" cols="30" rows="10" valueLink={this.linkState('content')}></textarea>
                    <input type="submit" value="submit" onClick={this.handleUpdateThread} />
                </form>
            </div>
        );
    }
});

function mapStateToProps(state) {
    if (state !== undefined && state.id !== undefined) {
        return {
            id: state.id,
            title: state.title,
            content: state.content
        };
    }

    return {};
}

export default connect(mapStateToProps)(EditThread);
