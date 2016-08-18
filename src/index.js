import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import rootReducer from './reducers'
import App from './components/App'
import './index.css'

const configureStore = process.env.NODE_ENV === 'development'
  ? require('./store/configureStore.dev').default
  : require('./store/configureStore.prod').default

const store = configureStore(rootReducer)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <App history={history} store={store} />,
  document.getElementById('root')
)
