var client_id = process.env.REACT_APP_CLIENT_ID 
var client_secret = process.env.REACT_APP_CLIENT_SECRET

const axios = require('axios')
const qs = require('querystring')

const client_auth = ()=>{
    return new Promise((res, rej) =>{
        const config = {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            }
        }
    
        const authOptions = {
            grant_type: 'client_credentials'
        }

        axios.post('https://accounts.spotify.com/api/token', qs.stringify(authOptions), config)
            .then((response) => res(response.data.access_token))
            .catch((error) => {
                console.log(error)    
                rej(error)
            })
    })
}

export default client_auth