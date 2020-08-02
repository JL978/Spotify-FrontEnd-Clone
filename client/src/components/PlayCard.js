import React from 'react'
import CardInfo from './CardInfo'
import CardDisplay from './CardDisplay'
import {Link} from 'react-router-dom'

const PlayCard = React.forwardRef(({info, type}, ref) => {
    const description = returnDescription(type, info)
    const {name, id} = info

    let images
    if (type === 'track'){
        images = info.album.images
    }else{
        images = info.images
    }
    let image_url
    try{
        image_url = images[0].url
    }catch{
        image_url = null 
    }
    
    return (
        <Link to={type === 'track'? `/album/${info.album.id}?highlight=${id}`:`/${type}/${id}`} style={{textDecoration:'none', color:'var(--main-text)'}}>
            <div ref={ref} className="PlayCard">
                <CardDisplay url={image_url} type={type}/>
                <CardInfo title={name} description={description}/>
            </div>
        </Link>
    )
})


function returnDescription(type, info){
    let artists
    switch (type){
        case 'playlist':
           return info.description || `By ${info.owner.display_name}`
        case 'album':
            artists = info.artists.map((object) => object.name)
            return artists.length === 1 ? artists[0]:artists.join(', ')
        case 'artist':
            return 'artist'
        case 'track':
            artists = info.artists.map((object) => object.name)
            return artists.length === 1 ? artists[0]:artists.join(', ')
        default:
            return null
    }
}


export default PlayCard