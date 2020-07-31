import React from 'react'
import {useEffect, useState, useRef, useCallback} from 'react'
import { useLocation } from 'react-router-dom'
import makeAxiosRequest from '../utilities/makeAxiosRequest'

import PageBanner from './PageBanner'
import PlayListFunctions from './PlayListFunctions'
import TrackList from './TrackList'


export default function PlayListPage() {
    const [id, setId] = useState('')
    const location = useLocation()

    const [bannerInfo, setbannerInfo] = useState({
        name: '',
        description: '',
        user: [],
        followers: 0,
        primary_color: '#262626',
        images: [],
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

    //Getting the playlist id from the url
    useEffect(() => {
        const path = location.pathname.split('/')

        if (path.length === 3){
            setId(path[path.length-1])
        }else if (path.length > 3){
            const idIndex = path.findIndex('playlist') + 1
            setId(path[idIndex])
        }else{
            setId('')
        }
    }, [location])

    //using the id to get the playlist's info
    useEffect(() => {
        const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/playlists/${id}`)

        makeRequest()
            .then((data) => {
                const {name, description, owner, followers, primary_color, tracks, images} = data
                setbannerInfo(bannerInfo => ({...bannerInfo, name, description, user:[owner], followers, primary_color, images}))
                setTracks(tracks.items.map((track) => track.track))
                setNext(tracks.next)
            })
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }, [id])

    return (
        <div className='listPage' style={{display: `${tracks.length===0? 'none':'block'}`}}>
            <PageBanner pageTitle='playlist' bannerInfo={bannerInfo}/>
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
