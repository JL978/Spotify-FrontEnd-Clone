import React, { Component } from 'react';
import CreatePLaylist from './CreatePlaylist.js'
import FeaturedItem from './FeaturedItem.js'


class FeaturedPlaylist extends Component {
    render() {
        return (
            <div className="featured-playlists">
                <CreatePLaylist />
                <FeaturedItem label='Liked Songs'/>
            </div>
        );
    }
}

export default FeaturedPlaylist;
