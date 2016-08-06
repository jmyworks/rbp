/**
 * Created by michael on 16/7/11.
 */

import React from 'react';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import UIActions from '../actions/UIActions';
import utils from '../../common/utils';

var ErrorTip = React.createClass({
    handleRequestClose: function (reason) {
        if (reason === 'timeout') {
            // is there a duration?
            if (this.props.duration !== undefined) {
                this.props.dispatch(UIActions.switchError(false));
            }
        } else if (reason === 'clickaway') {
            // is there an 'action'
            if (this.props.hasAction === true) {
                this.props.dispatch(UIActions.switchError(false));
            }
        }
    },
    handleAction: function () {
        this.props.dispatch(UIActions.switchError(false));
    },
    render: function () {
        var elem = <div></div>;
        if (this.props.error) {
            elem = (<Snackbar
                open={this.props.open}
                message={this.props.error}
                autoHideDuration={this.props.duration}
                onRequestClose={this.handleRequestClose}
                action={this.props.hasAction ? 'Dismiss' : undefined}
                onActionTouchTap={this.handleAction}
            />);
        }

        return elem;
    }
});

function mapStateToProps(state) {
    var error = utils.filterState(state, 'error.message');
    var open = !!error;

    return {open};
}

export default connect(mapStateToProps)(ErrorTip);
