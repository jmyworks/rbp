/**
 * Created by michael on 16/7/10.
 */

import React from 'react';
import {connect} from 'react-redux';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import Metadata from './components/Metadata';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import BookActions from '../../../actions/BookActions';
import serialize from 'form-serialize';
import ErrorTip from '../../ErrorTip';
import utils from '../../../utils/utils';
import Uploader from '../../Uploader';
import _ from 'lodash';


var Write = React.createClass({
    getInitialState: function () {
        return {loading: false, step: 0};
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.error) {
            this.setState({loading: false});
            return;
        }

        if (nextProps.id && this.state.loading) {
            this.setState({loading: false, step: this.state.step + 1});
        }
    },
    handleFiles: function (filesByExt) {
        var pdf = _.flatten(_.values(_.pick(filesByExt, 'pdf')));
        var image = _.flatten(_.values(_.pick(filesByExt, ['png', 'jpg'])));
        var audio = _.flatten(_.values(_.pick(filesByExt, ['mp3', 'mp4'])));

        return {pdf, image, audio};
    },
    handleUpload: function () {
        document.querySelector('.uploader').click();
    },
    getStepContent: function(step) {
        switch (step) {
            case 0:
                return (
                    <Metadata>
                        <div style={{width: '256px', margin: '0 auto', textAlign: 'left'}}>
                            {this.state.loading ?
                                <CircularProgress size="0.5" /> :
                                <RaisedButton label="Next" primary={true} onClick={this.handleCreateBook} />}
                            <ErrorTip error={this.props.error} hasAction={true} duration={3500} />
                        </div>
                    </Metadata>
                );
            case 1:
                return (
                    <Uploader style={{maxWidth: '90%'}}
                              accept="application/pdf,audio/mpeg,audio/mp4"
                              filter=".pdf,.mp3,.mp4,.png,.jpg"
                              handleFiles={this.handleFiles}
                    />
                );
            case 2:
                return 'complete';
            default:
                throw Error('unknown step during write');
        }
    },
    handleCreateBook: function(event) {
        event.preventDefault();

        var form = document.querySelector('#bookMetadata');
        var params = serialize(form, {hash: true});

        this.setState({'loading': true});
        this.props.dispatch(BookActions.createBook(params));
    },
    render: function() {
        var step = this.state.step;

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
                <div>
                    <p>{this.getStepContent(step)}</p>
                </div>
                {this.props.children}
            </div>
        );
    }
});

function mapStateToProps(state) {
    var error = utils.filterState(state, 'error.message');
    var id = utils.filterState(state, 'book.createdBook.id');

    return {error, id};
}

export default connect(mapStateToProps)(Write);
