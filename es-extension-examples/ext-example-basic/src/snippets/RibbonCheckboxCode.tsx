import React from 'react'
import { FormatCode } from './FormatCode'

export const RibbonCheckboxCode = () => {
  const codeString = `
  function toggleBasicLeft() {
    scaffold.chrome.panels.togglePanel('ext.basic.left')
  }
  claimRibbonWith(scaffold, 'settings.group.one', 
    <es-ribbon-section label="Group 1">
      <label><CodeCheckBox />Show Code</label>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <label><input type="checkbox"></input>Show Something</label>
        <label><input type="checkbox"></input>Show Something Else</label>
        <es-ribbon-button onClick={toggleBasicLeft}><div>Show Basic Left</div></es-ribbon-button>
      </div>
    </es-ribbon-section>
  )
  `
  return <FormatCode source={codeString}/>
}
