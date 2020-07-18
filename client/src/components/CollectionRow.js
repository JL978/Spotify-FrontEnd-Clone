import React from 'react'
import PlayCard from './PlayCard'
import RowTitle from './RowTitle'
import RowGrid from './RowGrid'

export default function CollectionRow() {
    return (
        <div className="CollectionRow">
            <RowTitle title="Uniquely yours"/>
            <RowGrid />
        </div>
    )
}
