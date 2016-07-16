/**
 * Created by michael on 16/7/10.
 */

import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';

var Book = React.createClass({
    render: function() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup>
                        <RaisedButton label="Write a Book" primary={true}
                                      containerElement={<Link to="/Book/Write" />} linkButton={true} />
                        <FlatButton label="My Shelf" primary={true}
                                    containerElement={<Link to="/Book/Shelf" />} linkButton={true} />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarSeparator />
                    </ToolbarGroup>
                </Toolbar>
                {this.props.children}
            </div>
        );
    }
});

export default Book;
