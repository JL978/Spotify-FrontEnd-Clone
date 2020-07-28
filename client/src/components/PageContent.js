import React from 'react'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import GenrePage from './GenrePage'
import PlayListPage from './PlayListPage'
import {Switch, Route} from 'react-router-dom'

export default function PageContent({query}) {
    return (
        <Switch>
            <Route exact path='/'>
                <HomePage />
            </Route>
            <Route path={`/search`}>
                <SearchPage query={query}/>
            </Route>
            <Route path='/genre'>
                <GenrePage />
            </Route>
            <Route path='/playlist'>
                <PlayListPage />
            </Route>
        </Switch>
    )
}
