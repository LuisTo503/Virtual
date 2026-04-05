import { useEffect, useState } from 'react'
import { SCENES, ROUTES } from '../data/scenes.js'
import styles from './MiniMap.module.css'
import { trackEvent } from '../lib/analytics.js'

const MAP_POINTS = {
  exterior: { x: 18, y: 72 },
  lobby: { x: 26, y: 58 },
  piscina: { x: 40, y: 54 },
  patio_sillas: { x: 33, y: 44 },
  patio_ninos: { x: 18, y: 36 },
  usos_multiples: { x: 58, y: 44 },
  proyecciones: { x: 72, y: 40 },
  squash: { x: 78, y: 56 },
  sky_lounge: { x: 66, y: 20 },
  vestibulo_d3: { x: 50, y: 72 },
  sala_fam_d3: { x: 62, y: 70 },
  pasillo: { x: 72, y: 70 },
  terraza_d3: { x: 86, y: 66 },
  balcon: { x: 88, y: 80 },
  bano: { x: 82, y: 88 },
}

export default function MiniMap({ currentSceneId, activeRoute, visitedIds, onSceneSelect }) {
  const [collapsed, setCollapsed] = useState(false)
  const route = ROUTES[activeRoute]
  const sceneIds = route?.sceneIds || []

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCollapsed(window.innerWidth <= 900)
    }
  }, [])

  const polyline = sceneIds
    .map((id) => MAP_POINTS[id])
    .filter(Boolean)
    .map((point) => `${point.x},${point.y}`)
    .join(' ')

  return (
    <div className={`${styles.minimap} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.topRow}>
        <div className={styles.title}>Mapa ficticio del recorrido</div>
        <button
          type="button"
          className={styles.toggleBtn}
          onClick={() => {
            const next = !collapsed
            setCollapsed(next)
            trackEvent('map_toggle', {
              scene_id: currentSceneId,
              route_id: activeRoute,
              collapsed: next,
            })
          }}
        >
          {collapsed ? 'Mapa' : 'Ocultar'}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className={styles.mapWrap}>
            <svg viewBox="0 0 100 100" className={styles.mapSvg} aria-label="Mapa de referencia">
              <rect x="6" y="10" width="88" height="84" rx="12" className={styles.mapShell} />
              <path d="M14 66 C26 54, 34 44, 48 46 S74 54, 88 44" className={styles.zoneCommon} />
              <path d="M52 64 C64 60, 80 62, 90 76" className={styles.zoneSuite} />
              <path d="M52 30 C64 20, 72 22, 84 32" className={styles.zoneAmenity} />
              {polyline && <polyline points={polyline} className={styles.routeLine} />}
              {sceneIds.map((id) => {
                const scene = SCENES[id]
                const point = MAP_POINTS[id]
                if (!scene || !point) return null
                const isActive = id === currentSceneId
                const isVisited = visitedIds.has(id)
                return (
                  <g key={id} className={styles.mapNode} onClick={() => {
                    trackEvent('map_node_click', {
                      scene_id: currentSceneId,
                      target_scene_id: id,
                      route_id: activeRoute,
                    })
                    onSceneSelect(id)
                  }}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isActive ? 4.8 : 3.7}
                      className={`${styles.nodeCircle} ${isActive ? styles.active : ''} ${isVisited && !isActive ? styles.visited : ''}`}
                    />
                    <text x={point.x} y={point.y + 0.9} textAnchor="middle" className={styles.nodeText}>
                      {scene.icon}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
          <div className={styles.legend}>
            <span className={styles.legendItem}>Ruta: {route?.label}</span>
            <span className={styles.legendItem}>Escena: {SCENES[currentSceneId]?.title}</span>
          </div>
        </>
      )}
    </div>
  )
}
