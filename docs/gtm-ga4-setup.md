# GTM Y GA4

Esta app ya envia eventos al `dataLayer`, asi que `Google Tag Manager` es la capa principal para analitica web en produccion.

## IDs actuales

- `GTM Container ID`: `GTM-MSKC5KW4`
- `GA4 Measurement ID`: `G-050426`

## Variables de entorno

En local y en Vercel deben existir:

```env
VITE_GTM_ID=GTM-MSKC5KW4
VITE_GA4_MEASUREMENT_ID=G-050426
```

## Como funciona en el proyecto

- el frontend inicializa `dataLayer`
- inyecta el contenedor de `Google Tag Manager`
- empuja eventos del recorrido con `trackEvent(name, payload)`

Archivo principal:

- `src/lib/analytics.js`

## Eventos ya disponibles para GTM

- `analytics_ready`
- `scene_view`
- `route_change`
- `hotspot_click`
- `info_panel_open`
- `quiz_answer`
- `dragdrop_complete`
- `audio_play`
- `video_open`
- `map_toggle`
- `map_node_click`
- `pwa_install`
- `pwa_sw_registered`
- `pwa_offline_ready`
- `pwa_update_available`

## Configuracion recomendada dentro de GTM

### 1. Tag de configuracion GA4

Crea un tag de `Google Analytics: GA4 Configuration` con:

- `Measurement ID`: `G-050426`
- Trigger: `Initialization - All Pages`

### 2. Variables de capa de datos

Crea variables de tipo `Data Layer Variable` para:

- `scene_id`
- `route_id`
- `hotspot_type`
- `target_scene_id`
- `quiz_kind`
- `quiz_index`
- `is_correct`
- `video_id`

### 3. Eventos recomendados a enviar a GA4

Los mas utiles por ahora:

- `scene_view`
- `route_change`
- `hotspot_click`
- `quiz_answer`
- `dragdrop_complete`
- `video_open`
- `audio_play`
- `pwa_install`

### 4. Conversiones recomendadas en GA4

Cuando empiece a llegar trafico real, marca como conversiones:

- `pwa_install`
- `quiz_answer`
- `video_open`

## Importante

No envies los mismos eventos a GA4 por dos caminos distintos a la vez.

La recomendacion aqui es:

- usar `GTM` para enviar a `GA4`
- no instalar `gtag.js` directo por separado

Asi evitamos doble conteo.

## En Vercel

En `Project Settings > Environment Variables`, agrega:

```env
VITE_GTM_ID=GTM-MSKC5KW4
VITE_GA4_MEASUREMENT_ID=G-050426
```

Luego haz un redeploy.
