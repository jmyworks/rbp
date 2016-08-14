/**
 * Created by michael on 16/7/10.
 */

import React from 'react';
import {inject, observer} from 'mobx-react';
import {GridList, GridTile} from 'material-ui/GridList';
import {Link} from 'react-router';

class BookItem extends React.Component {
    render() {
        return (
            <GridTile title={<Link to={'/Book/Write/' + this.props.id}>{this.props.name}</Link>}
                      subtitle={'by ' + this.props.author}>
                <ul>{this.props.resources.map((v) => (<li key={v._id}>{v.name} {v.uri}</li>))}</ul>
            </GridTile>
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
            <GridList>
                {Array.from(this.props.bookStore.books.values()).map((item) => {
                    return (<BookItem key={item.id} id={item.id} name={item.name} author={item.author}
                                      resources={item.resources} type={item.type}
                                      handleDeleteThread={this.handleDeleteBook.bind(this, item.id)} />);
                })}
            </GridList>
        );
    }
}

export default Shelf;
