import React from 'react'
import PlayCard from './PlayCard'
import RowTitle from './RowTitle'
import RowGrid from './RowGrid'

export default function CollectionRow({name, playlists, id}) {
    return (
        <div className="CollectionRow">
            <RowTitle title={name} id={id}/>
            <RowGrid playlists={playlists}/>
        </div>
    )
}
