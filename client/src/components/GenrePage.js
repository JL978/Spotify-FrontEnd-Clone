import React from 'react'
import PageTitle from './PageTitle'
import PlayCard from './PlayCard'

import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import sendConfig from '../utilities/axiosUtils'

export default function GenrePage() {
    const [playLists, setPlayLists] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')

    const location = useLocation()

    useEffect(() => {
        const path = location.pathname.split('/')
        if (path.length === 3){
            setId(path[path.length-1])
        }else if (path.length > 3){
            const idIndex = path.findIndex('genre') + 1
            setId(path[idIndex])
        }else{
            setId('')
        }
    }, [location])


    useEffect(() => {
        const [source, config] = sendConfig()

        axios.get(`http://localhost:4000/collection/${id}`, config)
            .then((response) => {
                const name = response.data.name
                setName(name)
            })
            .catch((error) => console.log(error))

        axios.get(`http://localhost:4000/collection/${id}/playlists?limit=50`, config)
            .then((response) => {
                const playlists = response.data.playlists.items
                setPlayLists(playlists)
            })
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }, [id])

    return (
        <div className='GenrePage page-content'>
            <PageTitle name={name}/>
            <div className="browseGrid">
                {playLists.map(playlist => (
                    <PlayCard key={playlist.id} info={playlist} type="playlist"/>
                ))}
            </div>
        </div>
    )
}
