import React from 'react'
import BrowseCard from './BrowseCard'
import PageTitle from './PageTitle'
import {useState, useEffect} from 'react'

import axios from 'axios'
import sendConfig from '../utilities/axiosUtils'

export default function BrowsePage() {
    const [genre, setGenre] = useState([])

    useEffect(() => {
        const [source, config] = sendConfig()

        axios.get('http://localhost:4000/collections?limit=50', config)
            .then((response) => {
                setGenre(response.data.categories.items)
            })
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }, [])

    return (
        <div className='page-content browsePage'>
            <PageTitle name='Browse All' />
            <div className="browseGrid">
                {genre.map((genre) => {
                    return <BrowseCard key={genre.id} info={genre}/>
                })}
            </div>
        </div>
    )
}
