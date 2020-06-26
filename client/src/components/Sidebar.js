import React, { Component } from 'react';
import Logo from './Logo.js'
import NavList from './NavList.js'
import PlayLists from './PlayLists.js'
import InstallCTA from './InstallCTA.js'

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <Logo />
                <NavList />
                <PlayLists />
                <InstallCTA />
            </div>
        );
    }
}

export default Sidebar;
