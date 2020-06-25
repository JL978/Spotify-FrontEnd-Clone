import Home from './Home.js'
import Search from './Search.js'
import Library from './Library.js'
import Create from './Create.js'
import Like from './Like.js'

import React from 'react'

export default function Icon(props) {
    switch (props.name) {
        case 'Home':
            return <Home {...props}/>
        case 'Search':
            return <Search {...props}/>
        case 'Library':
            return <Library {...props}/>
        case 'Create':
            return <Create {...props}/>
        case 'Like':
            return <Like />
    }
}
