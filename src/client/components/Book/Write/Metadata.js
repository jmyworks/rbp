/**
 * Created by michael on 16/7/11.
 */

import React from 'react';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class Metadata extends React.Component {
    constructor() {
        super();
        
        this.state = {type: 1};
    }

    handleChange(event, index, type) {
        this.setState({type});
    }

    render() {
        return (
            <form id="bookMetadata" style={{display: 'inline-block'}}>
                <TextField name="name" hintText="ex. Daily Note" floatingLabelText="Book Name" /><br />
                <TextField name="author" hintText="ex. Great Author" floatingLabelText="Author" /><br />
                <RadioButtonGroup name="type" defaultSelected="radio" style={{maxWidth: '100px', textAlign: 'left', margin: '10px 0'}}>
                    <RadioButton style={{display: 'inline-block'}} value="pdf" label="PDF" />
                    <RadioButton style={{display: 'inline-block'}} value="radio" label="RADIO" />
                </RadioButtonGroup>
                {this.props.children}
            </form>
        );
    }
}

export default Metadata;
