import React, { Component } from 'react';
import Icon from './icons'

class CreatePlaylist extends Component {
    render() {
        return (
            <button className="create-button">
                <div className="playlist-icon">
                    <Icon name='Create' viewBox='0 0 36 36'/>
                </div>
                <span className="featured-label">Create Playlist</span>
            </button>
        );
    }
}

export default CreatePlaylist;
