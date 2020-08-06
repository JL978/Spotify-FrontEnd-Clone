import React, { Component } from 'react';
import CreatePLaylist from './CreatePlaylist.js'
import FeaturedItem from './FeaturedItem.js'


//Featured playlist containing 2 main components - the button to make a new playlist and a featured item (the liked songs playlist)
class FeaturedPlaylist extends Component {
    render() {
        return (
            <>
            <div className="featured-playlists">
                <CreatePLaylist />
                <FeaturedItem label='Liked Songs'/>
            </div>
            </>
        );
    }
}


export default FeaturedPlaylist;
