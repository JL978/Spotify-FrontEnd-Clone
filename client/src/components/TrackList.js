import React from 'react'
import TrackListItem from './TrackListItem'

const TrackList = React.forwardRef(({tracks, style, highlight}, ref) => {
    console.log(highlight)

    return (
        <div className="trackListContainer">
            <ol className="trackList">
                {tracks.map((track, index) => {
                    if (index+1 < tracks.length){
                        return <TrackListItem track={track} key={track.id} style={style} highlight={track.id === highlight}/>
                    }else{
                        return <TrackListItem ref={ref} track={track} key={track.id} style={style} highlight={track.id === highlight}/>
                    }
                })}
            </ol>
        </div>
    )
})


export default TrackList