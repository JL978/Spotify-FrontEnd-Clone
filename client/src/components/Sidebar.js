import React, { Component } from 'react';
import Logo from './Logo.js'
import NavList from './NavList.js'
import PlayLists from './PlayLists.js'

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <Logo />
                <NavList />
                <PlayLists />
            </div>
        );
    }
}

export default Sidebar;
