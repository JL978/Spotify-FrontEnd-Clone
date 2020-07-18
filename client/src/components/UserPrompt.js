import React from 'react'
import PromptButton from './PromptButton'

export default function UserPrompt() {
    return (
        <div className='UserPrompt'>
            <PromptButton name='Sign Up' style='dark'/>
            <PromptButton name='Log In' style='light'/>
        </div>
    )
}
