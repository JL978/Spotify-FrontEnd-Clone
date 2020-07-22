import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

import CollectionRow from './CollectionRow'

export default function HomePage() {
    const [collections, setCollections] = useState([])

    useEffect(() => {
        const config = {
            headers: {'Access-Control-Allow-Origin': '*'},
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        axios.get('http://localhost:4000/collections', config)
            .then((response) => {
                setCollections(response.data.categories.items)
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <div className='HomePage'>
            {collections.map((collection, index) => {
                return <CollectionRow />
            })}
        </div>
    )
}
