import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // Добавляем
import { Provider } from 'react-redux'  // <-- добавляем
import { store } from './store/store'    // <-- добавляем
import App from './App.tsx'
import './index.css'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>              {/* Оборачиваем */}
      <BrowserRouter basename="/ASGARFrontend">  {/* Добавь эту строку */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)