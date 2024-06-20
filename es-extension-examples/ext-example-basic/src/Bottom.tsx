import React from 'react'
import type { ExtensionScaffoldApi } from "@moesol/es-runtime/build/es-api"
import './Center2.css'

export const Bottom: React.FC<{ 
    es: ExtensionScaffoldApi
}> = ({ es }) => {
    return <>
        <link href="http://localhost:9091/index.css" rel="stylesheet"></link>
        <div className="Bottom">Bottom Panel
        </div>
    </>
}
