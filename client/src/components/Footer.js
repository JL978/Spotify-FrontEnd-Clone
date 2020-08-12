import React, { Component } from 'react';
import CTAbanner from './CTAbanner'
import Player from './Player'

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                {/* <CTAbanner /> */}
                <Player />
            </div>
        );
    }
}

export default Footer;
