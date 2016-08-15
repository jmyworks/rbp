/**
 * Created by michael on 16/8/12.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {inject, observer} from 'mobx-react';
import {extendObservable} from 'mobx';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import AdvancedMetadata from './AdvancedMetadata';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {RadioButtonGroup, RadioButton} from 'material-ui/RadioButton';
import ErrorTip from '../../ErrorTip';
import serialize from 'form-serialize';
import PDF from '../../PDF';
import _ from 'lodash';

@observer
class MouseTracker extends React.Component {
    handling = false;

    constructor(props) {
        super(props);

        extendObservable(this, {
            y: 0
        })
    }

    componentDidMount() {
        var elem = ReactDOM.findDOMNode(this);

        elem.addEventListener('mousemove', (event) => {
            if (this.handling) {
                return;
            }

            this.y = this.computeRelativePosition(event.clientY);
        });

        if (this.props.onAction) {
            elem.addEventListener('click', (event) => {
                if (this.handling) {
                    return;
                }

                this.handling = true;
                this.props.onAction(event.target, this.computeRelativePosition(event.clientY)).lastly(() => this.handling = false);
            });
        }
    }

    computeRelativePosition(y) {
        var elem = ReactDOM.findDOMNode(this);

        var offset = elem.offsetTop;
        var tmp = elem.offsetParent;

        while (tmp)
        {
            offset += tmp.offsetTop;
            tmp = tmp.offsetParent;
        }
        return (y - offset + document.body.scrollTop);
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
                {this.props.children}
                <div style={{borderTop: '3px dashed yellowgreen',
                    position: 'absolute', width: '100%', height: '5px', top: this.y - 10}}></div>
            </div>
        );
    }
}

@observer
class AudioInput extends React.Component {
    pdfOffset = 0;
    pdfCurrentPage = 1;
    pdfScale = 1.0;
    lastAudio;
    lastY = 0;

    constructor(props) {
        super(props);

        extendObservable(this, {
            audioDialogOpen: false
        })
    }

    handlePDFFeedback(page, y, scale) {
        this.pdfCurrentPage = page;
        this.pdfOffset = y;
        this.pdfScale = scale;
    }

    handleAddAudio(target, y) {
        if (target.offsetParent.className === 'page') {
            this.lastY = y;

            return new Promise((resolve, reject) => {
                this.audioDialogOpen = true;
                this.audioDialogResolver = resolve;

                // scroll to last selected
                if (this.lastAudio) {
                    var dialog = ReactDOM.findDOMNode(this.dialogContent);
                    var lastChecked = dialog.querySelector('input[value="' + this.lastAudio + '"]');
                    dialog.parentElement.scrollTop = lastChecked.parentElement.offsetTop - dialog.offsetTop;

                    // and auto check the next sibling
                    lastChecked.parentElement.nextSibling.querySelector('input').dispatchEvent(new MouseEvent('click', {
                        'view': window,
                        'bubbles': true,
                        'cancelable': true
                    }));
                }
            });
        }
        else {
            return Promise.resolve();
        }
    }

    handleAddedAudio(event, value) {
        this.lastAudio = value;
    }

    handleCloseAudioDialog(submit = false) {
        this.audioDialogResolver();
        this.audioDialogOpen = false;

        if (!submit) {
            this.lastAudio = null;
        } else if (this.lastAudio && this.props.onAction) {
            this.props.onAction(this.lastAudio, this.pdfCurrentPage, (this.pdfOffset + this.lastY) / this.pdfScale);
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleCloseAudioDialog.bind(this)}
            />,
            <FlatButton
                label="OK"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleCloseAudioDialog.bind(this, true)}
            />
        ];

        return (
            <div>
                <MouseTracker onAction={this.handleAddAudio.bind(this)}>
                    <PDF file={this.props.pdf.uri} height="1000px" onFeedback={this.handlePDFFeedback.bind(this)} />
                </MouseTracker>
                <Dialog title="Select an auido" actions={actions} modal={false} open={this.audioDialogOpen}
                        onRequestClose={this.handleCloseAudioDialog.bind(this)} autoScrollBodyContent={true}>
                    <RadioButtonGroup ref={(ref) => this.dialogContent = ref} name="audio" onChange={this.handleAddedAudio.bind(this)}>
                        {this.props.audios.map((audio) => <RadioButton key={audio._id} value={audio._id} label={audio.name} />)}
                    </RadioButtonGroup>
                </Dialog>
                {this.props.children}
            </div>
        );
    }
}

@inject('bookStore') @observer
class EditBook extends React.Component {
    inputAudios = {};

    constructor(props) {
        super(props);

        extendObservable(this, {
            book: {},
            step: 0,
            loading: false,
            error: ''
        });

        props.bookStore.getBook(props.id).then((data) => {
            this.book = data;
            this.inputAudios = data.ext.audios ? data.ext.audios : {};
        });
    }

    handleUpdateBook(event) {
        event.preventDefault();

        var form = document.querySelector('#bookMetadata');
        var params = serialize(form, {hash: true});
        params.ext.audios = this.book.ext.audios;

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

    handleSelectAudio(audio, page, offset) {
        this.inputAudios[offset*10] = {page, offset, audio};
    }

    handleBindAudios(event) {
        event.preventDefault();

        this.loading = true;
        this.props.bookStore.updateBook({ext: {...this.book.ext, audios: this.inputAudios}, id: this.book.id})
            .then((data) => {
                this.book = data;
                this.error = '';
                this.step = 2;
            })
            .catch((error) => {
                this.error = error.toString();
            })
            .lastly(() => this.loading = false);
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
                // filter audios
                var pattern = /\.(mp3|mp4)$/i;
                var audios = _.sortBy(this.book.resources.filter((resource) => pattern.test(resource.name)),
                    (o) => o.name.split('\.')[0]);
                var pdf = this.book.resources.find((resource) => resource._id === this.book.ext.questions);

                return (
                    <AudioInput audios={audios} pdf={pdf} onAction={this.handleSelectAudio.bind(this)}>
                        <div  style={{position: 'absolute', top: '0px', width: '100%'}}>
                            {this.loading ?
                                <CircularProgress size={0.5} /> :
                                <RaisedButton label="Next" primary={true} onClick={this.handleBindAudios.bind(this)} />}
                            <ErrorTip error={this.error} hasAction={true} duration={3500} />
                        </div>
                    </AudioInput>
                );
            case 2:
                return (
                    <div>
                        write answers
                    </div>
                );
            default:
                throw Error('unknown step during edit');
        }
    }
}

export default EditBook;
