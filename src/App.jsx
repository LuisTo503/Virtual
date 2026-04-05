import { useState, useCallback, useEffect } from 'react'
import { SCENES, ROUTES } from './data/scenes.js'
import Sidebar from './components/Sidebar.jsx'
import TourViewer from './components/TourViewer.jsx'
import InfoPanel from './components/InfoPanel.jsx'
import MiniMap from './components/MiniMap.jsx'
import styles from './App.module.css'
import { trackEvent } from './lib/analytics.js'

const DEFAULT_ROUTE = 'libre'

export default function App() {
  const [activeRoute, setActiveRoute] = useState(DEFAULT_ROUTE)
  const [routeIdx, setRouteIdx] = useState(0)
  const [infoOpen, setInfoOpen] = useState(false)
  const [visited, setVisited] = useState(new Set())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const routeSceneIds = ROUTES[activeRoute]?.sceneIds || []
  const currentSceneId = routeSceneIds[routeIdx]
  const currentScene = SCENES[currentSceneId]

  useEffect(() => {
    if (currentSceneId) {
      trackEvent('scene_view', {
        scene_id: currentSceneId,
        route_id: activeRoute,
      })
    }
  }, [activeRoute, currentSceneId])

  const markVisited = useCallback((id) => {
    setVisited((prev) => new Set([...prev, id]))
  }, [])

  const goToScene = useCallback((sceneId) => {
    const idx = routeSceneIds.indexOf(sceneId)

    if (idx >= 0) {
      setRouteIdx(idx)
      markVisited(sceneId)
    } else {
      const libreIds = ROUTES.libre.sceneIds
      const libreIdx = libreIds.indexOf(sceneId)
      if (libreIdx >= 0) {
        setActiveRoute('libre')
        setRouteIdx(libreIdx)
        markVisited(sceneId)
      }
    }

    setInfoOpen(false)
    setMobileMenuOpen(false)
  }, [routeSceneIds, markVisited])

  const navigate = (dir) => {
    const next = (routeIdx + dir + routeSceneIds.length) % routeSceneIds.length
    setRouteIdx(next)
    markVisited(routeSceneIds[next])
    setInfoOpen(false)
  }

  const handleRouteChange = (routeKey) => {
    setActiveRoute(routeKey)
    setRouteIdx(0)
    trackEvent('route_change', { route_id: routeKey })
    const firstId = ROUTES[routeKey]?.sceneIds[0]
    if (firstId) markVisited(firstId)
    setInfoOpen(false)
    setMobileMenuOpen(false)
  }

  const progress = routeSceneIds.length > 0
    ? Math.round(((routeIdx + 1) / routeSceneIds.length) * 100)
    : 0

  return (
    <div className={styles.app}>
      <header className={styles.topbar}>
        <div className={styles.topbarBrand}>
          <div className={styles.logo}>TV</div>
          <div>
            <div className={styles.brandName}>Tour Verde Virtual</div>
            <div className={styles.brandSub}>Exploracion 360</div>
          </div>
        </div>

        <div className={styles.topbarCenter}>
          <span className={styles.routeLabel}>
            {ROUTES[activeRoute]?.label}
          </span>
        </div>

        <button
          type="button"
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? 'Cerrar' : 'Menu'}
        </button>
      </header>

      <div className={styles.body}>
        <Sidebar
          currentSceneId={currentSceneId}
          activeRoute={activeRoute}
          visitedIds={visited}
          onSceneSelect={goToScene}
          onRouteSelect={handleRouteChange}
        />

        {mobileMenuOpen && (
          <div className={styles.mobileMenuOverlay} onClick={() => setMobileMenuOpen(false)}>
            <div className={styles.mobileMenuDrawer} onClick={(event) => event.stopPropagation()}>
              <div className={styles.mobileMenuHeader}>
                <div className={styles.mobileMenuTitle}>Rutas y escenas</div>
                <button
                  type="button"
                  className={styles.mobileMenuClose}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cerrar
                </button>
              </div>
              <Sidebar
                currentSceneId={currentSceneId}
                activeRoute={activeRoute}
                visitedIds={visited}
                onSceneSelect={goToScene}
                onRouteSelect={handleRouteChange}
                mobile
              />
            </div>
          </div>
        )}

        <div className={styles.viewerArea}>
          <TourViewer
            scene={currentScene}
            onPrev={() => navigate(-1)}
            onNext={() => navigate(1)}
            onSceneChange={goToScene}
            onInfoRequest={() => {
              trackEvent('info_panel_open', { scene_id: currentSceneId })
              setInfoOpen(true)
            }}
          />

          <MiniMap
            currentSceneId={currentSceneId}
            activeRoute={activeRoute}
            visitedIds={visited}
            onSceneSelect={goToScene}
          />

          <InfoPanel
            scene={currentScene}
            isOpen={infoOpen}
            onClose={() => setInfoOpen(false)}
          />
        </div>
      </div>

      <footer className={styles.bottombar}>
        <div className={styles.progressWrap}>
          <span className={styles.progressLabel}>
            {routeIdx + 1} / {routeSceneIds.length} escenas
          </span>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
          <span className={styles.progressPct}>{progress}%</span>
        </div>

        <div className={styles.bottomActions}>
          <button
            className={`${styles.infoBtn} ${infoOpen ? styles.infoBtnActive : ''}`}
            onClick={() => setInfoOpen((open) => !open)}
          >
            {infoOpen ? '- Ocultar info' : '+ Info educativa'}
          </button>
        </div>
      </footer>
    </div>
  )
}
