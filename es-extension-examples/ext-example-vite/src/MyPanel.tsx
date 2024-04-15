import React from 'react'
import ReactDOM from 'react-dom';
import type { ExtensionScaffoldApi } from '@moesol/es-runtime/src/es-api'
import { Center2 } from './Center2';
import './MyPanel.css';
import { claimStyleFromHeadElement } from './lib/claimStyleFromHeadElement';

export const MyPanel: React.FC<{
    es: ExtensionScaffoldApi
}> = ({ es }) => {
    function handleClick() {
        console.log('vite clicked')
    }
    function handleMaximize() {
        es.chrome.panels.maximizePanel('ext.example.vite')
    }
    function handleRestore() {
        es.chrome.panels.restorePanel('ext.example.vite')
    }
    function handleClose() {
        es.chrome.panels.removePanel('ext.example.vite')
    }
    function handleAddCenter() {
        es.chrome.panels.addPanel({
            id: 'ext.example.vite.2',
            location: 'center',
        }).then(onPanelAdded)
    }
    function onPanelAdded(div: HTMLDivElement) {
        ReactDOM.render(
            <React.StrictMode>
                <Center2 es={es} />
            </React.StrictMode>,
            div
        );
        // Must be after render above
        claimStyleFromHeadElement(div, '#ext.example.vite')
    }
    function handleShowRollupPanel() {
        es.chrome.panels.showPanel('ext.example.rollup')
    }
    function handleShowVite() {
        es.chrome.panels.showPanel('ext.vite.left')
    }

    return <><div className='MyPanel' onClick={handleClick}>
        MyPanel - with a whole lot of text so that if a panel is over this Panel
        you can still see that something is here.

        <div className='buttons'>
            <button onClick={handleMaximize}>Maximize Me</button>
            <button onClick={handleRestore}>Restore Me</button>
            <button onClick={handleClose}>Close Me</button>
            <button onClick={handleAddCenter}>Add Center</button>
            <button onClick={handleShowRollupPanel}>Show Rollup</button>
            <button onClick={handleShowVite}>Show Vite</button>
        </div>
    </div>
    </>
}
