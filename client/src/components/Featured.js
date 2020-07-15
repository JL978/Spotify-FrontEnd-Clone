import React, { Component } from 'react';
import Headerbar from './Headerbar'
import PageContent from './PageContent'
class Featured extends Component {
    render() {
        return (
            <div className='featured'>
                <Headerbar />
                <PageContent />
            </div>
        );
    }
}

export default Featured;
