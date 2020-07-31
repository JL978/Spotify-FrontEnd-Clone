import axios from 'axios'

export default function makeAxiosRequest(endpoint){
    let source = axios.CancelToken.source()
    
    const makeRequest = async () => {
        const cancelToken = source.token
        try{
            var result = await axios.post('http://localhost:4000/', {endpoint})
        }catch (error){
            if (axios.isCancel(error)) return
            return error
        }
        
        return result.data
    }
    
    return [source, makeRequest]
}

    
    
