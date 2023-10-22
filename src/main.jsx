import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeContextProvider } from './components/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <span style={{
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'grey'
    }}>
      <App />
    </span>
  </ThemeContextProvider>
)
