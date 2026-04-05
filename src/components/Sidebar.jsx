/**
 * Sidebar.jsx
 * Panel lateral con lista de escenas agrupadas y selector de rutas.
 */
import { SCENES, GROUPS, ROUTES } from '../data/scenes.js'
import styles from './Sidebar.module.css'

export default function Sidebar({ currentSceneId, activeRoute, visitedIds, onSceneSelect, onRouteSelect, mobile = false }) {
  const groups = Object.entries(GROUPS)

  return (
    <aside className={`${styles.sidebar} ${mobile ? styles.mobileSidebar : ''}`}>
      {/* Rutas */}
      <div className={styles.routeSection}>
        <div className={styles.sectionLabel}>Rutas</div>
        <div className={styles.routeList}>
          {Object.entries(ROUTES).map(([key, route]) => (
            <button
              key={key}
              className={`${styles.routeBtn} ${activeRoute === key ? styles.active : ''}`}
              onClick={() => onRouteSelect(key)}
            >
              {route.label}
            </button>
          ))}
        </div>
      </div>

      {/* Escenas agrupadas */}
      <div className={styles.sceneSection}>
        {groups.map(([groupId, groupLabel]) => {
          const groupScenes = Object.values(SCENES).filter(s => s.group === groupId)
          return (
            <div key={groupId}>
              <div className={styles.sectionLabel}>{groupLabel}</div>
              {groupScenes.map(scene => {
                const isActive = scene.id === currentSceneId
                const isVisited = visitedIds.has(scene.id)
                return (
                  <button
                    key={scene.id}
                    className={`${styles.sceneItem} ${isActive ? styles.activeScene : ''}`}
                    onClick={() => onSceneSelect(scene.id)}
                  >
                    <div className={`${styles.sceneIcon} ${isVisited ? styles.visitedIcon : ''}`}>
                      {scene.icon}
                    </div>
                    <div className={styles.sceneInfo}>
                      <div className={styles.sceneName}>{scene.title}</div>
                      <div className={styles.sceneTag}>{scene.subtitle}</div>
                    </div>
                    {isVisited && !isActive && (
                      <div className={styles.visitedDot} title="Visitada" />
                    )}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
