import React, { useState } from 'react';
import Icon from '../icons'
import {NavLink} from 'react-router-dom'

//Could have been the same as a nav item but the styling is a little different so I'll leave it as a separate component

const FeaturedItem = ({label, loggedIn}) => {
    return (
        <div className='featured-item' style={{cursor: 'pointer'}} data-tip='list' data-for='tooltip' data-event='click'>
            <NavLink exact to="/collection/tracks" className='featured-item-link' style={{ pointerEvents: loggedIn? 'auto':'none'}}>
                <div className="playlist-icon">
                    <Icon name='Like' />
                </div>
                <span className="featured-label">{label}</span>
            </NavLink>
        </div>
    );
}

export default FeaturedItem;

