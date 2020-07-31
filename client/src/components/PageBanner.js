import React from 'react'

export default function PageBanner({pageTitle, bannerInfo}) {
    const {name, description, user, followers, primary_color, images, release_date} = bannerInfo
    let formattedLikes
    let imgUrl 
    if (images && images.length > 0){
        imgUrl = images[0].url
    }

    if (followers){
        formattedLikes = followers.total.toLocaleString('en-US')
    }
    return (
        <div className="banner" style={{backgroundColor:`${primary_color}`}}>
            <div className="bannerImgDiv">
                <img loading="lazy" src={imgUrl} className='bannerImg' alt="" />
            </div>
            <div className="bannerInfo">
                <h2 className="pageTitle">{pageTitle}</h2>
                <span style={spanStyle}>
                    <h1 className={name.length > 15? "bannerTitleXL":"bannerTitle"}>{name}</h1>
                </span>
                <p className="bannerDescription" style={{display: description===''? 'none':'flex'}}>{description}</p>
                <div className="additionalInfo">
                    {user&& user[0] && user.map(person => (
                        <a href={`/${person.type}/${person.id}`} key={person.id}>{person.type === 'artist'? person.name:person.display_name}</a>
                    ))}
                    {followers !== 0 &&
                        <h2>{formattedLikes} likes</h2>
                    }
                    {release_date && 
                        <h2>{release_date}</h2>
                    }
                </div>
            </div>
            <div className="bannerOverlay"></div>
        </div>
    )
}


const spanStyle = {
    display: '-webkit-box',
    WebkitLineClamp: '3',
    WebkitBoxOrient: 'vertical',
    marginTop: '4px',
    wordBreak: 'break-word',
    overflow: 'hidden',
}