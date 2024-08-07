import type {
    ExtensionScaffoldApi, LoadWebpackScriptOptions,
    GridState, Chrome, Fulfilled, Rejected, RibbonBar
} from '../es-api'
import {
    applyGridState
} from '../utils'

import { PanelsImpl } from './PanelsImpl'
import { EventEmitter } from 'events'
import '../web-components/PanelHeaderBar'

class NullRibbonBar implements RibbonBar {
    claimRibbonTab(title: string) { return null }
    claimRibbonPanel(id: string) { return null }
    showRibbonTab(id: string)  { return null }
    hideRibbonTab(id: string)  { return null }
}
class ChromeImpl implements Chrome {
    public ribbonBar: RibbonBar = new NullRibbonBar()
    readonly panels = new PanelsImpl()
}

class ApiImpl implements ExtensionScaffoldApi {
    private _gridContainer?: HTMLElement
    private _context: any = undefined;

    readonly chrome = new ChromeImpl()
    readonly events = new EventEmitter()
    get gridContainer(): HTMLElement {
        if (!this._gridContainer) {
            throw new Error('boot method must be called before accessing this property')
        }
        return this._gridContainer
    }

    /**
     * Warning: this API is under consideration. The `context` may be added
     * as a parameter to `boot`
     * 
     * @deprecated
     * @param context 
     */
    setContext(context: any | null) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
    boot(gridContainer: HTMLElement | null) {
        if (!gridContainer) {
            throw new Error('Missing gridContainer')
        }
        this._gridContainer = gridContainer
        this.gridContainer.classList.add('grid-container')

        const gridPortal = document.createElement('div')
        gridPortal.classList.add('grid-panel', 'portal')
        this.gridContainer.append(gridPortal)

        // Pass down the grid container
        this.chrome.panels.gridContainer = this.gridContainer
    }

    loadExtensions(urls: string[], gridState?: GridState): Promise<(Fulfilled | Rejected)[]> {
        function fulfilled<T>(value: T) {
            return {
                status: 'fulfilled' as const,
                value,
            }
        }
        function rejected<E>(reason: E) {
            console.error('Failed to load extension', reason)
            return {
                status: 'rejected' as const,
                reason,
            }
        }
        function allDone<T>(value: T) {
            if (gridState) {
                applyGridState(gridState)
            }
            return value
        }
        const promises = urls.map(url => this.loadExtension(url))
        const mappedPromises = promises.map(promise => promise.then(fulfilled).catch(rejected))
        return Promise.all(mappedPromises).then(allDone)
    }


    loadWebpackScript({ url, library }: LoadWebpackScriptOptions) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = url
            script.onload = (_evt) => {
                const loadedLibrary = window[library as keyof Window] as any
                if (loadedLibrary && loadedLibrary.activate) {
                    loadedLibrary.activate(this)
                    resolve(loadedLibrary)
                } else {
                    reject(new Error('Extension missing activate function'))
                }
            }
            script.onerror = reject
            document.head.appendChild(script)
        })
    }

    private async loadExtension(url: string) {
        const module = await import(/* @vite-ignore */ url)
        return this.activateExtension(module, url)
    }

    private async activateExtension(module: any, url: string) {
        if (module.activate) {
            return module.activate(extensionScaffold, url, this._context)
        } else {
            throw new Error(`Extension does not export activate: ${url}`)
        }
    }

    provideRibbonBar(ribbonBar: RibbonBar) {
        const old = this.chrome.ribbonBar
        this.chrome.ribbonBar = ribbonBar
        return old
    }
}

export const extensionScaffold = new ApiImpl()
