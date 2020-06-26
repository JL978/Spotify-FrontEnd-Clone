import React, { Component } from 'react';
import ListItem from './ListItem.js'

class OtherPlaylist extends Component {
    render() {
        return (
            <div className="other-playlist-container">
                <ul className="other-list">
                    <ListItem playlist="LoFi Programming Playlist" class='side-list'/>
                    <ListItem playlist="Cant get enough - Aeros" class='side-list'/>
                    <ListItem playlist="Cant get enough" class='side-list'/>
                    <ListItem playlist="Cant get enough - RHCP" class='side-list'/>
                    <ListItem playlist="This Is FKJ" class='side-list'/>
                    <ListItem playlist="This Is Arctiv Monkeys" class='side-list'/>
                    <ListItem playlist="This Is Guns N' Roses" class='side-list'/>
                    <ListItem playlist="Dicover Weekly" class='side-list'/>
                    <ListItem playlist="lofi hip hop music - beats..." class='side-list'/>
                </ul>
            </div>
        );
    }
}

export default OtherPlaylist;
