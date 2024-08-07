import React from 'react'
import ReactDOM from 'react-dom';
import type { ExtensionScaffoldApi } from '@moesol/es-runtime/build/es-api'
import { Center2 } from './Center2';
import './MyPanel.css';
import { claimStyleFromHeadElement } from './lib/claimStyleFromHeadElement';

export const MyPanel: React.FC<{
    es: ExtensionScaffoldApi
}> = ({ es }) => {
    function handleClick() {
        console.log('basic clicked')
    }
    function handleMaximize() {
        es.chrome.panels.maximizePanel('ext.example.basic')
    }
    function handleRestore() {
        es.chrome.panels.restorePanel('ext.example.basic')
    }
    function handleClose() {
        es.chrome.panels.removePanel('ext.example.basic')
    }
    function handleAddCenter() {
        es.chrome.panels.addPanel({
            id: 'ext.example.basic.2',
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
        claimStyleFromHeadElement(div, '#ext.example.basic')
    }
    function handleShowRollupPanel() {
        es.chrome.panels.showPanel('ext.example.rollup')
    }
    function handleShowBasic() {
        es.chrome.panels.showPanel('ext.basic.left')
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
            <button onClick={handleShowBasic}>Show Basic</button>
        </div>
    </div>
    </>
}
