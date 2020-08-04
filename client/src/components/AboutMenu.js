import React from 'react';
import {Route} from 'react-router-dom'

import AboutNavItem from './AboutNavItem'
import RowGrid from './RowGrid'
import ArtistRow from './ArtistRow'

const AboutMenu = ({id, related, tracks}) => {
    // const {tracks, album, single, appear, compilation, related} = data
    return (
        <>
            <nav className="menuNav">
                <ul className="menuNavList">
                    <AboutNavItem label='Overview' to={`/artist/${id}`}/>
                    <AboutNavItem label='Related Artist' to={`/artist/${id}/related`}/>
                </ul>
            </nav>
            
            <div style={{paddingTop: '1.5em', position:"relative"}}>
                <Route exact path={`/artist/${id}`}>
                    <ArtistRow title='Popular' display='list' list={tracks}/> 
                    <ArtistRow title='Singles and EPs'/> 
                    <ArtistRow title='Compilations'/> 
                    <ArtistRow title='Appears On'/> 
                </Route>
                <Route exact path={`/artist/${id}/related`}>
                    <RowGrid playlists={related}/>
                </Route>
            </div>
        </>
    );
}



export default AboutMenu;
