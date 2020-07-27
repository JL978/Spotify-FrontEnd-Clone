import React from 'react'
import SearchRowTitle from './SearchRowTitle'
import SearchRowGrid from './SearchRowGrid'
import {useEffect, useState} from 'react'

import sendConfig from '../utilities/axiosUtils'
import axios from 'axios'

export default function SearchRow({title, type, query}) {
    const [result, setResult] = useState([])
    const [formatedQuery, setformatedQuery] = useState('')

    useEffect(() => {
        const formatedQuery = query.toLowerCase().split().join('+')
        setformatedQuery(formatedQuery)
    }, [query])


    useEffect(() => {
        const [source, config] = sendConfig()
        axios.get(`http://localhost:4000/search?q=${formatedQuery}&limit=9&type=${type}`, config)
            .then((response) => {
                const data = response.data
                const key = Object.keys(data)[0]
                const result = data[key].items
                setResult(result)
            })
            .catch((error) => {
                if (axios.isCancel(error)) return
            })
        
        return () => source.cancel()
    }, [formatedQuery])


    return (
        <div className='CollectionRow'>
            <SearchRowTitle title={title}/>
            <SearchRowGrid type={type} info={result}/>
        </div>
    )
}
