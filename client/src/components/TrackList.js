import React from 'react'
import TrackListItem from './TrackListItem'

export default function TrackList({tracks, lastRef}) {
    return (
        <div className="trackListContainer">
            <ol className="trackList">
                {tracks.items.map((track, index) => {
                    // if (index+1 < tracks.items.length){
                        return <TrackListItem track={track.track} key={track.track.id}/>
                    // }else{
                    //     return <TrackListItem lastRef={lastRef} track={track.track} key={track.track.id}/>
                    // }
                })}
            </ol>
        </div>
    )
}
