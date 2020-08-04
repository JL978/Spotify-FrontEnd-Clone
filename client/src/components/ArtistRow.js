import React from 'react';
import ArtistRowTitle from './ArtistRowTitle'
import TrackList from './TrackList'

const ArtistRow = ({title, display, list}) => {
    return (
        <div>
            <ArtistRowTitle title={title}/>
            {display === 'list' ? <TrackList tracks={list} style='simplify'/>:null}
        </div>
    );
}


export default ArtistRow;
