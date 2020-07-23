import React from 'react'

export default function CardDisplay({url}) {
    return (
        <div className="CardDisplay">
            <img src={url} loading='lazy' className='previewImg'></img>
        </div>
    )
}

