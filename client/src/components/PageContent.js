import React, {useContext, useState, useRef, useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import HomePage from './HomePage'
import SearchPage from './SearchPage'
import GenrePage from './GenrePage'
import PlayListPage from './PlayListPage'
import AlbumPage from './AlbumPage'
import UserPage from './UserPage'
import ArtistPage from './ArtistPage'
import CollectionPage from './CollectionPage'
import LikePage from './LikePage'

import ReactToolTip from 'react-tooltip'
import generateContent from '../utilities/TipContent'
import {LoginContext} from '../utilities/context'

export default function PageContent({query, playlists, refreshPlaylist}) {
    const loggedIn = useContext(LoginContext)

    const [status, setStatus] = useState(false) 
    const [message, setMessage] = useState('')

    const timerRef = useRef(null)

    const setStatusMessage = (message) => {
        clearTimeout(timerRef.current)
        setStatus(true)
        setMessage(message)
        timerRef.current = setTimeout(() => {
            setStatus(false)
        }, 3000)
    }

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current)
        }
    }, [])

    return (
        <>
        <Switch>
            <Route exact path='/'>
                <HomePage />
            </Route>
            <Route path={`/search`}>
                <SearchPage query={query}/>
            </Route>
            <Route path='/genre'>
                <GenrePage />
            </Route>
            <Route path='/playlist'>
                <PlayListPage playlists={playlists} refreshPlaylist={refreshPlaylist} setMessage={(message)=>setStatusMessage(message)}/>
            </Route>
            <Route path='/album' >
                <AlbumPage setMessage={(message)=>setStatusMessage(message)}/>
            </Route>
            <Route path='/user' >
                <UserPage setMessage={(message)=>setStatusMessage(message)}/>
            </Route>
            <Route path='/artist' >
                <ArtistPage setMessage={(message)=>setStatusMessage(message)}/>
            </Route>
            <Route path='/collection'>
                {loggedIn ? <Redirect to='/collection/playlist'/>:<Redirect to='/'/>}
                <CollectionPage playlists={playlists}/>
            </Route>
            <Route path='/tracks'>
                {loggedIn ? <LikePage />:<Redirect to='/'/>}
            </Route>
        </Switch>
        <div className={`status-bar-wrapper ${status? 'active':''}`}>
            <div className={`status-bar ${status? 'active':''}`}>{message}</div>
        </div>
        <ReactToolTip className='toolTip ttMain' id='tooltipMain' disable={loggedIn} place='bottom' effect='solid'  backgroundColor= '#2e77d0' globalEventOff='click' getContent={dataTip => generateContent(dataTip)} clickable={true}/>
        </>
    )
}
