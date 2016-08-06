/**
 * Created by michael on 16/7/10.
 */

import React from 'react';
import {connect} from 'react-redux';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import Metadata from './Metadata';
import Resources from './Resources';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Pager from 'material-ui/Paper';
//import Badge from 'material-ui/Badge';

import BookActions from '../../../actions/BookActions';
import UIActions from '../../../actions/UIActions';
import serialize from 'form-serialize';
import ErrorTip from '../../ErrorTip';
import utils from '../../../../common/utils';

var Write = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getDefaultProps: function () {
        return {step: 0};
    },
    componentDidMount: function () {
        this.resources = [];
    },
    handleFileListChange: function () {
        this.resources = [];
    },
    handleFileUploaded: function (file, response) {
        if (response && response.path) {
            this.resources.push({uri: '/public/upload/' + response.path});
        }
    },
    handleBindResources: function (event) {
        event.preventDefault();

        console.log(this.resources);

        this.props.dispatch(UIActions.setState('book.write', {'loading': true}));
        this.props.dispatch(BookActions.updateBook({id: this.props.metadata.id, resources: this.resources,
            requestCallback: (successed) => {return {'book.write.step': successed ? 2 : 1, 'book.write.loading': false}; }}));
    },
    getStepContent: function(step) {
        switch (step) {
            case 0:
                return (
                    <Metadata>
                        <div style={{width: '256px', margin: '0 auto', textAlign: 'left'}}>
                            {this.props.loading ?
                                <CircularProgress size="0.5" /> :
                                <RaisedButton label="Next" primary={true} onClick={this.handleCreateBook} />}
                            <ErrorTip error={this.props.error} hasAction={true} duration={3500} />
                        </div>
                    </Metadata>
                );
            case 1:
                return (
                    <div>
                        <RaisedButton style={{position: 'absolute', right: '0px', marginRight: '10px'}} label="Next" primary={true} onClick={this.handleBindResources} />
                        <Resources onFileUploaded={this.handleFileUploaded} onFileListChange={this.handleFileListChange} />
                        <ErrorTip error={this.props.error} hasAction={true} duration={3500} />
                    </div>
                );
            case 2:
                return (
                    <Pager zDepth={0} style={{padding: '10px 20px', textAlign: 'center'}}>
                        <h2>Congratulations!</h2>
                        <p>
                            <FlatButton onClick={() => {this.context.router.push('/Book/Edit/' + this.props.metadata.id); }} secondary={true} label={'「' + this.props.metadata.name + '」'} /><br/><b>write by <i>{this.props.metadata.author}</i></b>
                        </p>
                    </Pager>
                );
            default:
                throw Error('unknown step during write');
        }
    },
    handleCreateBook: function(event) {
        event.preventDefault();

        var form = document.querySelector('#bookMetadata');
        var params = serialize(form, {hash: true});

        this.props.dispatch(UIActions.setState('book.write', {'loading': true}));
        this.props.dispatch(BookActions.createBook({...params,
            requestCallback: (successed) => {return {'book.write.step': successed ? 1 : 0, 'book.write.loading': false}; }}));
    },
    render: function() {
        var step = this.props.step;

        return (
            <div>
                <Stepper activeStep={step}>
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
                    {this.getStepContent(step)}
                </div>
                {this.props.children}
            </div>
        );
    }
});

function mapStateToProps(state) {
    var error = utils.filterState(state, 'error.message');
    var metadata = utils.filterState(state, 'book.metadata');
    var step = utils.filterState(state, 'book.write.step');

    return {error, metadata, step};
}

export default connect(mapStateToProps)(Write);
