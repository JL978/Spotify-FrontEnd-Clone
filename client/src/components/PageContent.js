import React from 'react'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import {Switch, Route} from 'react-router-dom'

export default function PageContent() {
    return (
        <div className="page-content">
            <Switch>
                <Route exact path='/'>
                    <HomePage />
                </Route>
                <Route path='/search'>
                    <SearchPage />
                </Route>
            </Switch>
        </div>
    )
}
