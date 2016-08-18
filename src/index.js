import React from 'react'
import { render } from 'react-dom'
import rootReducer from './reducers'
import App from './components/App'
import './index.css'

const configureStore = process.env.NODE_ENV === 'development'
  ? require('./store/configureStore.dev').default
  : require('./store/configureStore.prod').default

const store = configureStore(rootReducer)

render(
  <App store={store} />,
  document.getElementById('root')
)
