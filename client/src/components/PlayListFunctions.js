import React from 'react'
import Icon from './icons'
import ReactTooltip from 'react-tooltip'

export default function PlayListFunctions({type}) {
    return (
        <div className="playListFunctions">
            {switchType(type)}
            <button className="moreButton no-outline" title="More">• • •</button>
        </div>
    )
}


function switchType(type){
    switch (type) {
        case 'user':
            return (
                <>
                    <FollowButton />
                </>
            )
        case 'artist':
            return (
                <>
                    <PlayButtonLarge />
                    <FollowButton />
                </>
            )
        default:
            return (
                <>
                    <PlayButtonLarge />
                    <LikeButton />
                </>
            )
    }
}


function PlayButtonLarge(){
    return (
        <button className="playButton no-outline" title="Play" data-tip='play' data-for='tooltipMain' data-event='click' >
            <Icon name="Play" height='28' width='28'/>
        </button>
    )
}

function LikeButton(){
    return (
        <button className="likeButton no-outline" title="Save to Your Library" data-tip='like' data-for='tooltipMain' data-event='click' >
            <Icon name='Heart'/>
        </button>
    )
}

function FollowButton(){
    return (
        <button className="followButton no-outline" data-tip='follow' data-for='tooltipMain' data-event='click'>follow</button>
    )
}