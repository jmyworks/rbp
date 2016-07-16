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
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import UIActions from '../../../actions/UIActions';
import utils from '../../../utils/utils';

import serialize from 'form-serialize';

var EditThread = React.createClass({
    componentDidMount: function() {
        var id = this.props.params.id;
        var dispatch = this.props.dispatch;

        dispatch(DiscussActions.getThread({id}));
    },
    handleUpdateThread: function(evt) {
        evt.preventDefault();

        var form = document.querySelector('#updateThread');
        var params = serialize(form, {hash: true});

        const {dispatch} = this.props;
        dispatch(DiscussActions.updateThread({...params, id: this.props.id}));

        return false;
    },
    render: function() {
        if (!this.props.id) {
            return <div></div>;
        }

        return (
            <div>
                <form id="updateThread">
                    <TextField
                        hintText="title"
                        floatingLabelText="Title"
                        value={this.props.title}
                        name="title"
                        onChange={(event) => {this.props.dispatch(UIActions.inputChanged('discuss.thread.title', event.target.value)); }}
                    /><br />
                    <TextField
                        multiLine={true}
                        rows={5}
                        hintText="title"
                        floatingLabelText="Content"
                        value={this.props.content}
                        name="content"
                        onChange={(event) => {this.props.dispatch(UIActions.inputChanged('discuss.thread.content', event.target.value)); }}
                    /><br />
                    <FlatButton label="Submit" type="submit" onClick={this.handleUpdateThread} />
                </form>
            </div>
        );
    }
});

function mapStateToProps(state) {
    var thread = utils.filterState(state, 'discuss.thread', {});

    return {...thread};
}

export default connect(mapStateToProps)(EditThread);
