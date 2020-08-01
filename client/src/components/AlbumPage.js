import React from 'react'
import {useEffect, useState, useRef, useCallback} from 'react'
import { useLocation } from 'react-router-dom'
import makeAxiosRequest from '../utilities/makeAxiosRequest'

import PageBanner from './PageBanner'
import PlayListFunctions from './PlayListFunctions'
import TrackList from './TrackList'

import useId from '../utilities/hooks/useId'

export default function AlbumPage() {
    const id = useId()

    const [bannerInfo, setbannerInfo] = useState({
        album_type: '',
        name: '',
        description: '',
        user: [],
        followers: 0,
        primary_color: '#262626',
        images: [],
        release_date: ''
    })

    const [tracks, setTracks] = useState([])

    const [next, setNext] = useState(null) 

    const observer = useRef()
    const lastTrackRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && next){
                const [, makeRequest] = makeAxiosRequest(next)
                makeRequest()
                    .then(data => {
                        setTracks(tracks => [...tracks, ...data.items])
                        setNext(data.next)
                    })
                    .catch(error => console.log(error))
            }
        })
        if (node) observer.current.observe(node)
    }, [next])

    //using the id to get the playlist's info
    useEffect(() => {
        const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/albums/${id}`)

        makeRequest()
            .then((data) => {
                const {album_type, name, artists, primary_color, tracks, images, release_date} = data
                setbannerInfo(bannerInfo => ({...bannerInfo, album_type, name, user:artists, primary_color, images, release_date}))
                setTracks(tracks.items)
                setNext(tracks.next)
            })
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }, [id])

    return (
        <div className='listPage' style={{display: `${tracks.length===0? 'none':'block'}`}}>
            <PageBanner pageTitle={bannerInfo.album_type} bannerInfo={bannerInfo}/>
            <div className="playListContent">
                <div className="playListOverlay" style={{backgroundColor: `${bannerInfo.primary_color}`}}></div>
                <PlayListFunctions />
                <div className="page-content">
                    <TrackList ref={lastTrackRef} tracks={tracks} />
                </div>
            </div>
        </div>
    )
}
