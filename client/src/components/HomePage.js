import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

import CollectionRow from './CollectionRow'

import makeAxiosRequest from '../utilities/makeAxiosRequest'

export default function HomePage() {
    const [collections, setCollections] = useState([])
    const [temp, setTemp] = useState({})
    const [playlistsMap, setplaylistMap] = useState({})

    
    useEffect(() => {
        const [source, makeRequest] = makeAxiosRequest('https://api.spotify.com/v1/browse/categories?limit=6')
        makeRequest()
            .then((data) => setCollections(data.categories.items))
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }, [])

    useEffect(() => {
        collections.map((collection) => {
            const {name, id} = collection
            var [source, makeRequest] = makeAxiosRequest(`http://localhost:4000/collection/${id}/playlists?limit=9`)
            makeRequest()
                .then((data) => {
                    const playlists = data.playlists.items
                    setTemp(temp => ({[name]: {id, playlists}}))
                })
                .catch((error) => console.log(error))
        })
    }, [collections])


    useEffect(() => {
        setplaylistMap(playlistsMap => ({...playlistsMap, ...temp}))
    }, [temp])

    return (
        <div className="page-content">
            <div className='pageContent'>
                <CollectionRow name='Uniquely Yours' id={null} playlists={[{id:'', description:'', name:'Liked Songs', images:[{url: 'https://misc.scdn.co/liked-songs/liked-songs-300.png'}]}]}/>
                {   
                    Object.entries(playlistsMap).map(([name, info]) => {
                        const {id, playlists} = info
                        return <CollectionRow name={name} key={id} id={id} playlists={playlists}/>
                    })
                }
            </div>
        </div>
    )
}
