/**
 * Created by michael on 16/7/11.
 */

import React from 'react';
import TextField from 'material-ui/TextField';

var Metadata = React.createClass({
    render: function () {
        return (
            <form id="bookMetadata" style={{margin: '0 auto', textAlign: 'center'}}>
                <TextField name="name" hintText="ex. Daily Note" floatingLabelText="Book Name" /><br />
                <TextField name="author" hintText="ex. Great Author" floatingLabelText="Author" /><br />
                {this.props.children}
            </form>
        );
    }
});

export default Metadata;
