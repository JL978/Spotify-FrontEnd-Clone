import React from 'react'
import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import makeAxiosRequest from '../utilities/makeAxiosRequest'

import PageTitle from './PageTitle'
import PlayCard from './PlayCard'

import useId from '../utilities/hooks/useId'

export default function GenrePage() {
    const id = useId()
    
    const [playLists, setPlayLists] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        const [nameSource, requestName] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories/${id}`)
        const [listSource, requestList] = makeAxiosRequest(`https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=50`)

        const makeRequest = async () => {
            try{
                const [nameData, listData] = await Promise.all([requestName(), requestList()])
                setName(nameData.name)
                setPlayLists(listData.playlists.items)
            }catch(error){
                console.log(error)
            }
        }

        makeRequest()

        return () => {
            nameSource.cancel()
            listSource.cancel()
        }
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
