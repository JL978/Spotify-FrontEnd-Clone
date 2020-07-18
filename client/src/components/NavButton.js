import React from 'react'
import Icon from './icons'

export default function NavButton({property}) {
    return (
        <button className='navButton'> 
            <Icon name={property} />
        </button>
    )
}
