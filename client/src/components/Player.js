import React, {useState, useReducer, useEffect, useContext} from 'react';
import axios from 'axios'
import Heartbeat from 'react-heartbeat'
import querystring from 'querystring'

import ProgressBar from './ProgressBar'
import NowPlaying from './NowPlaying'
import ConnectDevices from './ConnectDevices'
import ControlButton from './ControlButton'
import reqWithToken from '../utilities/reqWithToken'
import msTimeFormat from '../utilities/utils'
import putWithToken from '../utilities/putWithToken'

const Player = ({token}) => {
    const [playbackState, setPlaybackState] = useState({
        play: false,
        shuffle: false,
        repeat: false,
        progress: 0,
        total_time: 0
    })

    const [scrubPb, setScrubPb] = useState(null)
    const [playback, setPlayback] = useState(0)
    const [volume, setVolume] = useState(1)
    const [connectTip, setConnectTip] = useState(true)
    const [playInfo, setPlayInfo] = useState({
        album: {}, 
        artists: [], 
        name: '', 
        id: ''
    })

    useEffect(() => {
        updateState()
        return () => source.cancel()
    }, [])

    const updateState = () => {
        const requestInfo = reqWithToken('https://api.spotify.com/v1/me/player', token, source)
        requestInfo()
            .then(response => {
                const {repeat_state, shuffle_state, is_playing, progress_ms, item, device} = response.data
                setPlayback(progress_ms/item.duration_ms)
                setVolume(device.volume_percent/100)
                setPlaybackState(state => ({...state, play: is_playing, shuffle: shuffle_state, repeat: repeat_state !== 'off', progress:progress_ms, total_time: item.duration_ms}))
                setPlayInfo(item)
            })
            .catch(error => console.log(error))
    }

    const updatePlayback = () => {
        const interval = 500/playbackState.total_time
        setPlayback(playback => (playback + interval))
        setPlaybackState(state => ({...state, progress: state.progress+500}))
    }

    const source = axios.CancelToken.source()


    const togglePlay = () => {
        if (playbackState.play){
            const request = putState('pause', token, source)
            request()
                .then(response => {
                    if (response.status === 204){
                        setPlaybackState(state => ({...state, play: false}))
                        updateState()
                    }else{
                        console.log(response)
                    }
                }) 
                .catch(error => console.log(error))
        }else{
            const request = putState('play', token, source)
            request()
                .then(response => {
                    if (response.status === 204){
                        setPlaybackState(state => ({...state, play: true}))
                        updateState()
                    }else{
                        console.log(response)
                    }
                }) 
                .catch(error => console.log(error))
        }
        updateState()
    }

    const toggleShuffle = () => {
        if (playbackState.shuffle){
            const request = putState('shuffleOff', token, source)
            request()
                .then(response => {
                    if (response.status === 204){
                        setPlaybackState(state => ({...state, shuffle: false}))
                        updateState()
                    }else{
                        console.log(response)
                    }
                }) 
                .catch(error => console.log(error))
        }else{
            const request = putState('shuffleOn', token, source)
            request()
                .then(response => {
                    if (response.status === 204){
                        setPlaybackState(state => ({...state, shuffle: true}))
                        updateState()
                    }else{
                        console.log(response)
                    }
                }) 
                .catch(error => console.log(error))
        }
    }

    const toggleRepeat = () => {
        if (playbackState.repeat){
            const request = putState('repeatOff', token, source)
            request()
                .then(response => {
                    if (response.status === 204){
                        setPlaybackState(state => ({...state, repeat: false}))
                        updateState()
                    }else{
                        console.log(response)
                    }
                }) 
                .catch(error => console.log(error))
        }else{
            const request = putState('repeatOn', token, source)
            request()
                .then(response => {
                    if (response.status === 204){
                        setPlaybackState(state => ({...state, repeat: true}))
                    }else{
                        console.log(response)
                    }
                }) 
                .catch(error => console.log(error))
        }
        
    }

    const skipNext = () => {
        const request = putState('next', token, source)
        request()
            .then(response => {
                if (response.status === 204){
                    console.log(response)
                }else{
                    console.log(response)
                }
            }) 
            .catch(error => console.log(error))
    }

    const skipPrev = () => {
        const request = putState('previous', token, source)
        request()
            .then(response => {
                if (response.status === 204){
                    updateState()
                }else{
                    console.log(response)
                }
            }) 
            .catch(error => console.log(error))
    }

    const seekPlayback = (ratio) => {
        const time = Math.round(ratio * playbackState.total_time)
        const request = putState('seek', token, source, null, null, time)
        request()
            .then(response => {
                if (response.status === 204){
                    setPlayback(ratio)
                    setPlaybackState(state => ({...state, progress_ms: time}))
                }else{
                    console.log(response)
                }
            }) 
            .catch(error => console.log(error))
        
        setScrubPb(null)
    }

    const scrubPlayback = (ratio) => {
        const time = ratio * playbackState.total_time
        setScrubPb(time)
    }

    const seekVolume = (ratio) => {
        const integer = Math.round(ratio * 100)
        const request = putState('volume', token, source, null, integer)
        request()
            .then(response => {
                if (response.status === 204){
                    setVolume(ratio)
                }else{
                    console.log(response)
                }
            }) 
            .catch(error => console.log(error))
    }

    return (
        <>
        {<Heartbeat heartbeatFunction={updateState} heartbeatInterval={2000}/>}
        {playbackState.play ? <Heartbeat heartbeatFunction={updatePlayback} heartbeatInterval={500}/>:null}
        <div className='player'>

            <div className="player-left">
                <NowPlaying playInfo={playInfo}/>
            </div>

            <div className="player-center">
                <div className="player-control-buttons">
                    <ControlButton title='Toggle Shuffle' icon='Shuffle' active={playbackState.shuffle} onClick={toggleShuffle} /> 
                    <ControlButton title='Previous' icon='TrackBack' size='x-smaller' onClick={skipPrev}/> 
                    <ControlButton 
                        title={playbackState.play ? 'Pause':'Play'} 
                        icon={playbackState.play ? 'Pause':'Play'} 
                        size={playbackState.play? 'smaller':'larger'} 
                        extraClass='circle-border'
                        onClick={togglePlay}/> 
                    <ControlButton title='Next' icon='TrackNext' size='x-smaller' onClick={skipNext}/> 
                    <ControlButton title='Toggle Repeat' icon='Repeat' active={playbackState.repeat} onClick={toggleRepeat} /> 
                </div>

                <div className="player-playback" draggable='false'>
                    <div className="playback-time" draggable='false'>{scrubPb? msTimeFormat(scrubPb) : msTimeFormat(playbackState.progress)}</div>
                    <ProgressBar extraClass='playback' value={playback} engageClass='engage' setValue={(ratio) => seekPlayback(ratio)} scrubFunction={scrubPlayback}/> 
                    <div className="playback-time" draggable='false'>{msTimeFormat(playbackState.total_time)}</div>
                </div>
            </div>

            <div className="player-right">
                <div className="extra-controls">
                    <span className='connect-devices-wrapper'>
                        {connectTip && <ConnectDevices token={token} closeTip={() => setConnectTip(false)}/>}
                        <ControlButton title='Devices' icon='Speaker' size='x-larger' onClick={() => setConnectTip(!connectTip)}/> 
                    </span>
                    
                    <div className="volume-control">
                        <ControlButton title='Volume' icon='Volume' size='x-larger' extraClass='volume'/> 
                        <div style={{width:'100%'}}>
                            <ProgressBar extraClass='volume' value={volume} engageClass='engage' setValue={(ratio) => seekVolume(ratio)}/> 
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    );
}

function putState(action, token, source, load={}, volume, time){
    let request
    switch(action){
        case 'play':
            request = putWithToken('https://api.spotify.com/v1/me/player/play', token, source, load)
            return request

        case 'pause':
            request = putWithToken('https://api.spotify.com/v1/me/player/pause', token, source, load)
            return request

        case 'shuffleOn':
            request = putWithToken('https://api.spotify.com/v1/me/player/shuffle?state=true', token, source, load)
            return request

        case 'shuffleOff':
            request = putWithToken('https://api.spotify.com/v1/me/player/shuffle?state=false', token, source, load)
            return request

        case 'repeatOn':
            request = putWithToken('https://api.spotify.com/v1/me/player/repeat?state=track', token, source, load)
            return request

        case 'repeatOff':
            request = putWithToken('https://api.spotify.com/v1/me/player/repeat?state=off', token, source, load)
            return request

        case 'next':
            request = putWithToken('https://api.spotify.com/v1/me/player/next', token, source, load, 'POST')
            return request

        case 'previous':
            request = putWithToken('https://api.spotify.com/v1/me/player/previous', token, source, load, 'POST')
            return request

        case 'seek':
            request = putWithToken(`https://api.spotify.com/v1/me/player/seek?position_ms=${time}`, token, source, load)
            return request
        
        case 'volume':
            request = putWithToken(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, token, source, load)
            return request

        default:
            return null
    }
}

export default Player;
