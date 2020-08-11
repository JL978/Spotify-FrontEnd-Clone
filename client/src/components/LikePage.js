import React from 'react';
import {useEffect, useState, useContext} from 'react'
import axios from 'axios'

import PageBanner from './PageBanner'
import PlayListFunctions from './PlayListFunctions'
import TrackList from './TrackList'

import {TokenContext, UserContext} from '../utilities/context'
import useTokenScroll from '../utilities/hooks/useTokenScroll'
import reqWithToken from '../utilities/reqWithToken'


const LikePage = () => {
    const token = useContext(TokenContext)
    const user = useContext(UserContext)

    const bannerInfo = {
        name: 'Liked Songs',
        description: '',
        user: [user],
        followers: 0,
        primary_color: 'rgb(70, 62, 118)',
        images: [{url: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'}],
    }
    const [tracks, setTracks] = useState([])
    const source = axios.CancelToken.source()
    const [setNext, lastRef] = useTokenScroll(setTracks, token, source)

    //using the id to get the playlist's info
    useEffect(() => {
        const requestPlaylist = reqWithToken('https://api.spotify.com/v1/me/tracks?limit=50', token, source)

        requestPlaylist()
            .then((data) => {
                const _tracks = data.data.items
                setTracks(tracks => [...tracks, ..._tracks.map((track) => track.track)])
                setNext(data.data.next)
            })
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }, [])

    return (
        <div className='listPage' style={{display: `${tracks.length===0? 'none':'block'}`}}>
            <PageBanner pageTitle='playlist' bannerInfo={bannerInfo}/>
            <div className="playListContent">
                <div className="playListOverlay" style={{backgroundColor: `${bannerInfo.primary_color}`}}></div>
                <PlayListFunctions type='playOnly'/>
                <div className="page-content">
                    <TrackList ref={lastRef} tracks={tracks} />
                </div>
            </div>
        </div>
    );
}

export default LikePage;

