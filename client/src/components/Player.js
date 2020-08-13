import React, {useState, useReducer, useRef} from 'react';
import Icon from './icons'
import ProgressBar from './ProgressBar'

const Player = () => {
    const playBackState = {
        shuffle: false,
        play: false,
        repeat: false
    }

    const reducer = (playBack, action) => {
        switch (action){
            case 'play':
                return {...playBack, play: !playBack.play}
            case 'shuffle':
                return {...playBack, shuffle: !playBack.shuffle}
            case 'repeat':
                return {...playBack, repeat: !playBack.repeat}
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(reducer, playBackState)

    const [playback, setPlayback] = useState(0.5)
    const [volume, setVolume] = useState(1)



    return (
        <div className='player'>

            <div className="player-left">
                <div className="now-playing">

                    <div className="player-cover">
                        <div>
                            <Icon name='Music2'/>
                        </div>
                        <img draggable="false" loading="eager" src="https://i.scdn.co/image/ab67616d00004851d517a6c9be360bb3c9b279f7" alt=""></img>
                    </div>

                    <div className="player-info">
                        <div className="player-info-track ellipsis-one-line">
                            <a href="/album/6aJvNwlBOBWrjwzS3X3cc8">Basic (Regurgitated)</a>
                        </div>
                        <div className="player-info-artist ellipsis-one-line">
                            <a href="/artist/2D4FOOOtWycb3Aw9nY5n3c">Declan McKenna</a>
                        </div>
                    </div>

                    <div className="player-like">
                        <button title='Save to your Liked Songs' className="player-like-button no-outline">
                            <Icon name='Heart' />
                        </button>
                    </div>
                
                </div>
            </div>

            <div className="player-center">
                <div className="player-control-buttons">

                    <button title='Toggle Shuffle' className={`control-button ${state.shuffle? 'active':null} no-outline`} onClick={()=> dispatch('shuffle')}>
                        <Icon name='Shuffle'/>
                    </button>

                    <button title='Previous' className='control-button x-smaller no-outline'>
                        <Icon name='TrackBack'/>
                    </button>

                    <button title={state.play ? 'Pause':'Play'} className={`control-button ${state.play? 'smaller':'larger'} circle-border no-outline`} onClick={()=> dispatch('play')}>
                        {state.play ? 
                            <Icon name='Pause'/>:
                            <Icon name='Play'/>
                        }
                    </button>

                    <button title= 'Next' className='control-button x-smaller no-outline'>
                        <Icon name='TrackNext'/>
                    </button>

                    <button title='Toggle Repeat' className={`control-button ${state.repeat? 'active':null} no-outline`} onClick={()=> dispatch('repeat')} >
                        <Icon name='Repeat'/>
                    </button>

                </div>

                <div className="player-playback">
                    <div className="playback-time" draggable={false}>1:18</div>

                        <ProgressBar extraClass='' value={playback} engageClass='engage'/> 

                    <div className="playback-time" draggable={false}>3:24</div>
                </div>
            </div>

            <div className="player-right">
                <div className="extra-controls">

                    <button className='control-button x-larger no-outline'>
                        <Icon name='Speaker'/>
                    </button>

                    <div className="volume-control">
                        <button className='control-button x-larger volume no-outline'>
                            <Icon name='Volume'/>
                        </button>
                        <div style={{width:'100%'}}>
                            <ProgressBar extraClass='volume' value={volume} engageClass='engage'/> 
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Player;
