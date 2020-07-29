import React from 'react'
import Icon from './icons'
import msTimeFormat from '../utilities/utils'

export default function TrackListItem({track, lastRef}) {
    const {album, artists, name, explicit, duration_ms} = track

    const formattedTime = msTimeFormat(duration_ms)
    return (
        <li className="trackListItem">
        
            <div className="trackItemPlay">
                <div className="hoverIcon trackTopAlign">
                    <Icon name='Play' height='20' width='20'/>
                </div>
                <div className="itemIcon trackTopAlign">
                    <Icon name='Music'/>
                </div>
            </div>

            <div className="trackItemInfo">
                <div className="trackTopAlign">

                    <div className="trackName ellipsis-one-line">{name}</div>

                    <div className="trackInfo">
                        <span className='explicit-label' style={explicit? {display:'flex'}:{display:'none'}}>E</span>
                        <span className="trackArtists ellipsis-one-line">
                            {artists.map((artist) => (
                                <a href={`/artist/${artist.id}`} key={artist.id}>{artist.name}</a>
                            ))}
                        </span>
                        <span className='trackInfoSep'>•</span>
                        <span className="trackAlbum ellipsis-one-line">
                            <a href={`/ablum/${album.id}`}>{album.name}</a>
                        </span>
                    </div>

                </div>
            </div>

            <div className="trackItemDuration">
                <div className="duration trackTopAlign">
                    <span>{formattedTime}</span>
                </div>
            </div>

        </li>
    )
}
