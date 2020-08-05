import React, { Component } from 'react';
import CreatePLaylist from './CreatePlaylist.js'
import FeaturedItem from './FeaturedItem.js'
import PromptButton from '../PromptButton'
import ReactToolTip from 'react-tooltip'
//Featured playlist containing 2 main components - the button to make a new playlist and a featured item (the liked songs playlist)
class FeaturedPlaylist extends Component {
    render() {
        return (
            <>
            <div className="featured-playlists">
                <CreatePLaylist />
                <FeaturedItem label='Liked Songs'/>
            </div>
            <ReactToolTip className='toolTip' id='tooltip' place='right' effect='solid'  backgroundColor= '#2e77d0' getContent={dataTip => generateContent(dataTip)} clickable={true}/>
            </>
        );
    }
}

function generateContent(dataTip){
    switch(dataTip){
        case 'create':
            return <TipContent title='Create a playlist' tip='Log in to create and share playlists'/>
        case 'list':
            return <TipContent title='Enjoy your Liked Songs' tip="Log in to see all the songs you've liked in one easy playlist."/>
        default:
            return null
    }
}

function TipContent({title, tip}){
    return (
        <div className="tipContent">
            <h2>{title}</h2>
            <h3>{tip}</h3>
            <div className="tipOptions">
                <PromptButton name='Not Now' styleName='dark' onClick={() => ReactToolTip.hide()}/>
                <PromptButton name='Log In' styleName='light'/>
            </div>
        </div>
    )
}

export default FeaturedPlaylist;
