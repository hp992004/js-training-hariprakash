import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './contexts/theme-context'
import { InternProvider } from './contexts/intern-context'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <InternProvider>
        <App />
      </InternProvider>
    </ThemeProvider>
  </StrictMode>
)
