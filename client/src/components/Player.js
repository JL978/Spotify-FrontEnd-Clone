import React from 'react';
import Icon from './icons'
import ProgressBar from './ProgressBar'

const Player = () => {
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
                        <button title='Save to your Liked Songs' className="player-like-button">
                            <Icon name='Heart' />
                        </button>
                    </div>
                
                </div>
            </div>

            <div className="player-center">
                <div className="player-control-buttons">

                    <button title='Toggle Shuffle' className='control-button active'>
                        <Icon name='Shuffle'/>
                    </button>

                    <button title='Previous' className='control-button smaller'>
                        <Icon name='TrackBack'/>
                    </button>

                    <button title='Play' className='control-button larger circle-border'>
                        <Icon name='Play'/>
                    </button>

                    <button title= 'Next' className='control-button smaller'>
                        <Icon name='TrackNext'/>
                    </button>

                    <button title='Toggle Repeat' className='control-button'>
                        <Icon name='Repeat'/>
                    </button>

                </div>

                <div className="player-playback">
                    <div className="playback-time">1:18</div>

                        <ProgressBar extraClass='' progress={0.2}/> 

                    <div className="playback-time">3:24</div>
                </div>
            </div>

            <div className="player-right">
                <div className="extra-controls">

                    <button className='control-button x-larger'>
                        <Icon name='Speaker'/>
                    </button>

                    <div className="volume-control">
                        <button className='control-button x-larger volume'>
                            <Icon name='Volume'/>
                        </button>
                        <div style={{width:'100%'}}>
                            <ProgressBar extraClass='volume' progress={0.5}/> 
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Player;
