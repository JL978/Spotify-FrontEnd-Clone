import React from 'react'
import {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import sendConfig from '../utilities/axiosUtils'

import Icon from './icons'

export default function PlayListPage() {
    const [id, setId] = useState('')

    const location = useLocation()

    useEffect(() => {
        const path = location.pathname.split('/')

        if (path.length === 3){
            setId(path[path.length-1])
        }else if (path.length > 3){
            const idIndex = path.findIndex('genre') + 1
            setId(path[idIndex])
        }else{
            setId('')
        }
    }, [location])

    useEffect(() => {
        const [source, config] = sendConfig()

        axios.get(`http://localhost:4000/playlist/${id}`, config)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }, [id])


    return (
        <div className='playListPage'>
            <div className="banner" style={{backgroundColor:'rgb(10, 146, 173)'}}>
                <div className="bannerImgDiv">
                    <img loading="lazy" src="https://i.scdn.co/image/ab67706f000000033a650c8688970d43470a0094" className='bannerImg' alt="" />
                </div>
                <div className="bannerInfo">
                    <h2 className="pageTitle">Playlist</h2>
                    <h1 className="bannerTitle">Summer Hits</h1>
                    <p className="bannerDescription">All the hits you'll need to make your summer sizzle.</p>
                    <div className="additionalInfo">
                        <a href="/user">spotify</a>
                        <h2>970,402 likes</h2>
                    </div>
                </div>
                <div className="bannerOverlay"></div>
            </div>

            <div className="playListContent">
                <div className="playListOverlay" style={{backgroundColor:'rgb(10, 146, 173)'}}></div>
                <div className="playListFunctions">
                    <button className="playButton" title="Play">
                        <Icon name="Play" height='28' width='28'/>
                    </button>
                    <button className="likeButton" title="Save to Your Library">
                        <Icon name='Heart'/>
                    </button>
                    <button className="moreButton" title="More">• • •</button>
                </div>
                <div className="page-content">
                    <div className="trackListContainer">
                        <ol className="trackList">
                            <li className="trackListItem">
                                <div className="trackItemPlay">
                                    <div className="hoverIcon">
                                        <Icon name='Play' height='20' width='20'/>
                                    </div>
                                    <div className="itemIcon">
                                        <Icon name='Music'/>
                                    </div>
                                </div>
                                <div className="trackItemInfo"></div>
                                <div className="trackItemDuration"></div>
                            </li>

                            <li className="trackListItem">
                                <div className="trackItemPlay">
                                    <div className="hoverIcon">
                                        <Icon name='Play' height='20' width='20'/>
                                    </div>
                                    <div className="itemIcon">
                                        <Icon name='Music'/>
                                    </div>
                                </div>
                                <div className="trackItemInfo"></div>
                                <div className="trackItemDuration"></div>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}
