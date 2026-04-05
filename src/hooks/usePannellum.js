/**
 * usePannellum.js
 * Hook que gestiona la instancia del visor Pannellum.
 * Pannellum se carga desde CDN en index.html.
 */
import { useEffect, useRef } from 'react'

export function usePannellum(containerId, scene, onSceneChange) {
  const viewerRef = useRef(null)

  useEffect(() => {
    if (!scene) return

    // Destruir visor anterior si existe
    if (viewerRef.current) {
      viewerRef.current.destroy()
      viewerRef.current = null
    }

    // Esperar a que pannellum esté disponible (cargado desde CDN)
    const initViewer = () => {
      if (typeof window.pannellum === 'undefined') {
        setTimeout(initViewer, 100)
        return
      }

      // Construir config de hotspots para Pannellum
      const hotspots = (scene.hotspots || []).map((hs) => ({
        type: hs.type === 'scene' ? 'scene' : 'info',
        sceneId: hs.targetScene || undefined,
        yaw: hs.yaw,
        pitch: hs.pitch,
        text: hs.text,
        cssClass: hs.cssClass,
        // Si es navegación a escena, callback al cambiar
        clickHandlerFunc: hs.type === 'scene' && onSceneChange
          ? () => onSceneChange(hs.targetScene)
          : undefined,
      }))

      viewerRef.current = window.pannellum.viewer(containerId, {
        type: 'equirectangular',
        panorama: scene.panorama,
        autoLoad: true,
        autoRotate: -1,
        autoRotateInactivityDelay: 4000,
        compass: false,
        showZoomCtrl: false,
        showFullscreenCtrl: false,
        showControls: false,
        yaw: scene.yaw || 0,
        pitch: scene.pitch || 0,
        hfov: scene.hfov || 100,
        hotSpots: hotspots,
      })
    }

    initViewer()

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [scene?.id])

  return viewerRef
}
