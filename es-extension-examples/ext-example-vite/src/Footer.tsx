import React from 'react'
import type { ExtensionScaffoldApi } from '@moesol/es-runtime/src/es-api'
import './Footer.css'

export const Footer: React.FC<{ es: ExtensionScaffoldApi }> = ({ es }) => {
    return <div className='header'>EXAMPLE FOOTER</div>
}
