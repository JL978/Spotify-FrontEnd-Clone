import React from 'react'
import HistoryNav from './HistoryNav'
import UserPrompt from './UserPrompt'
import SearchBar from './SearchBar'
import {Switch, Route} from 'react-router-dom'

export default function Headerbar() {
    return (
        <div className="header-bar">
            <HistoryNav />
            <Route exact path='/search'>
                <SearchBar />
            </Route>
            <UserPrompt />
        </div>
    )
}
