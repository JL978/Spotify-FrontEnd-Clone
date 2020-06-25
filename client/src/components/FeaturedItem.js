import React, { Component } from 'react';
import Icon from './icons'

class FeaturedItem extends Component {
    render() {
        return (
            <div className='featured-item'>
                <a href="#">
                    <div className="play-icon">
                        <Icon name='Like'/>
                    </div>
                    <span className="featured-label">{this.props.label}</span>
                </a>
            </div>
        );
    }
}

export default FeaturedItem;
