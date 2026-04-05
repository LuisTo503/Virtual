import { useEffect, useRef, useState } from 'react'
import styles from './TourViewer.module.css'
import { trackEvent } from '../lib/analytics.js'

const createHotspotMarker = (hotSpotDiv, args) => {
  hotSpotDiv.classList.add(styles.hotspotMarkerWrap)
  hotSpotDiv.innerHTML = `
    <button type="button" class="${styles.hotspotMarker} ${args.variant === 'nav' ? styles.hotspotNav : styles.hotspotInfoBtn}">
      <span class="${styles.hotspotGlyph}">${args.variant === 'nav' ? '>' : 'i'}</span>
      <span class="${styles.hotspotText}">${args.text}</span>
    </button>
  `
}

export default function TourViewer({ scene, onPrev, onNext, onSceneChange, onInfoRequest }) {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const [viewerError, setViewerError] = useState('')

  useEffect(() => {
    if (!scene || !containerRef.current) return

    let cancelled = false

    if (viewerRef.current) {
      try { viewerRef.current.destroy() } catch (_) {}
      viewerRef.current = null
      containerRef.current.innerHTML = ''
    }

    setViewerError('')

    const init = () => {
      if (cancelled) return

      if (typeof window.pannellum === 'undefined') {
        setViewerError('Pannellum no esta disponible en el navegador.')
        return
      }

      try {
        const hotspots = (scene.hotspots || []).map((hs) => {
          const base = {
            pitch: hs.pitch,
            yaw: hs.yaw,
            text: hs.text,
            cssClass: hs.cssClass,
            createTooltipFunc: createHotspotMarker,
          }

          if (hs.type === 'scene') {
            return {
              ...base,
              type: 'info',
              createTooltipArgs: { text: hs.text, variant: 'nav' },
              clickHandlerFunc: onSceneChange
                ? () => {
                    trackEvent('hotspot_click', {
                      scene_id: scene.id,
                      hotspot_type: 'scene',
                      target_scene_id: hs.targetScene,
                    })
                    onSceneChange(hs.targetScene)
                  }
                : undefined,
              clickHandlerArgs: {},
            }
          }

          return {
            ...base,
            type: 'info',
            createTooltipArgs: { text: hs.text, variant: 'info' },
            clickHandlerFunc: onInfoRequest ? () => {
              trackEvent('hotspot_click', {
                scene_id: scene.id,
                hotspot_type: 'info',
              })
              onInfoRequest()
            } : undefined,
            clickHandlerArgs: {},
          }
        })

        viewerRef.current = window.pannellum.viewer(containerRef.current, {
          type: 'equirectangular',
          panorama: scene.panorama,
          autoLoad: true,
          autoRotate: -0.5,
          autoRotateInactivityDelay: 5000,
          compass: true,
          northOffset: scene.northOffset ?? 0,
          showZoomCtrl: false,
          showFullscreenCtrl: false,
          showControls: false,
          yaw: scene.yaw ?? 0,
          pitch: scene.pitch ?? 0,
          hfov: scene.hfov ?? 100,
          hotSpots: hotspots,
        })
      } catch (_) {
        setViewerError(`No se pudo cargar la escena ${scene.panorama}.`)
      }
    }

    init()

    return () => {
      cancelled = true
      if (viewerRef.current) {
        try { viewerRef.current.destroy() } catch (_) {}
        viewerRef.current = null
      }
    }
  }, [scene, onInfoRequest, onSceneChange])

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.panoContainer} id="pannellum-viewer" />

      {viewerError && (
        <div className={styles.viewerError}>
          <div>No se pudo mostrar esta panoramica.</div>
          <div>{viewerError}</div>
        </div>
      )}

      <div className={styles.sceneLabel}>
        <span className={styles.sceneIcon}>{scene?.icon}</span>
        <div>
          <div className={styles.sceneTitle}>{scene?.title}</div>
          <div className={styles.sceneSubtitle}>{scene?.subtitle}</div>
        </div>
      </div>

      <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={onPrev} title="Anterior">
        {'<'}
      </button>
      <button className={`${styles.navBtn} ${styles.navNext}`} onClick={onNext} title="Siguiente">
        {'>'}
      </button>

      <div className={styles.dragHint}>Arrastra para explorar el 360</div>
    </div>
  )
}
