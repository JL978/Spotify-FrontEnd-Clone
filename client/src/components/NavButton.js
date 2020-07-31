import React from 'react'
import Icon from './icons'

export default function NavButton({property}) {
    return (
        <button className={property === 'Back'? 'navButton no-outline':'navButton mediaNone no-outline'}> 
            <Icon name={property} />
        </button>
    )
}
