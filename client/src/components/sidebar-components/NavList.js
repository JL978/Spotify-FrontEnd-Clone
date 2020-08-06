import React, { useState } from 'react';
import NavItem from './NavItem.js'

//The component that is immediately below the spotify logo
//This is the main nav link list with 3 items - Home, Search and Library

const NavList = () => {
    const [loggedIn, useloggedIn] = useState(false)

    return (
        <ul className="nav-list">
            <NavItem to='/' name='Home' label='Home' />
            <NavItem to='/search' name='Search' label='Search' />
            <NavItem to='/collection' name='Library' label='Your Library' data_tip='library' data_for='tooltip' data_event='click' style={{ pointerEvents: loggedIn? 'auto':'none'}}/>
        </ul>
    );
}

export default NavList;
