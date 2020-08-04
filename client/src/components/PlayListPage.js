import React from 'react'
import {useEffect, useState} from 'react'
import makeAxiosRequest from '../utilities/makeAxiosRequest'

import PageBanner from './PageBanner'
import PlayListFunctions from './PlayListFunctions'
import TrackList from './TrackList'

import useId from '../utilities/hooks/useId'
import useInfiScroll from '../utilities/hooks/useInfiScroll'

export default function PlayListPage() {
    const id = useId('playlist')

    const [bannerInfo, setbannerInfo] = useState({
        name: '',
        description: '',
        user: [],
        followers: 0,
        primary_color: '#262626',
        images: [],
    })
    const [tracks, setTracks] = useState([])
    const [setNext, lastRef] = useInfiScroll(setTracks)

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
                    <TrackList ref={lastRef} tracks={tracks} />
                </div>
            </div>
        </div>
    )
}
