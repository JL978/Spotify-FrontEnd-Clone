import React, { useState } from 'react';
import Headerbar from './Headerbar'
import PageContent from './PageContent'

function Featured (){
    const [query, setQuery] = useState('')

    const resetQuery = ()=>{
        setQuery('')
    }

    return (
        <div className='featured'>
            <Headerbar query={query} setQuery={setQuery} resetQuery={resetQuery}/>
            <PageContent query={query}/>
        </div>
    );
}

export default Featured;
