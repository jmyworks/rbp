/**
 * Created by michael on 16/7/10.
 */

import React from 'react';
import {inject, observer} from 'mobx-react';

class BookItem extends React.Component {
    render() {
        return (
            <li>
                {this.props.type}<br />
                {this.props.name} by {this.props.author}
                <ul>{this.props.resources.map((v) => (<li key={v._id}>{v.name} {v.uri}</li>))}</ul>
            </li>
        );
    }
}

@inject('bookStore') @observer
class Shelf extends React.Component {
    componentDidMount() {
    }

    handleDeleteBook() {

    }

    render() {
        if (this.props.bookStore.books.size === 0) {
            return <ul></ul>;
        }

        return (
            <ul>
                {Array.from(this.props.bookStore.books.values()).map((item) => {
                    return (<BookItem key={item.id} id={item.id} name={item.name} author={item.author}
                                      resources={item.resources} type={item.type}
                                      handleDeleteThread={this.handleDeleteBook.bind(this, item.id)} />);
                })}
            </ul>
        );
    }
}

export default Shelf;
