import React from 'react'
import PromptButton from './PromptButton'
export default function CTAbanner() {
    return (
        <div className='CTA-banner'>
            <div className="cta-content">
                <h2 style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '16px',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                }}>Preview of spotify</h2>
                <h3 style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '24px',
                    letterSpacing: 'normal',
                    textTransform: 'none'
                }}>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</h3>
            </div>
            <PromptButton name='Sign up free' style='CTA'/>
        </div>
    )
}