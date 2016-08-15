/**
 * Created by michael on 16/7/11.
 */

import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import {observer} from 'mobx-react';
import {extendObservable} from 'mobx';

@observer
class ErrorTip extends React.Component {
    constructor(props) {
        super(props);

        extendObservable(this, {
            showError: false
        });

        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            console.log(nextProps.error);
            this.showError = true;
        }
    }

    handleRequestClose(reason) {
        if (reason === 'timeout') {
            // is there a duration?
            if (this.props.duration !== undefined) {
                this.showError = false;
            }
        } else if (reason === 'clickaway') {
            // is there an 'action'
            if (this.props.hasAction === true) {
                this.showError = false;
            }
        }
    }

    handleAction() {
        this.showError = false;
    }

    render() {
        var elem = <div></div>;
        if (this.props.error) {
            elem = (<Snackbar
                open={this.showError}
                message={this.props.error}
                autoHideDuration={this.props.duration}
                onRequestClose={this.handleRequestClose}
                action={this.props.hasAction ? 'Dismiss' : undefined}
                onActionTouchTap={this.handleAction}
            />);
        }

        return elem;
    }
}

export default ErrorTip;
