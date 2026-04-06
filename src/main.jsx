import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import 'pannellum/build/pannellum.css'
import 'pannellum/build/pannellum.js'
import './styles/app.css'
import AppRouter from './app/AppRouter.jsx'
import { initAnalytics, trackEvent } from './lib/analytics.js'

initAnalytics()

registerSW({
  immediate: true,
  onRegistered() {
    trackEvent('pwa_sw_registered')
  },
  onRegisterError(error) {
    trackEvent('pwa_sw_error', { message: String(error) })
  },
  onOfflineReady() {
    trackEvent('pwa_offline_ready')
  },
  onNeedRefresh() {
    trackEvent('pwa_update_available')
  },
})

window.addEventListener('appinstalled', () => {
  trackEvent('pwa_install')
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>,
)
