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

var CreateThread = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    handleCreateThread: function(evt) {
        evt.preventDefault();

        var form = document.querySelector('#createThread');
        var params = serialize(form, {hash: true});

        const {dispatch} = this.props;
        dispatch(DiscussActions.createThread(params));
    },
    render: function() {
        if (this.props.id) {
            this.context.router.push('/Discuss/Thread/' + this.props.id);
        }

        return (
            <div>
                <form id="createThread">
                    <input type="text" name="title" />
                    <textarea name="content" cols="30" rows="10"></textarea>
                    <input type="submit" value="submit" onClick={this.handleCreateThread} />
                </form>
            </div>
        );
    }
});

function mapStateToProps(state) {
    if (state !== undefined && state.id !== undefined) {
        return {id: state.id};
    }

    return {};
}

export default connect(mapStateToProps)(CreateThread);
