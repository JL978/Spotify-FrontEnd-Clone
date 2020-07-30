import React from 'react'

export default function PageBanner({pageTitle, bannerInfo}) {
    const {name, description, user, followers, primary_color, images,release_date} = bannerInfo
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
                <h1 className="bannerTitle">{name}</h1>
                <p className="bannerDescription" style={{display: description===''? 'none':'flex'}}>{description}</p>
                <div className="additionalInfo">
                    <a href={`/user/${user&&user.id}`}>{user&&user.display_name}</a>
                    <h2>{formattedLikes} likes</h2>
                </div>
            </div>
            <div className="bannerOverlay"></div>
        </div>
    )
}
