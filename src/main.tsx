import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { detectLanguageByGeo } from './i18n'

// One-time IP-based language detection (no-op if the user already chose a
// language or geo already resolved). Fire-and-forget; never blocks first paint.
void detectLanguageByGeo()

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element #root not found')

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
