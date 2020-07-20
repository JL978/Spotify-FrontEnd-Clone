import Home from './Home.js'
import Search from './Search.js'
import Library from './Library.js'
import Create from './Create.js'
import Like from './Like.js'
import Install from './Install.js'
import Back from './Back.js'
import Forward from './Forward.js'
import NSearch from './NSearch'

import React from 'react'

export default function Icon(props) {
    switch (props.name) {
        case 'Home':
            return <Home />
        case 'Search':
            return <Search />
        case 'Library':
            return <Library />
        case 'Create':
            return <Create />
        case 'Like':
            return <Like {...props}/>
        case 'Install':
            return <Install {...props}/>
        case 'Back':
            return <Back />
        case 'Forward':
            return <Forward />
        case 'N-Search':
            return <NSearch />
        default:
            return null
    }
}
