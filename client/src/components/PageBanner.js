import React from 'react'

export default function PageBanner({pageTitle, bannerInfo}) {
    const {name, description, user, followers, primary_color, images} = bannerInfo
    let formattedLikes
    let imgUrl 
    if (images.length > 0){
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
                <h1 className="bannerTitle">{name}</h1>
                <p className="bannerDescription">{description}</p>
                <div className="additionalInfo">
                    <a href={`/user/${user.id}`}>{user.display_name}</a>
                    <h2>{formattedLikes} likes</h2>
                </div>
            </div>
            <div className="bannerOverlay"></div>
        </div>
    )
}
