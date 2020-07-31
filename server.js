const {client_id, client_secret} = require('./client_key')

const axios = require('axios')
const qs = require('querystring')

const cors = require('cors')
const express = require('express')
const http = require('http')

const PORT = process.env.PORT || 4000

const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const client_auth = ()=>{
    return new Promise((res, rej) =>{
        const config = {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
            }
        }
    
        const authOptions = {
            grant_type: 'client_credentials'
        }

        axios.post('https://accounts.spotify.com/api/token', qs.stringify(authOptions), config)
            .then((response) => res(response.data.access_token))
            .catch((error) => rej(error))
    })
}

const authed_header = (token) => ({
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + token
    }
})

app.post('/', (req, res) => {
    const endpoint = req.body.endpoint
    client_auth()
        .then((token) => {
            axios.get(endpoint, authed_header(token))
                .then((response) => {
                    res.status(200).send(response.data)
                })
                .catch((error) => {
                    console.log(error)
                    res.send(error)
                })
        })
        .catch((error) => res.send(error))
})


server.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))