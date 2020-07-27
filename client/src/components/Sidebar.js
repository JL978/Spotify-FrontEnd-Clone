import React, { Component } from 'react';
import Logo from './sidebar-components/Logo.js'
import NavList from './sidebar-components/NavList.js'
import PlayLists from './sidebar-components/PlayLists.js'
// import InstallCTA from './sidebar-components/InstallCTA.js'

//The main sticky left-hand side bar in the app
class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <Logo />
                <NavList />
                <PlayLists />
                {/* <InstallCTA /> */}
            </div>
        );
    }
}

export default Sidebar;
