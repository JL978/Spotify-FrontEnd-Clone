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

app.get('/collections', (req, res) => {
    client_auth()
        .then((token) => {
            const limit = req.query.limit
            axios.get(`https://api.spotify.com/v1/browse/categories?limit=${limit}`, authed_header(token))
                .then((response) => {
                    res.status(200).send(response.data)
                })
                .catch((error) => console.log(error))
        })
        .catch((error) => res.send(error))
})

app.get('/collection/:id', (req,res) => {
    const id = req.params.id
    client_auth()
        .then((token) => {
            axios.get(`https://api.spotify.com/v1/browse/categories/${id}`, authed_header(token))
            .then((response) => {
                res.status(200).send(response.data)
            })
            .catch((error) => console.log(error))
        })
        .catch((error) => {res.send(error)})
})

app.get('/collection/:id/playlists', (req, res) =>{
    const id = req.params.id
    const limit = req.query.limit
    client_auth()
        .then((token) => {
            axios.get(`https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=${limit}`, authed_header(token))
                .then((response) => {
                    res.status(200).send(response.data)
                })
                .catch((error) => console.log(error))
        })
        .catch((error) => res.send(error))
})

app.get('/search', (req, res) => {
    const query = req.query.q
    const limit = req.query.limit
    const type = req.query.type
    
    client_auth()
        .then((token) => {
            axios.get(`https://api.spotify.com/v1/search?query=${query}&limit=${limit}&type=${type}`, authed_header(token))
                .then((response) => {
                    res.status(200).send(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        .catch(error => console.log(error))
}) 

app.get('/playlist/:id', (req, res) => {
    const id = req.params.id
    
    client_auth()
        .then((token) => {
            axios.get(`https://api.spotify.com/v1/playlists/${id}`, authed_header(token))
                .then((response) => {
                    res.status(200).send(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        .catch(error => console.log(error))
}) 


app.get('/playlist/:id/tracks', (req, res) => {
    const id = req.params.id
    const offset = req.query.offset
    const limit = req.query.limit

    client_auth()
        .then((token) => {
            axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks?offset=${offset}&limit=${limit}`, authed_header(token))
                .then((response) => {
                    res.status(200).send(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        .catch(error => console.log(error))
}) 


server.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))