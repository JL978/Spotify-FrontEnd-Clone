import React from 'react'
import {Link} from 'react-router-dom'

export default function BrowseCard() {
    return (
        <div className="browseLinkContainer">
            <a href='/' className='browseLink'>
                    <h3 style={{
                            fontSize: '24px',
                            padding: '16px',
                            lineHeight: '1.3em',
                            letterSpacing: '-.04em',
                            overflowWrap: 'break-word',
                            position: 'absolute',
                            zIndex: '1',
                    }}>Podcasts</h3>
                    <div style={{
                        background: 'linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,.4))',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height:'100%'    
                    }}></div>
                    <img loading="lazy" src="https://t.scdn.co/images/ad4d5c268a214f78920517e76e6ed107.jpeg" alt="" style={{width:'100%'}}/>
            </a>
        </div>
    )
}
