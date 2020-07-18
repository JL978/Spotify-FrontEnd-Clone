import React, { Component } from 'react';
import FeaturedPlaylist from './FeaturedPlaylist.js'
import OtherPlaylist from './OtherPlaylist.js'

//Playlists components - contain 2 other main component - the featured playlist link (with icons) and the other playlist (just the links)
class PlayLists extends Component {
    render() {
        return (
            <div className='playlists'>
                <h1 className='play-title'>playlists</h1>
                <FeaturedPlaylist />
                <hr className="list-separator"/>
                {/* <OtherPlaylist /> */}
            </div>
        );
    }
}

export default PlayLists;
