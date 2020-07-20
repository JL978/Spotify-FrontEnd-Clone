import React from 'react'
import Icon from './icons'

export default function NavButton({property}) {
    return (
        <button className={property === 'Back'? 'navButton':'navButton mediaNone'}> 
            <Icon name={property} />
        </button>
    )
}
