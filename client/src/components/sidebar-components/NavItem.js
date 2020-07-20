import React, { Component } from 'react';
import Icon from '../icons'
import {NavLink} from 'react-router-dom'

//The list item within the main NavList 


class NavItem extends Component {
    render() {
        return (
            <li className='NavItem'>
                <NavLink exact to={this.props.to} className='nav-link' activeClassName='activeMainNav'>
                    <div className="nav-icon">
                        <Icon name={this.props.name} />
                    </div>
                    <span>{this.props.label}</span>
                </NavLink>
            </li>
        );
    }
}

export default NavItem;
