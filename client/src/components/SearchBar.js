import React from 'react'
import Icon from './icons'

export default function SearchBar() {
    return (
        <div className="SearchContainer">
            <div className='SearchBar'>
                <div style={{position:'absolute',
                            top: '0',
                            bottom: '0',
                            left: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            cursor:'text'}}>
                    <Icon name="N-Search" /> 
                </div>
                <input className= 'SearchInput' 
                        maxLength='80' 
                        autoCorrect='off' 
                        autoCapitalize='off' 
                        spellCheck='false'
                        autoFocus='true'
                        placeholder='Search for Artists, Songs, or Podcasts'/>
            </div>
        </div>
    )
}
