import React from 'react'
import {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import makeAxiosRequest from '../utilities/makeAxiosRequest'
import {TokenContext, LoginContext} from '../utilities/context'

import PageBanner from './PageBanner'
import PlayListFunctions from './PlayListFunctions'
import TrackList from './TrackList'

import useId from '../utilities/hooks/useId'
import useInfiScroll from '../utilities/hooks/useInfiScroll'
import putWithToken from '../utilities/putWithToken'
import reqWithToken from '../utilities/reqWithToken'

export default function PlayListPage({playlists, refreshPlaylist, setMessage}) {
    const id = useId('playlist')
    const loggedIn = useContext(LoginContext)
    const token = useContext(TokenContext)

    const [bannerInfo, setbannerInfo] = useState({
        name: '',
        description: '',
        user: [],
        followers: 0,
        primary_color: '#262626',
        images: [],
    })
    const [tracks, setTracks] = useState([])
    const [like, setLike] = useState(false)
    const [setNext, lastRef] = useInfiScroll(setTracks)

    //using the id to get the playlist's info
    useEffect(() => {
        setLike(false)
        setbannerInfo({
            name: '',
            description: '',
            user: [],
            followers: 0,
            primary_color: '#262626',
            images: [], 
        })
        setTracks([])

        const [source, makeRequest] = makeAxiosRequest(`https://api.spotify.com/v1/playlists/${id}`)

        makeRequest()
            .then((data) => {
                const {name, description, owner, followers, primary_color, tracks, images} = data
                setbannerInfo(bannerInfo => ({...bannerInfo, name, description, user:[owner], followers, primary_color, images}))
                setTracks(tracks.items.map((track) => track.track))
                setNext(tracks.next)
            })
            .catch((error) => console.log(error))
        
        if (loggedIn){
            const playlistIds = playlists.map((playlist) => {
                return playlist.id
            })
            if (playlistIds.includes(id)){
                setLike(true)
            }
        }

        return () => source.cancel()
    }, [id])

    const followPlaylist = () => {
        const source = axios.CancelToken.source()
        const followReq = putWithToken(`https://api.spotify.com/v1/playlists/${id}/followers`, token, source, {}, like?'DELETE':'PUT')
        followReq()
            .then(response => {
                if (response.status === 200){
                    if(like){
                        setMessage('Removed from your Library')
                    }else{
                        setMessage('Added to your Library')
                    }
                    setLike(!like)
                    refreshPlaylist()
                } else{
                    console.log(response)
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='listPage' style={{display: `${tracks.length===0? 'none':'block'}`}}>
            <PageBanner pageTitle='playlist' bannerInfo={bannerInfo}/>
            <div className="playListContent">
                <div className="playListOverlay" style={{backgroundColor: `${bannerInfo.primary_color}`}}></div>
                <PlayListFunctions onFollow={followPlaylist} follow={like} setMessage={setMessage}/>
                <div className="page-content">
                    <TrackList ref={lastRef} tracks={tracks} />
                </div>
            </div>
        </div>
    )
}
