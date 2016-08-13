/**
 * Created by michael on 16/7/10.
 */

import React from 'react';
import CreateBook from './CreateBook';
import EditBook from './EditBook';

class Write extends React.Component {
    render() {
        if (this.props.params.id) {
            return <EditBook id={this.props.params.id} />;
        }

        return <CreateBook />;
    }
}

export default Write;
