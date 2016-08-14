/**
 * Created by michael on 16/8/12.
 */

import React from 'react';
import {inject, observer} from 'mobx-react';
import {observable} from 'mobx';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import AdvancedMetadata from './AdvancedMetadata';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ErrorTip from '../../ErrorTip';
import serialize from 'form-serialize';
import PDF from '../../PDF';

@inject('bookStore') @observer
class EditBook extends React.Component {
    @observable book = {};
    @observable step = 0;
    @observable loading = false;
    @observable error = '';
    audios = [];

    constructor(props) {
        super(props);

        this.props.bookStore.getBook(props.id).then((data) => this.book = data);
    }

    handleUpdateBook(event) {
        event.preventDefault();

        var form = document.querySelector('#bookMetadata');
        var params = serialize(form, {hash: true});

        this.loading = true;
        this.props.bookStore.updateBook({...params, id: this.book.id})
            .then((data) => {
                this.book = data;
                this.error = '';
                this.step = 1;
            })
            .catch((error) => {
                this.error = error.toString();
            })
            .lastly(() => this.loading = false);
    }

    handleBindAudios(event) {
        event.preventDefault();
    }

    render() {
        if (!this.book.id) {
            return <div></div>;
        }

        return (
            <div>
                <Stepper activeStep={this.step}>
                    <Step>
                        <StepLabel>Information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Audio Input</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Write Answers</StepLabel>
                    </Step>
                </Stepper>
                <div style={{margin: '0 auto', width: '90%', position: 'relative', textAlign: 'center'}}>
                    {this.getStepContent()}
                </div>
                {this.props.children}
            </div>
        );
    }

    getStepContent () {
        switch (this.step) {
            case 0:
                return (
                    <AdvancedMetadata book={this.book}>
                        <div style={{width: '256px', margin: '0 auto', textAlign: 'left'}}>
                            {this.loading ?
                                <CircularProgress size={0.5} /> :
                                <RaisedButton label="Next" primary={true} onClick={this.handleUpdateBook.bind(this)} />}
                            <ErrorTip error={this.error} hasAction={true} duration={3500} />
                        </div>
                    </AdvancedMetadata>
                );
            case 1:
                var pdf = this.book.resources.find((resource) => resource._id === this.book.ext.questions);
                return (
                    <div>
                        {this.loading ?
                            <CircularProgress size={0.5} /> :
                            <RaisedButton label="Next" primary={true} onClick={this.handleBindAudios.bind(this)} />}
                        <PDF file={pdf.uri} />
                    </div>
                );
            case 2:
                return (
                    <div>
                        write answers
                    </div>
                );
            default:
                throw Error('unknown step during write');
        }
    }
}

export default EditBook;
