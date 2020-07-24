import React from 'react'
import HistoryNav from './HistoryNav'
import UserPrompt from './UserPrompt'
import SearchBar from './SearchBar'
import {Route} from 'react-router-dom'

export default function Headerbar({query, setQuery, resetQuery}) {
    return (
        <div className="header-bar">
            <HistoryNav />
            <Route exact path='/search'>
                <SearchBar query={query} setQuery={setQuery} resetQuery={resetQuery}/>
            </Route>
            <UserPrompt />
        </div>
    )
}
