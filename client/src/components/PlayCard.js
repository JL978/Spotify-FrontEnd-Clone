import React from 'react'
import CardInfo from './CardInfo'
import CardDisplay from './CardDisplay'


export default function PlayCard() {
    return (
        <div className="PlayCard">
            <CardDisplay />
            <CardInfo title='Liked Songs' description='Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci v'/>
        </div>
    )
}
