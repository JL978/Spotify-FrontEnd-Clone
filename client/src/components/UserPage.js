import React from 'react'
import {useState, useEffect} from 'react'
import makeAxiosRequest from '../utilities/makeAxiosRequest'

import PageBanner from './PageBanner'
import PlayListFunctions from './PlayListFunctions'
import CollectionRow from './CollectionRow'

import useId from '../utilities/hooks/useId'
import useInfiScroll from '../utilities/hooks/useInfiScroll'

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
    const [setNext, lastRef] = useInfiScroll(setplayLists)

    useEffect(() => {
        const [userSource, requestUser] = makeAxiosRequest(`https://api.spotify.com/v1/users/${id}`)
        const [listSource, requestList] = makeAxiosRequest(`https://api.spotify.com/v1/users/${id}/playlists`)

        const makeRequest = async ()=> {
            try{
                const [userData, listData] = await Promise.all([requestUser(), requestList()])

                const {display_name, owner, followers, primary_color, images} = userData
                const {items, total, next} = listData
                setbannerInfo(bannerInfo => ({...bannerInfo, name:display_name, user:[owner], followers, primary_color, images, total}))
                setplayLists(items)
                setNext(next)
            }catch(error){ 
                console.log(error)
            }   
        }

        makeRequest()

        return () => {
            userSource.cancel()
            listSource.cancel()
        }
    // eslint-disable-next-line
    }, [id])

    return (
        <div className='listPage' style={{display: playLists.length===0? 'none':'block'}}>
            <PageBanner pageTitle='profile' bannerInfo={bannerInfo}/>
            <div className="playListContent">
                <div className="playListOverlay" style={{backgroundColor: `${bannerInfo.primary_color}`}}></div>
                <PlayListFunctions type='user'/>
                <div className="page-content" style={{marginTop: '40px'}}>
                    <CollectionRow ref={lastRef} name='Public Playlists' id={null} playlists={playLists}/>
                </div>
            </div>
        </div>
    )
}



