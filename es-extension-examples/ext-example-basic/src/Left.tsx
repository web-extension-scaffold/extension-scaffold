import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import type { ExtensionScaffoldApi } from '@moesol/es-runtime/build/es-api'
import { addCenterPanel, addDiagonalStaggerPanel, addModalPanel, addModelessPanel, addTiledStaggerPanel, moveLeftToRight, moveRightToLeft } from './ext-react-basic'
import { Amplify } from './Amplify'
import { SampleModal } from './SampleModal'

export const Left: React.FC<{ es: ExtensionScaffoldApi }> = ({ es }) => {

    function handleAddCenter() {
        addCenterPanel(es)
    }
    function handlePopOut() {
        es.chrome.panels.popOutPanel('ext.basic.left')
    }
    function handlePopIn() {
        es.chrome.panels.popInPanel('ext.basic.left')
    }
    function handleHide() {
        es.chrome.panels.hidePanel('ext.basic.left')
    }
    function handleMoveToRight() {
        moveLeftToRight(es)
    }
    function handleMoveToLeft() {
        moveRightToLeft(es)
    }
    function showExampleContent() {
        const e = es.chrome.ribbonBar.showRibbonTab('Example Content')
    }

    function hideExampleContent() {
        const e = es.chrome.ribbonBar.hideRibbonTab('Example Content')
    }

    function handleModelessDialog() {
        addModelessPanel(es, 'ext.example.basic.modeless')
    }
    function handleModalDialog() {
        addModalPanel(es, 'ext.example.basic.modal')
    }
    function handleModelessDialog2() {
        addModelessPanel(es, 'ext.example.basic.modeless.2')
    }
    function handleDiagonalStaggeredModelessDialog() {
        addDiagonalStaggerPanel(es, `ext.example.stagger-${uuidv4()}`)
    }
    function handleTiledStaggeredModelessDialog() {
        addTiledStaggerPanel(es, `ext.example.stagger-${uuidv4()}`)
    }
    function handleIframeModeless() {
        es.chrome.panels.addPanel({
            id: 'basic.iframe.modeless',
            location: 'modeless',
            iframeSource: '/foo/bar',
            hideButton: true,
            initialWidthOrHeight: {
                width: '30em',
                height: '40em'
            }
        }).catch(() => {
            es.chrome.panels.showPanel('basic.iframe.modeless')
        })
    }

    return <div style={{
        padding: '1em',
    }}>
        Left example
        <p></p>
        <div>
            <button onClick={handleAddCenter}>Add Center</button>
        </div>
        <div>
            <button onClick={handlePopOut}>Pop Out</button>
        </div>
        <div>
            <button onClick={handlePopIn}>Pop In</button>
        </div>
        <div>
            <button onClick={handleHide}>X</button>
        </div>
        <div>
            <button onClick={handleMoveToRight}>Move to Right</button>
        </div>
        <div>
            <button onClick={handleMoveToLeft}>Move to Left</button>
        </div>
        <div>
            <button onClick={showExampleContent}>Show Example Content Tab</button>
        </div>
        <div>
            <button onClick={hideExampleContent}>Hide Example Content Tab</button>
        </div>

        <Amplify es={es} />

        <SampleModal es={es} />

        <div>
            <button onClick={handleModalDialog}>Modal Dialog</button>
        </div>
        <div>
            <button onClick={handleModelessDialog}>Modeless Dialog</button>
        </div>
        <div>
            <button onClick={handleModelessDialog2}>Second Modeless</button>
        </div>
        <div>
            <button onClick={handleDiagonalStaggeredModelessDialog}>Diagonal Staggered Modeless</button>
        </div>
        <div>
            <button onClick={handleTiledStaggeredModelessDialog}>Tiled Staggered Modeless</button>
        </div>
        <div>
            <button onClick={handleIframeModeless}>IFrame Modeless</button>
        </div>
    </div>
}