import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import Routes from '../Routes'

const App = ({ store, history }) => (
  <Provider store={store}>
    <Routes history={history} dispatch={store.dispatch} />
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default App
