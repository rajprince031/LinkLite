import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>

    <ToastContainer />
  </React.Fragment>
)
