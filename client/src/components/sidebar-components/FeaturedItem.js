import React, { Component } from 'react';
import Icon from '../icons'


//Could have been the same as a nav item but the styling is a little different so I'll leave it as a separate component
class FeaturedItem extends Component {
    render() {
        return (
            <div className='featured-item'>
                <a href="#" className='featured-item-link'>
                    <div className="playlist-icon">
                        <Icon name='Like' width='16px' height='16px' viewBox='0 -28 512 512'/>
                    </div>
                    <span className="featured-label">{this.props.label}</span>
                </a>
            </div>
        );
    }
}

export default FeaturedItem;
