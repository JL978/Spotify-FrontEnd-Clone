import React, { Component } from 'react';
import Icon from './icons'

class CreatePlaylist extends Component {
    render() {
        return (
            <button className="create-button">
                <div className="play-icon">
                    <Icon name='Create' viewBox='0 0 36 36'/>
                </div>
                <span className="featured-label">Create PlayList</span>
            </button>
        );
    }
}

export default CreatePlaylist;
