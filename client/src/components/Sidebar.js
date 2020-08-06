import React, { Component } from 'react';
import Logo from './sidebar-components/Logo.js'
import NavList from './sidebar-components/NavList.js'
import PlayLists from './sidebar-components/PlayLists.js'
import ReactToolTip from 'react-tooltip'
import generateContent from '../utilities/TipContent'
// import InstallCTA from './sidebar-components/InstallCTA.js'

//The main sticky left-hand side bar in the app
class Sidebar extends Component {
    render() {
        return (
            <>
            <div className="sidebar">
                <Logo />
                <NavList />
                <PlayLists />
                {/* <InstallCTA /> */}
            </div>
            <ReactToolTip className='toolTip' id='tooltip' place='right' effect='solid' globalEventOff='click' backgroundColor= '#2e77d0' getContent={dataTip => generateContent(dataTip)} clickable={true}/>
            </>
        );
    }
}

export default Sidebar;
