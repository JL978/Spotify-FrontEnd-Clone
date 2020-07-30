import React from 'react'
import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import makeAxiosRequest from '../utilities/makeAxiosRequest'

import PageTitle from './PageTitle'
import PlayCard from './PlayCard'

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
        const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories/${id}`)

        makeRequest()
            .then((data) => setName(data.name))
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }, [id])

    useEffect(() => {
        const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=50`)

        makeRequest()
            .then((data) => setPlayLists(data.playlists.items))
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
