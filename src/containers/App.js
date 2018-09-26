import React from 'react'
import {Provider} from 'react-redux'
import configureStore from '../redux/configureStore'
import ThemedApp from './ThemedApp'
import DashConnect from './DashConnect'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <ThemedApp>
      <DashConnect />
    </ThemedApp>
  </Provider>
)

export default App
