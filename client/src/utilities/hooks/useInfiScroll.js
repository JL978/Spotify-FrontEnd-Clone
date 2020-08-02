// eslint-disable-next-line
import React, { useState, useRef, useCallback } from 'react';
import makeAxiosRequest from '../makeAxiosRequest'

function useInfiScroll(setList){
    const [next, setNext] = useState(null) 

    const observer = useRef()
    const lastRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && next){
                const [, makeRequest] = makeAxiosRequest(next)
                makeRequest()
                    .then(data => {
                        const resultList = data.items || data.playlists.items
                        const next = data.next || data.playlists.next
                        setList(tracks => [...tracks, ...resultList])
                        setNext(next)
                    })
                    .catch(error => console.log(error))
            }
        })
        if (node) observer.current.observe(node)
    // eslint-disable-next-line
    }, [next])

    return [setNext, lastRef]
}

export default useInfiScroll