import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import './index.css'

// Определяем basename в зависимости от окружения
const basename = import.meta.env.PROD ? '/ASGARFrontend' : '/'

// Регистрация Service Worker с правильным путём
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = `${basename}/sw.js`
    navigator.serviceWorker.register(swUrl).then(
      (registration) => {
        console.log('✅ Service Worker registered:', registration.scope)
      },
      (err) => {
        console.log('❌ Service Worker registration failed:', err)
      }
    )
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)