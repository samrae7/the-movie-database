import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import searchService from './services/SearchService/SearchService'

ReactDOM.render(
  <App searchService={searchService}/>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
