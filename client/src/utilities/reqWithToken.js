import axios from 'axios'

const reqWithToken = (endpoint, access_token) =>{
    let source = axios.CancelToken.source()

    const request = async () => {
        const options = {
            url: endpoint,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
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
    
    return [source, request]
}

export default reqWithToken