import React from 'react'
import Icon from './icons'

export default function PlayListFunctions({type}) {
    return (
        <div className="playListFunctions">
            {switchType(type)}
            <button className="moreButton" title="More">• • •</button>
        </div>
    )
}


function switchType(type){
    switch (type) {
        case 'user':
            return (
                <>
                    <button className="followButton">follow</button>

                </>
            )
        case 'artist':
            return (
                <>
                    <button className="playButton" title="Play">
                        <Icon name="Play" height='28' width='28'/>
                    </button>
                    <button className="followButton">follow</button>
                </>
            )
        default:
            return (
                <>
                    <button className="playButton" title="Play">
                        <Icon name="Play" height='28' width='28'/>
                    </button>

                    <button className="likeButton" title="Save to Your Library">
                        <Icon name='Heart'/>
                    </button>
                </>
            )
    }
}