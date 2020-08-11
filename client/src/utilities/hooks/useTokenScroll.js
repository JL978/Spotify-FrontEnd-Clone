// eslint-disable-next-line
import React, { useState, useRef, useCallback } from 'react';
import reqWithToken from '../reqWithToken'

function useTokenScroll(setList, token, source){
    const [next, setNext] = useState(null) 

    const observer = useRef()
    const lastRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && next){
                const makeRequest = reqWithToken(next, token, source)
                makeRequest()
                    .then(data => {
                        let resultList
                        if (data.items && data.items[0].track){
                            resultList = data.items.map(track => track.track)
                        }else{
                            resultList = data.items || data.playlists.items
                        }
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

export default useTokenScroll