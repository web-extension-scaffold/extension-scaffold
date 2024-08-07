import * as React from 'react'
import type { ExtensionScaffoldApi } from '@moesol/es-runtime/build/es-api'

export const MyPanel: React.FC<{ es: ExtensionScaffoldApi }> = ({ es }) => {
    function handleClick() {
        es.chrome.panels.hidePanel('ext.example.vite')
    }
    const css = `
    .inner {
        padding: 1em;
    }
    `
    return <>
        <style>{css}</style>
        <div className="panel">
            <div className="inner">MyPanel - vite&nbsp;
                <button title="Close" onClick={handleClick}>X</button>
            </div>
        </div>
    </>

}
