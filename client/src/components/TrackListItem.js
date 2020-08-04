import React from 'react'
import Icon from './icons'
import msTimeFormat from '../utilities/utils'


const TrackListItem = React.forwardRef(({track, style}, ref)  => {
    const {album, artists, name, explicit, duration_ms} = track

    let thumbNail 
    if (style === 'simplify' && album.images.length > 0){
        thumbNail = album.images[album.images.length-1].url
    }
    const formattedTime = msTimeFormat(duration_ms)
    return (
        <li ref={ref} className="trackListItem">
        
            <div className="trackItemPlay" style={style === 'simplify' ? simplyStyle:null}>
                <div className={style === 'simplify'? "hoverIcon":"hoverIcon trackTopAlign"}>
                    <Icon name='Play' height='20' width='20'/>
                </div>
                <div className={style ==='simplify'? "itemIcon":"itemIcon trackTopAlign"} style={{marginTop: style === 'simplify' ? '0':null}}>
                    <Icon name='Music'/>
                </div>
            </div>

            {style === 'simplify' && 
                <div className="trackMidAlign">
                    <div className='trackItemThumb'>
                        {thumbNail? 
                        <img loading="lazy" src={thumbNail} style={{width:'100%', height:'100%'}} alt="" />: 
                        <div style={{position: 'absolute', top: '35%', bottom: '35%', left: '35%', right: '35%'}}>
                            <Icon name='Music2'/>
                        </div>}
                        
                    </div>
                </div>}

            <div className="trackItemInfo">
                <div className={style === 'simplify'? "trackMidAlign": "trackTopAlign"}>

                    <div className="trackName ellipsis-one-line">{name}</div>

                    {style !== 'simplify' && 
                    <div className="trackInfo">
                        <span className='explicit-label' style={explicit? {display:'flex'}:{display:'none'}}>E</span>
                        <span className="trackArtists ellipsis-one-line">
                            {artists.map((artist) => (
                                <a href={`/artist/${artist.id}`} key={artist.id}>{artist.name}</a>
                            ))}
                        </span>
                        {album && 
                            <>
                                <span className='trackInfoSep'>•</span>
                                <span className="trackAlbum ellipsis-one-line">
                                    <a href={`/ablum/${album.id}`}>{album.name}</a>
                                </span>
                            </>
                        }
                    </div>}
                    
                </div>
            </div>

            <div className="trackItemDuration">
                <div className={`duration ${style ==='simplify' ? 'trackMidAlign': 'trackTopAlign'}`}>
                    <span>{formattedTime}</span>
                </div>
            </div>

        </li>
    )
})

const simplyStyle = {
    display: 'flex',
    alignItems:'center',
    justifyContent: 'flex-end'
}


export default TrackListItem