import axios from 'axios'

const putWithToken = (endpoint, access_token, cancelSource, data) =>{
    const request = async () => {
        const cancelToken = cancelSource.token
        const options = {
            url: endpoint,
            method: 'PUT',
            headers: { 'Authorization': 'Bearer ' + access_token },
            data,
            cancelToken
        };
        
        let result
        try{
            result = await axios(options)
        }catch (err){
            if (axios.isCancel(err)) return
            return err
        }
        return result 
    }
    
    return request
}

export default putWithToken