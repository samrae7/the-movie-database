import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import { getApiVars, ApiVars } from './ApiVars'

getApiVars()
  .then((apiVars: ApiVars) => {
    ReactDOM.render(
      // TODO look at wrapping App component in a HOC to get apiVars instead of thw way it is here (wrapped in promise chain)
      // also add catch block
      <App />,
      document.getElementById('root') as HTMLElement
    )
    registerServiceWorker()
  })



