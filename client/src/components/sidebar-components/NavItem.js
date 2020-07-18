import React, { Component } from 'react';
import Icon from '../icons'

//The list item within the main NavList 

class NavItem extends Component {
    render() {
        return (
            <li className='NavItem'>
                <a href="#" className='nav-link'>
                    <div className="nav-icon">
                        <Icon {...this.props} />
                    </div>
                    <span>{this.props.label}</span>
                </a>
            </li>
        );
    }
}

export default NavItem;