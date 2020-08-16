import React, {useState, useReducer, useEffect, useContext} from 'react';
import axios from 'axios'
import Icon from './icons'
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
        const source = axios.CancelToken.source()
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

        return () => source.cancel()
    }, [])

    return (
        <div className='player'>

            <div className="player-left">
                <NowPlaying playInfo={playInfo}/>
            </div>

            <div className="player-center">
                <div className="player-control-buttons">
                    <ControlButton title='Toggle Shuffle' icon='Shuffle' active={playbackState.shuffle} onClick={()=> setPlaybackState(!playbackState.shuffle)} /> 
                    <ControlButton title='Previous' icon='TrackBack' size='x-smaller'/> 
                    <ControlButton 
                        title={playbackState.play ? 'Pause':'Play'} 
                        icon={playbackState.play ? 'Pause':'Play'} 
                        size={playbackState.play? 'smaller':'larger'} 
                        extraClass='circle-border'
                        onClick={()=> setPlaybackState(!playbackState.play)}/> 
                    <ControlButton title='Next' icon='TrackNext' size='x-smaller'/> 
                    <ControlButton title='Toggle Repeat' icon='Repeat' active={playbackState.repeat} onClick={()=> setPlaybackState(!playbackState.repeat)} /> 
                </div>

                <div className="player-playback" draggable='false'>
                    <div className="playback-time" draggable='false'>{msTimeFormat(playbackState.progress)}</div>
                    <ProgressBar extraClass='playback' value={playback} engageClass='engage' setValue={(ratio) => setPlayback(ratio)}/> 
                    <div className="playback-time" draggable='false'>{msTimeFormat(playbackState.total_time)}</div>
                </div>
            </div>

            <div className="player-right">
                <div className="extra-controls">
                    <span className='connect-devices-wrapper'>
                        {connectTip && <ConnectDevices token={token}/>}
                        <ControlButton title='Devices' icon='Speaker' size='x-larger' onClick={() => setConnectTip(!connectTip)}/> 
                    </span>
                    
                    <div className="volume-control">
                        <ControlButton title='Volume' icon='Volume' size='x-larger' extraClass='volume'/> 
                        <div style={{width:'100%'}}>
                            <ProgressBar extraClass='volume' value={volume} engageClass='engage' setValue={(ratio) => setVolume(ratio)}/> 
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

function putState(action, load, token, source){
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
            request = putWithToken('https://api.spotify.com/v1/me/player/shuffle?state=off', token, source, load)
            return request

        case 'next':
            request = putWithToken('https://api.spotify.com/v1/me/player/next', token, source, load)
            return request

        case 'previous':
            request = putWithToken('https://api.spotify.com/v1/me/player/previous', token, source, load)
            return request

        case 'seek':
            request = putWithToken('https://api.spotify.com/v1/me/player/seek', token, source, load)
            return request

        default:
            return null
    }
}

export default Player;
