import React, {useState, useEffect} from 'react';
import Axios from 'axios';

import Sidebar from './components/Sidebar.js'
import Logo from './components/sidebar-components/Logo.js'
import NavList from './components/sidebar-components/NavList.js'
import NavItem from './components/sidebar-components/NavItem.js'
import PlayLists from './components/sidebar-components/PlayLists.js'
import FeaturedPlaylist from './components/sidebar-components/FeaturedPlaylist.js'
import FeaturedItem from './components/sidebar-components/FeaturedItem.js'
import OtherPlaylist from './components/sidebar-components/OtherPlaylist.js'
import InstallCTA from './components/sidebar-components/InstallCTA.js'

import Player from './components/Player.js'
import Featured from './components/Featured.js'

import getHashParams from './utilities/getHashParams'
import reqWithToken from './utilities/reqWithToken'
import {UserContext} from './utilities/context'


function App() {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setloggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [userInfo, setuserInfo] = useState({})

  useEffect(() => {
    var params = getHashParams();
    const {access_token, error} = params
    
    let infoSource

    if (error){
      setLoading(false)
      //TODO: some form of popup to show that an error has occured
      console.log(error)
    }else{

      if (access_token) {
        setToken(access_token)
        setloggedIn(true)
        window.location.hash = ''

        let requestUserInfo
        [infoSource, requestUserInfo] = reqWithToken('https://api.spotify.com/v1/me', access_token) 
        requestUserInfo()
          .then((response) => {
            setuserInfo(response.data)
          })
          .catch(error => console.log(error))

        setLoading(false)
        //If nothing is found on in the hash params -> check with the server if there is a valid refresh token in the cookie
      }else{
        setloggedIn(false)
        Axios('http://localhost:4000/refresh_token', {withCredentials: true})
          .then((response) => {
            const access_token = response.data.access_token
            setToken(access_token)
            setloggedIn(true)
            
            let requestUserInfo
            [infoSource, requestUserInfo] = reqWithToken('https://api.spotify.com/v1/me', access_token) 
            requestUserInfo()
              .then((response) => {
                setuserInfo(response.data)
              })
              .catch(error => console.log(error))

            //TODO: set loading to false and show the logged in version
            setLoading(false)
          })
          .catch((error) => {
            //TODO: set loading to false and show the non-logged in version
            setLoading(false)
            return
          })
      }
    }

    return (()=> infoSource.cancel())
  }, [])


  return (
    <div className="App">
      {loading? 
        <Loading /> :
        <UserContext.Provider
          value={userInfo}>

            <Sidebar>
              <Logo />
              <NavList>
                <NavItem to='/' name='Home' label='Home' />
                <NavItem to='/search' name='Search' label='Search' />
                <NavItem to='/collection' name='Library' label='Your Library' data_tip='library' data_for='tooltip' data_event='click' style={{ pointerEvents: loggedIn? 'auto':'none'}}/>
              </NavList>
              <PlayLists 
                top={<FeaturedPlaylist>
                        <FeaturedItem label='Liked Songs' loggedIn={loggedIn}/>
                      </FeaturedPlaylist>}
                bottom={<OtherPlaylist token={token}/>}
              />
              {loggedIn? <InstallCTA /> : null}
            </Sidebar>

            <Featured loggedIn={loggedIn}/>

            <Player />

        </UserContext.Provider>
      }
    </div>
  );
}

function Loading(){
  return (
    <h1>Loading...</h1>
  )
}

export default App;
