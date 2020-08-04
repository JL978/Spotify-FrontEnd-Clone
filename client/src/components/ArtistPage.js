import React from 'react'
import {useState, useEffect} from 'react'

import makeAxiosRequest from '../utilities/makeAxiosRequest'
import getLocale from '../utilities/locale'
import useId from '../utilities/hooks/useId'

import PageBanner from './PageBanner'
import PlayListFunctions from './PlayListFunctions'
import AboutMenu from './AboutMenu'


export default function ArtistPage() {
    const id = useId('artist')

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
    const [album, setAlbum] = useState([])
    const [single, setSingle] = useState([])
    const [appear, setAppear] = useState([])
    const [compilation, setCompilation] = useState([])
    const [related, setRelated] = useState([])

    useEffect(() => {
        const [, locale] = getLocale()
        const [artistSource, requestArtist] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}`)
        const [tracksSource, requestTracks] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=${locale}`)
        const [albumSource, requestAlbum] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`)
        const [singleSource, requestSingle] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=single`)
        const [appearSource, requestAppear] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=appears_on`)
        const [compilationSource, requestCompilation] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=compilation`)
        const [relatedSource, requestRelated] = makeAxiosRequest(`https://api.spotify.com/v1/artists/${id}/related-artists`)

        const makeRequest = async ()=> {
            try{
                const [artistData, 
                        tracksData, 
                        albumData, 
                        singleData, 
                        appearData, 
                        compilationData,
                        relatedData] = await Promise.all([requestArtist(), requestTracks(), requestAlbum(), requestSingle(), requestAppear(), requestCompilation(), requestRelated()])

                const {name, followers, primary_color, images} = artistData
                setbannerInfo(bannerInfo => ({...bannerInfo, name, followers, primary_color, images}))

                const tracks = tracksData.tracks.length > 5? tracksData.tracks.slice(0,5) : tracksData.tracks
                const album = albumData.items
                const single = singleData.items
                const appear = appearData.items
                const compilation = compilationData.items
                const related = relatedData.artists


                setTracks((old) => [...old, ...tracks])
                setAlbum((old) => [...old, ...album])
                setSingle((old) => [...old, ...single])
                setAppear((old) => [...old, ...appear])
                setCompilation((old) => [...old, ...compilation])
                setRelated(old => [...old, ...related])

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
            relatedSource.cancel()
        }
    }, [id])


    return (
        <div className='listPage' style={{display: tracks.length===0? 'none':'block'}}>
            <PageBanner pageTitle='artist' bannerInfo={bannerInfo}/>
            <div className="playListContent">
                <div className="playListOverlay" style={{backgroundColor: `${bannerInfo.primary_color}`}}></div>
                <PlayListFunctions type='artist'/>
                <div className="page-content">
                    <AboutMenu id={id} related = {related} tracks={tracks}/>
                </div>
            </div>
        </div>
    )
}


