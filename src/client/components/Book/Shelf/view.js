/**
 * Created by michael on 16/7/10.
 */

import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import utils from '../../../../common/utils';
import BookActions from '../../../actions/BookActions';

var BookItem = React.createClass({
    render: function () {
        return (
            <li>
                {this.props.name} by {this.props.author}
                <ul>{_.map(this.props.resources, (v) => (<li>{v.uri}</li>))}</ul>
            </li>
        );
    }
});

var Shelf = React.createClass({
    componentDidMount() {
        this.props.dispatch(BookActions.getBooks());
    },
    handleDeleteBook() {

    },
    render: function () {
        if (!this.props.list) {
            return <ul></ul>;
        }

        return (
            <ul>
                {_.map(this.props.list, (item) => {
                    return (<BookItem key={item.id} id={item.id} name={item.name} author={item.author} resources={item.resources}
                                      handleDeleteThread={this.handleDeleteBook.bind(this, item.id)} />);
                })}
            </ul>
        );
    }
});

function mapStateToProps(state) {
    var books = utils.filterState(state, 'book.shelf.books', []);

    return {list: books};
}

export default connect(mapStateToProps)(Shelf);
