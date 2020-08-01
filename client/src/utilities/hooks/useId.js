// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom'

function useId(page) {
    const [id, setId] = useState('')
    const location = useLocation()

    useEffect(() => {
        const path = location.pathname.split('/')

        if (path.length === 3){
            setId(path[path.length-1])
        }else if (path.length > 3){
            const idIndex = path.findIndex(page) + 1
            setId(path[idIndex])
        }else{
            setId('')
        }
    }, [location, page])

    return id
}

export default useId