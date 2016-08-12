import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';

class App extends React.Component {
    render() {
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
}

export default App;
