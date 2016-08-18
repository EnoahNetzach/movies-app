import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Routes from '../Routes'

const App = ({ store, history }) => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Routes history={history} dispatch={store.dispatch} />
    </MuiThemeProvider>
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default App
