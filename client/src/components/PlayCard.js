import React from 'react'
import CardInfo from './CardInfo'
import CardDisplay from './CardDisplay'
import {Link} from 'react-router-dom'

export default function PlayCard({info}) {
    const {description, name, images, id} = info
    const image_url = images[0].url
    return (
        <Link to={`/playlist/${id}`} style={{textDecoration:'none', color:'var(--main-text)'}}>
            <div className="PlayCard">
                <CardDisplay url={image_url}/>
                <CardInfo title={name} description={description}/>
            </div>
        </Link>
    )
}
