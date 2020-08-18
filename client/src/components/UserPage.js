import React from 'react'
import {useState, useEffect, useContext} from 'react'
import makeAxiosRequest from '../utilities/makeAxiosRequest'
import axios from 'axios'

import PageBanner from './PageBanner'
import PlayListFunctions from './PlayListFunctions'
import CollectionRow from './CollectionRow'

import useId from '../utilities/hooks/useId'
import useInfiScroll from '../utilities/hooks/useInfiScroll'
import {UserContext, TokenContext, LoginContext} from '../utilities/context'
import reqWithToken from '../utilities/reqWithToken'
import putWithToken from '../utilities/putWithToken'

export default function UserPage({query}) {
    const id = useId()
    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const loggedIn = useContext(LoginContext)

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
    const [follow, setFollow] = useState(false)
    const source = axios.CancelToken.source()
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

        if (loggedIn){
            const requestFollow = reqWithToken(`https://api.spotify.com/v1/me/following/contains?type=user&ids=${id}`, token, source)
            requestFollow()
                .then(response => {
                    setFollow(response.data[0])
                })
                .catch(error => console.log(error))
        }

        return () => {
            userSource.cancel()
            listSource.cancel()
            source.cancel()
        }
    // eslint-disable-next-line
    }, [id])

    const followUser = () => {
        if (loggedIn) {
            const request = putWithToken(`https://api.spotify.com/v1/me/following?type=user&ids=${id}`, token, source, {}, follow? 'DELETE':'PUT')
            request()
                .then(response => {
                    if (response.status === 204){
                        setFollow(!follow)
                    }else{
                        console.log(response)
                    }
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div className='listPage' style={{display: playLists.length===0? 'none':'block'}}>
            <PageBanner pageTitle='profile' bannerInfo={bannerInfo}/>
            <div className="playListContent">
                <div className="playListOverlay" style={{backgroundColor: `${bannerInfo.primary_color}`}}></div>
                <PlayListFunctions type={id === user.id? 'none':'user'} follow={follow} onFollow={followUser}/>
                <div className="page-content" style={{marginTop: '40px'}}>
                    <CollectionRow ref={lastRef} name='Public Playlists' id={null} playlists={playLists}/>
                </div>
            </div>
        </div>
    )
}



