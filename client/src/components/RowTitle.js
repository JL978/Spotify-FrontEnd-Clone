import React from 'react'

export default function RowTitle({title}) {
    return (
        <div className="RowTitle">
            <h1 style={{fontSize:'24px',
                        lineHeight:'28px',
                        letterSpacing: '-0.04em',
                        fontWeight: '700',
                        color:'white'}}>{title}</h1>
            <a href='/' style={{fontSize: '12px',
                                textTransform: 'uppercase',
                                fontWeight:'700',
                                lineHeight: '16px',
                                letterSpacing:'.1em',
                                textDecoration: 'none',
                                color:'#b3b3b3'}}>see all</a>
        </div>
    )
}
