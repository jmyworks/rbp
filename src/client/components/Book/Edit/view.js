/**
 * Created by michael on 16/8/12.
 */

import React from 'react';
import {inject, observer} from 'mobx-react';
import {observable} from 'mobx';

@inject('bookStore') @observer
class Edit extends React.Component {
    @observable book = {};

    constructor(props) {
        super(props);

        this.props.bookStore.getBook(this.props.params.id).then((data) => this.book = data);
    }

    render() {
        return (
            <div>{this.book.name}</div>
        );
    }
}

export default Edit;
