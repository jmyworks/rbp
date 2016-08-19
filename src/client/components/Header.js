/*
 * React Ready (https://github.com/michaelchiang/react-ready)
 * Copyright (c) 2015 Michael Chiang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

class Header extends React.Component {
    render() {
        return (
            <AppBar title="" showMenuIconButton={false} style={{flexWrap: 'wrap'}}
                    titleStyle={{height: '48px', lineHeight: '48px'}}>
                <Tabs style={{width: '30%'}}>
                    <Tab label="Home" onActive={() => {this.context.router.push('/'); }}/>
                    <Tab label="Book" onActive={() => {this.context.router.push('/Book'); }}/>
                    <Tab label="About" onActive={() => {this.context.router.push('/About'); }}/>
                </Tabs>
            </AppBar>
        );
    }
}

Header.contextTypes = {
    router: React.PropTypes.object
};

export default Header;
