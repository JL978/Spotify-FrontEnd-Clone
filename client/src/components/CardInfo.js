import React from 'react'

export default function CardInfo({title, description}) {
    return (
        <div className="CardInfo">
            <h2 style={{fontSize: '16px',
                        fontWeight: '700',
                        lineHeight: '24px',
                        letterSpacing: 'normal',
                        textTransform: 'none',
                        textOverflow: 'ellipsis',
                        overflow:'hidden',
                        color:'white',
                        whiteSpace: 'nowrap'}}>{title}</h2>
            <p style={{
                fontSize: '11px',
                fontWeight: '400',
                lineHeight: '16px',
                letterSpacing: 'normal',
                textTransform: 'none',
                textOverflow: 'ellipsis',
                overflow:'hidden',
                marginTop: '4px',
                whiteSpace: 'normal',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical'
            }}>{description}</p>
        </div>
    )
}
