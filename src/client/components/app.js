import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

injectTapEventPlugin();

var App = React.createClass({
    getChildContext() {
        return {muiTheme: getMuiTheme()};
    },
    render: function() {
        return (
            <div id="app">
                <Header />
                <div id="content">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
});

App.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

export default App;
