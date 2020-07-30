import axios from 'axios'
import client_auth from './authentication'

export default function makeAxiosRequest(endpoint){
    let source = axios.CancelToken.source()
    
    const makeRequest = async () => {
        try{
            var token = await client_auth()
        }catch (error){
            if (axios.isCancel(error)) return
            return error
        }
        const cancelToken = source.token
        const config = {...authed_header(token), cancelToken}

        try{
            var result = await axios.get(endpoint, config)
        }catch (error){
            if (axios.isCancel(error)) return
            return error
        }
        
        return result.data
    }
    
    return [source, makeRequest]
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


    
    
