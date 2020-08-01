import React from 'react'
import {useState, useEffect} from 'react'
import makeAxiosRequest from '../utilities/makeAxiosRequest'

import PageBanner from './PageBanner'
import PlayListFunctions from './PlayListFunctions'
import CollectionRow from './CollectionRow'

import useId from '../utilities/hooks/useId'

export default function PageContent({query}) {
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

    const [playLists, setplayLists] = useState([])

    useEffect(() => {
        const [userSource, requestUser] = makeAxiosRequest(`https://api.spotify.com/v1/users/${id}`)
        const [listSource, requestList] = makeAxiosRequest(`https://api.spotify.com/v1/users/${id}/playlists`)

        const makeRequest = async ()=> {
            try{
                const [userData, listData] = await Promise.all([requestUser(), requestList()])

                const {display_name, owner, followers, primary_color, images} = userData
                const {items, total} = listData
                console.log(listData)
                setbannerInfo(bannerInfo => ({...bannerInfo, name:display_name, user:[owner], followers, primary_color, images, total}))
                setplayLists(items)
            }catch(error){ 
                console.log(error)
            }   
        }

        makeRequest()

        return () => {
            userSource.cancel()
            listSource.cancel()
        }
    }, [id])

    // const [next, setNext] = useState(null) 

    // const observer = useRef()
    // const lastTrackRef = useCallback(node => {
    //     if (observer.current) observer.current.disconnect()
    //     observer.current = new IntersectionObserver(entries => {
    //         if(entries[0].isIntersecting && next){
    //             const [, makeRequest] = makeAxiosRequest(next)
    //             makeRequest()
    //                 .then(data => {
    //                     setPlaylists(tracks => [...tracks, ...data.items])
    //                     setNext(data.next)
    //                 })
    //                 .catch(error => console.log(error))
    //         }
    //     })
    //     if (node) observer.current.observe(node)
    // }, [next])
    //setNext(tracks.next)


    return (
        <div className='listPage' style={{display: playLists.length===0? 'none':'block'}}>
            <PageBanner pageTitle='profile' bannerInfo={bannerInfo}/>
            <div className="playListContent">
                <div className="playListOverlay" style={{backgroundColor: `${bannerInfo.primary_color}`}}></div>
                <PlayListFunctions type='user'/>
                <div className="page-content" style={{marginTop: '40px'}}>
                    <CollectionRow name='Public Playlists' id={null} playlists={playLists}/>
                </div>
            </div>
        </div>
    )
}
