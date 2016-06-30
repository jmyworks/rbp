/*
* React Ready (https://github.com/michaelchiang/react-ready)
* Copyright (c) 2015 Michael Chiang
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import Link from 'react-router/lib/Link';

var Discuss = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Discuss Anything about react-ready</h1>
                <p><Link to="/Discuss/CreateThread">New Post</Link></p>
                {this.props.children}
            </div>
        );
    }
});

export default Discuss;
