import React from 'react'
import PromptButton from './PromptButton'

export default function UserPrompt() {
    return (
        <div className='UserPrompt'>
            <PromptButton name='Sign Up' styleName='dark'/>
            <PromptButton name='Log In' styleName='light'/>
        </div>
    )
}
