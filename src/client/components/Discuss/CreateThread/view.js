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
import serialize from 'form-serialize';
import {Navigation} from 'react-router';

var CreateThread = React.createClass({
    mixins: [Reflux.connect(ThreadsStore), Navigation],
    handleCreateThread: function(evt) {
        evt.preventDefault();

        var form = document.querySelector('#createThread');
        var params = serialize(form, {hash: true});

        ThreadsActions.createThread(params, (error, id) => {
            if (!error) {
                this.transitionTo('/Discuss/Thread/' + id);
            }
        });
    },
    render: function() {
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

export default CreateThread;
