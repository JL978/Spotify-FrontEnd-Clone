import React from 'react'
import {useEffect, useState, useCallback} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import sendConfig from '../utilities/axiosUtils'

import PageBanner from './PageBanner'
import PlayListFunctions from './PlayListFunctions'
import TrackList from './TrackList'


export default function PlayListPage() {
    const [id, setId] = useState('')
    const location = useLocation()

    const [bannerInfo, setbannerInfo] = useState({
        name: '',
        description: '',
        user: {},
        followers: 0,
        primary_color: '#262626',
        images: [],
    })

    const [tracks, setTracks] = useState({
        items:[],
        next: null
    })

    // const lastTrackRef = useCallback(node => {
    //     console.log(node)
    // })

    //Getting the playlist id from the url
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

    //using the id to get the playlist's info
    useEffect(() => {
        const [source, config] = sendConfig()

        axios.get(`http://localhost:4000/playlist/${id}`, config)
            .then((response) => {
                const {name, description, owner, followers, primary_color, tracks, images} = response.data
                setbannerInfo(bannerInfo => ({...bannerInfo, name, description, user:owner, followers, primary_color, images}))
                setTracks(tracks)
            })
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }, [id])


    return (
        <div className='playListPage'>
            <PageBanner pageTitle='playlist' bannerInfo={bannerInfo}/>
            <div className="playListContent">
                <div className="playListOverlay" style={{backgroundColor: `${bannerInfo.primary_color}`}}></div>
                <PlayListFunctions />
                <div className="page-content">
                    <TrackList tracks={tracks} />
                </div>
            </div>
        </div>
    )
}
