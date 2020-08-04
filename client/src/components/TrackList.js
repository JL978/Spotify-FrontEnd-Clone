import React from 'react'
import TrackListItem from './TrackListItem'

const TrackList = React.forwardRef(({tracks, style}, ref) => {
    return (
        <div className="trackListContainer">
            <ol className="trackList">
                {tracks.map((track, index) => {
                    if (index+1 < tracks.length){
                        return <TrackListItem track={track} key={track.id} style={style}/>
                    }else{
                        return <TrackListItem ref={ref} track={track} key={track.id} style={style}/>
                    }
                })}
            </ol>
        </div>
    )
})


export default TrackList