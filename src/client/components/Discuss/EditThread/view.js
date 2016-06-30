/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React from 'react/addons.js';
import ThreadsActions from '../../../actions/ThreadsActions.js';
import ThreadsStore from '../../../stores/ThreadsStore.js';
import Reflux from 'Reflux';
import serialize from 'form-serialize';
import {Navigation} from 'react-router';

var EditThread = React.createClass({
    mixins: [Reflux.connect(ThreadsStore), Navigation, React.addons.LinkedStateMixin],
    handleUpdateThread: function(evt) {
        evt.preventDefault();

        var form = document.querySelector('#updateThread');
        var params = serialize(form, {hash: true});

        ThreadsActions.updateThread(this.props.routeParams.id, params, (error, id) => {
            if (!error) {
                this.transitionTo('/Discuss/Thread/' + id);
            }
        });
    },
    componentDidMount: function() {
        var id = this.props.routeParams.id;
        ThreadsActions.getThread(id, (error, data) => {
            if (!error) {
                this.setState(data);
            }
        });
    },
    render: function() {
        if (!this.state.id) {
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

export default EditThread;
