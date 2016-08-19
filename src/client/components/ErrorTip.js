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
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.showError = true;
        }
    }

    handleRequestClose(reason) {
        if (this.props.onClose) {
            this.props.onClose();
        }

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
        if (this.props.onClose) {
            this.props.onClose();
        }
        
        this.showError = false;
    }

    render() {
        var elem = <div></div>;
        if (this.props.error) {
            elem = (<Snackbar
                open={this.showError}
                message={this.props.error}
                autoHideDuration={this.props.duration}
                onRequestClose={this.handleRequestClose.bind(this)}
                action={this.props.hasAction ? 'Dismiss' : undefined}
                onActionTouchTap={this.handleAction.bind(this)}
            />);
        }

        return elem;
    }
}

export default ErrorTip;
