import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import Router from './routes'

import './index.css'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
)
