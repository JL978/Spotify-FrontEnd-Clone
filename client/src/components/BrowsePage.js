import React from 'react'
import BrowseCard from './BrowseCard'

export default function BrowsePage() {
    return (
        <div className='page-content browsePage'>
            <div className="browseTitle">
                <h1 style={{
                    fontSize: '24px',
                    fontSeight: '700',
                    lineHeight: '28px',
                    letterSpacing: '-.04em',
                    textTransform: 'none',
                }}>Browse All</h1>
            </div>
            <div className="browseGrid">
                <BrowseCard />
                <BrowseCard />
                <BrowseCard />
                <BrowseCard />
                <BrowseCard />
                <BrowseCard />
                <BrowseCard />
            </div>
        </div>
    )
}
