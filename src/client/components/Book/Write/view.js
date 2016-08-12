/**
 * Created by michael on 16/7/10.
 */

import React from 'react';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import Metadata from './Metadata';
import Resources from './Resources';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Pager from 'material-ui/Paper';
import serialize from 'form-serialize';
import ErrorTip from '../../ErrorTip';
import {inject, observer} from 'mobx-react';
import {observable, action} from 'mobx';

@inject('bookStore') @observer
class Write extends React.Component {
    metadata = {};
    @observable step = 0;
    @observable loading = false;
    @observable error = '';
    resources = [];

    constructor(props) {
        super(props);

        this.handleFileListChange = this.handleFileListChange.bind(this);
        this.handleFileUploaded = this.handleFileUploaded.bind(this);
        this.handleBindResources = this.handleBindResources.bind(this);
        this.handleCreateBook = this.handleCreateBook.bind(this);
    }

    handleFileListChange () {
        this.resources = [];
    }

    handleFileUploaded(file, response) {
        if (response && response.path) {
            this.resources.push({
                name: file.name,
                uri: '/public/upload/' + response.path
            });
        }
    }

    @action handleBindResources (event) {
        event.preventDefault();

        this.loading = true;
        this.props.bookStore.updateBook({id: this.metadata.id, resources: this.resources})
            .then((data) => {
                this.error = '';
                this.step = 2;
            })
            .catch((error) => {
                this.error = error.toString();
            })
            .lastly(() => this.loading = false);
    }

    @action handleCreateBook (event) {
        event.preventDefault();

        var form = document.querySelector('#bookMetadata');
        var params = serialize(form, {hash: true});

        this.loading = true;
        this.props.bookStore.createBook(params)
            .then((data) => {
                this.metadata = data;
                this.error = '';
                this.step = 1;
            })
            .catch((error) => {
                this.error = error.toString();
            })
            .lastly(() => this.loading = false);
    }

    getStepContent () {
        switch (this.step) {
            case 0:
                return (
                    <Metadata>
                        <div style={{width: '256px', margin: '0 auto', textAlign: 'left'}}>
                            {this.loading ?
                                <CircularProgress size={0.5} /> :
                                <RaisedButton label="Next" primary={true} onClick={this.handleCreateBook} />}
                            <ErrorTip error={this.error} hasAction={true} duration={3500} />
                        </div>
                    </Metadata>
                );
            case 1:
                return (
                    <div>
                        <RaisedButton style={{position: 'absolute', right: '0px', marginRight: '10px'}} label="Next" primary={true} onClick={this.handleBindResources} />
                        <Resources onFileUploaded={this.handleFileUploaded} onFileListChange={this.handleFileListChange} />
                        <ErrorTip error={this.error} hasAction={true} duration={3500} />
                    </div>
                );
            case 2:
                return (
                    <Pager zDepth={0} style={{padding: '10px 20px', textAlign: 'center'}}>
                        <h2>Congratulations!</h2>
                        <p>
                            <FlatButton onClick={() => {this.context.router.push('/Book/Edit/' + this.metadata.id); }} secondary={true} label={'「' + this.metadata.name + '」'} /><br/><b>write by <i>{this.metadata.author}</i></b>
                        </p>
                    </Pager>
                );
            default:
                throw Error('unknown step during write');
        }
    }

    render() {
        return (
            <div>
                <Stepper activeStep={this.step}>
                    <Step>
                        <StepLabel>Metadata</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Resources</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Complete</StepLabel>
                    </Step>
                </Stepper>
                <div style={{margin: '0 auto', width: '90%', position: 'relative', textAlign: 'center'}}>
                    {this.getStepContent()}
                </div>
                {this.props.children}
            </div>
        );
    }
}

Write.wrappedComponent.contextTypes = {
    router: React.PropTypes.object
};

export default Write;
