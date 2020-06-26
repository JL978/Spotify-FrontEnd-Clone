import React, { Component } from 'react';
import NavItem from './NavItem.js'

//The component that is immediately below the spotify logo
//This is the main nav link list with 3 items - Home, Search and Library

class NavList extends Component {
    render() {
        return (
            <ul className="nav-list">
                <NavItem name='Home' label='Home' width='24' height= '24' viewBox='0 0 512 512'/>
                <NavItem name='Search' label='Search' width='24' height= '24' viewBox='0 0 512 512'/>
                <NavItem name='Library' label='Your Library' width='24' height= '24' viewBox='0 0 512 512'/>
            </ul>
        );
    }
}

export default NavList;
