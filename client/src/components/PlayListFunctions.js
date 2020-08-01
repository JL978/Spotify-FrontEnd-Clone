import React from 'react'
import Icon from './icons'

export default function PlayListFunctions({type}) {
    return (
        <div className="playListFunctions">
            {type === 'user'? 
                <button className="followButton">follow</button>
                :
                <>
                    <button className="playButton" title="Play">
                        <Icon name="Play" height='28' width='28'/>
                    </button>

                    <button className="likeButton" title="Save to Your Library">
                        <Icon name='Heart'/>
                    </button>
                </>
            }
            
            <button className="moreButton" title="More">• • •</button>
        </div>
    )
}
