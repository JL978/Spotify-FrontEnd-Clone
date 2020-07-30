import React from 'react'
import PlayCard from './PlayCard'

export default function RowGrid({playlists}) {
    return (
        <div className="RowGrid">
            {playlists.map((playlist) => {
                if (playlist){
                    return <PlayCard key={playlist.id} info={playlist} type={playlist.type}/> 
                }else{
                    return null
                }
            })}
        </div>
    )
}
