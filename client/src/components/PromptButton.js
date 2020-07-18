import React from 'react'

const darkStyle = {
    backgroundColor: 'transparent',
    color: '#fff'
}


const lightStyle = {
    backgroundColor: '#fff',
    color: '#181818'
}

export default function PromptButton({name, style}) {
    return (
        <button className="PromptButton" name={name} style={style === 'dark'? darkStyle:lightStyle}>{name}</button>
    )
}
