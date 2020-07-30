import React from 'react'
import TrackListItem from './TrackListItem'

const TrackList = React.forwardRef(({tracks}, ref) => {
    return (
        <div className="trackListContainer">
            <ol className="trackList">
                {tracks.map((track, index) => {
                    console.log(tracks)
                    if (index+1 < tracks.length){
                        return <TrackListItem track={track.track} key={track.track.id}/>
                    }else{
                        return <TrackListItem ref={ref} track={track.track} key={track.track.id}/>
                    }
                })}
            </ol>
        </div>
    )
})


export default TrackList