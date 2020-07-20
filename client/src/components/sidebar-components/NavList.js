import React, { Component } from 'react';
import NavItem from './NavItem.js'

//The component that is immediately below the spotify logo
//This is the main nav link list with 3 items - Home, Search and Library

class NavList extends Component {
    render() {
        return (
            <ul className="nav-list">
                <NavItem to='/' name='Home' label='Home' />
                <NavItem to='/search' name='Search' label='Search' />
                <NavItem to='/collection' name='Library' label='Your Library' />
            </ul>
        );
    }
}

export default NavList;
