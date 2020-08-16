import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ConnectDevicesItem from './ConnectDevicesItem'
import reqWithToken from '../utilities/reqWithToken'
import putWithToken from '../utilities/putWithToken'


const ConnectDevices = ({token}) => {
    const [devices, setDevices] = useState([])

    useEffect(() => {
        const source = axios.CancelToken.source()
        const requestDevices = reqWithToken('https://api.spotify.com/v1/me/player/devices', token, source) 

        requestDevices()
            .then(response => {
                const _devices = response.data.devices
                setDevices(_devices)
            })
            .catch(error => console.log(error))

        return () => source.cancel()
    }, [])

    const switchDevice = (e) => {
        const id = e.currentTarget.dataset.id
        const source = axios.CancelToken.source()
        const data = {device_ids:[id]}
        const reqTransfer = putWithToken('https://api.spotify.com/v1/me/player', token, source ,data)
        reqTransfer()
            .then(response => {
                if (response.status === 204){
                    const _devices = devices.map((device) => {
                        if (device.id === id){
                            return {...device, is_active: true}
                        }else{
                            return {...device, is_active: false}
                        }
                    })
                    setDevices(_devices)
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='connect-devices'>
            <div className='connect-devices-content'>
                <div className='connect-devices-title'>
                    <h1>Connect to a device</h1>
                    <p>Due to the limitation of the Spotify API, no streaming is available from this app.</p>
                    <br></br>
                    <p>This app, however, works as a remote controller - log in to an official Spotify app to checkout this feature</p>
                </div>
                <div className='cd-img'>
                    <img loading='lazy' src="https://open.scdn.co/cdn/images/connect_header@1x.ecc6912d.png" alt="" draggable='false'/>
                </div>

                {devices.length === 0? 
                    <ConnectDevicesItem name='No devices available' disable/>:
                    devices.map((device, index) => {
                        return <ConnectDevicesItem name={device.name} key={index} active={device.is_active} id={device.id} onClick={switchDevice}/>
                    })    
                }

            </div>
        </div>
    );
}



export default ConnectDevices;
