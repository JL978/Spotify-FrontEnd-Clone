import React from 'react'
import BrowseCard from './BrowseCard'
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
            <div className="browseTitle">
                <h1 style={{
                    fontSize: '24px',
                    fontSeight: '700',
                    lineHeight: '28px',
                    letterSpacing: '-.04em',
                    textTransform: 'none',
                }}>Browse All</h1>
            </div>
            <div className="browseGrid">
                {genre.map((genre) => {
                    return <BrowseCard key={genre.id} info={genre}/>
                })}
            </div>
        </div>
    )
}
