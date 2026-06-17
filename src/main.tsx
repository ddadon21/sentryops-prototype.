import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { ActivityProvider } from './contexts/ActivityContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ActivityProvider>
        <App />
      </ActivityProvider>
    </ThemeProvider>
  </StrictMode>,
)
