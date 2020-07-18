import React from 'react'
import HistoryNav from './HistoryNav'
import UserPrompt from './UserPrompt'

export default function Headerbar() {
    return (
        <div className="header-bar">
            <HistoryNav />
            <UserPrompt />
        </div>
    )
}
