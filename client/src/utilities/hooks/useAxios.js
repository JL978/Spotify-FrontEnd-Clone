import {useEffect, useState} from 'react'
import axios from 'axios'
import client_auth from '../authentication'

export default function useAxios(endpoint){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [result, setResult] = useState()

    useEffect(() => {
        let cancelToken = axios.CancelToken.source().token
        setLoading(true)
        setError(false)
        client_auth()
            .then((token) => {
                const config = {...authed_header(token), cancelToken}
                axios.get(endpoint, config)
                    .then((res) => {
                        setLoading(false)
                        setResult(res.data)
                    })
                    .catch((error) => {
                        if (axios.isCancel(error)) return 
                        else{
                            setError(true)
                            console.log(error)
                        }
                    })
            })
            .catch((error) => {
                setError(true)
                console.log(error)
            })
        return () => cancelToken.cancel()

    }, [endpoint])   

    return {loading, error, result}
}


const authed_header = (token) => (
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
            },
    }
) 


    
    
