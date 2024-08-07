import React from 'react'
import ReactDOM from 'react-dom';
import type { ExtensionScaffoldApi } from '@moesol/es-runtime/build/es-api'
import { publishJson, subscribeJson } from '@moesol/inter-widget-communication';

export async function addLeftWithCounter(es: ExtensionScaffoldApi) {
    const span = document.createElement('span')
    span.style.writingMode = "tb"
    span.style.transform = "rotate(180deg)"

    ReactDOM.render(<TabWithCounter es={es} />, span)

    const panelDiv = await es.chrome.panels.addPanel({
        id: 'ext.basic.left.with.counter',
        title: 'Basic Left',
        icon: span,
        location: 'left',
    })

    ReactDOM.render(
        <React.StrictMode>
          <LeftWithCounter es={es} />
        </React.StrictMode>,
        panelDiv
      )
    
}

const TabWithCounter: React.FC<{es: ExtensionScaffoldApi}> = ({es}) => {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        subscribeJson('es.example.basic.count.change', (_, message: any) => {
            if (message.change) {
                setCount(c => c + message.change)
            }
        })
    }, [])
    return <>Messages ({count})</>
}

export const LeftWithCounter: React.FC<{ es: ExtensionScaffoldApi }> = ({ es }) => {

    function handleAdd() {
        publishJson('es.example.basic.count.change', { change: 1 })
    }
    function handleSubtract() {
        publishJson('es.example.basic.count.change', { change: -1 })
    }

    return <div style={{
        padding: '1em',
    }}>
        <div>
            <button onClick={handleAdd}>Add</button>
        </div>
        <div>
            <button onClick={handleSubtract}>Subtract</button>
        </div>
    </div>
}
