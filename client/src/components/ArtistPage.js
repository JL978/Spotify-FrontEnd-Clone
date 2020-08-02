import React from 'react'
import {useState, useEffect} from 'react'

import makeAxiosRequest from '../utilities/makeAxiosRequest'
import getLocale from '../utilities/locale'
import useId from '../utilities/hooks/useId'

import PageBanner from './PageBanner'
import PlayListFunctions from './PlayListFunctions'
import CollectionRow from './CollectionRow'


export default function ArtistPage() {
    const id = useId()

    const [bannerInfo, setbannerInfo] = useState({
        name: '',
        description: '',
        user: [],
        followers: 0,
        primary_color: 'rgb(83, 83, 83)',
        images: [],
        total: 0
    })

    const [tracks, setTracks] = useState([])

    useEffect(() => {
        const [, locale] = getLocale()
        const [artistSource, requestArtist] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}`)
        const [tracksSource, requestTracks] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=${locale}`)
        const [albumSource, requestAlbum] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`)
        const [singleSource, requestSingle] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=single`)
        const [appearSource, requestAppear] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=appears_on`)
        const [compilationSource, requestCompilation] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=compilation`)

        const makeRequest = async ()=> {
            try{
                const [artistData, 
                        trackData, 
                        albumData, 
                        singleData, 
                        appearData, 
                        compilationData] = await Promise.all([requestArtist(), requestTracks(), requestAlbum(), requestSingle(), requestAppear(), requestCompilation()])

                const {name, followers, primary_color, images} = artistData
                const {tracks} = trackData
                console.log(images)
                setbannerInfo(bannerInfo => ({...bannerInfo, name, followers, primary_color, images}))
                setTracks(tracks)

            }catch(error){ 
                console.log(error)
            }   
        }

        makeRequest()

        return () => {
            artistSource.cancel()
            tracksSource.cancel()
            albumSource.cancel()
            singleSource.cancel()
            appearSource.cancel()
            compilationSource.cancel()
        }
    }, [id])


    return (
        <div className='listPage' style={{display: tracks.length===0? 'none':'block'}}>
            <PageBanner pageTitle='artist' bannerInfo={bannerInfo}/>
            <div className="playListContent">
                <div className="playListOverlay" style={{backgroundColor: `${bannerInfo.primary_color}`}}></div>
                <PlayListFunctions type='artist'/>
                <div className="page-content" style={{marginTop: '40px'}}>
                    
                </div>
            </div>
        </div>
    )
}


