import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

import CollectionRow from './CollectionRow'
import sendConfig from '../utilities/axiosUtils'


export default function HomePage() {
    const [collections, setCollections] = useState([])
    const [temp, setTemp] = useState({})
    const [playlistsMap, setplaylistMap] = useState({})

    
    useEffect(() => {
        const [source, config] = sendConfig()
        axios.get('http://localhost:4000/collections?limit=6', config)
            .then((response) => {
                setCollections(response.data.categories.items)
            })
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }, [])

    useEffect(() => {
        const [source, config] = sendConfig()
        collections.map((collection) => {
            const {name, id} = collection
            axios.get(`http://localhost:4000/collection/${id}/playlists?limit=9`, config)
                .then((response) => {
                    const playlists = response.data.playlists.items
                    setTemp({[name]: {id, playlists}})
                })
                .catch((error) => console.log(error))
        })
        return () => source.cancel()
    }, [collections])

    useEffect(() => {
        setplaylistMap({...playlistsMap, ...temp})
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
