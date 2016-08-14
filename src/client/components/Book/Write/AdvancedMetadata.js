/**
 * Created by michael on 16/8/13.
 */

import React from 'react';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class AdvancedMetadata extends React.Component {
    questionBooks = [];

    constructor(props) {
        super(props);


        if (this.props.book.ext.questions) {
            this.questionBooks = props.book.resources.filter((resource) => resource._id === this.props.book.ext.questions);
        } else {
            var pattern = new RegExp('\\.pdf$', 'i');
            this.questionBooks = props.book.resources.filter((resource) => pattern.test(resource.uri));
        }
    }

    render() {
        return (
            <form id="bookMetadata" style={{display: 'inline-block'}}>
                <TextField name="name" floatingLabelText="Book Name" floatingLabelFixed={true}
                           hintText={this.props.book.name} defaultValue={this.props.book.name} /><br />
                <TextField name="author" floatingLabelText="Author" floatingLabelFixed={true}
                           hintText={this.props.book.author} defaultValue={this.props.book.author} /><br />
                <RadioButtonGroup name="ext[questions]"
                                  style={{maxWidth: '100px', textAlign: 'left', margin: '10px 0'}}
                                  defaultSelected={this.props.book.ext.questions}>
                    {this.questionBooks.map((resource) =>
                        <RadioButton key={resource._id} style={{display: 'inline-block'}}
                                     value={resource._id} label={resource.name} />)}
                </RadioButtonGroup>
                {this.props.children}
            </form>
        );
    }
}

export default AdvancedMetadata;
