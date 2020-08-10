import React, { useEffect, useState } from 'react';
import ListItem from './ListItem.js'
import reqWithToken from '../../utilities/reqWithToken'

//Other playlist component - to be updated with playlists from the spotify api
//The ListItems in here are just placeholders to test out layouts
function OtherPlaylist({token}) {
    const [playlists, setPlaylists] = useState([])

    useEffect(()=> {
    if (token){
        const [source, request] = reqWithToken(`https://api.spotify.com/v1/me/playlists`, token)
        request()
            .then((request) => {
                setPlaylists(request.data.items)
            })
            .catch((error) => console.log(error))
        
        return () => source.cancel()
    }
    })

    return (
        <div className="other-playlist-container">
            <ul className="other-list">
                {playlists.map((playlist) => <ListItem key={playlist.id} name={playlist.name} id={playlist.id}/>)}
            </ul>
        </div>
    );
}






export default OtherPlaylist;
