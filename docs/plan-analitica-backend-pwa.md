# Plan de Analitica, Backend y PWA

## Objetivo

Definir la ruta mas factible para llevar `tour-verde-virtual` a una base mas solida en:

- analitica de producto y marketing
- almacenamiento de eventos
- dashboard interno
- experiencia movil instalable
- soporte offline parcial

La recomendacion prioriza velocidad de implementacion y bajo costo operativo.

## Stack Recomendado

### Frontend

- React + Vite
- `posthog-js` para analitica de producto
- `vite-plugin-pwa` para PWA
- Workbox via `vite-plugin-pwa`
- Google Tag Manager
- Google Analytics 4

### Backend y Base de Datos

- Supabase como backend mas factible por ahora
- PostgreSQL como base de datos

### Dashboard Interno

- Metabase conectado a PostgreSQL

## Decision Principal

### Opcion elegida por ahora

Usar:

- Supabase
- PostgreSQL
- PostHog
- GA4 + GTM
- PWA con Workbox

### Por que no Node.js + Express en esta etapa

Node.js + Express sigue siendo valido, pero en esta fase implicaria:

- crear API manual
- definir autenticacion y seguridad
- construir persistencia y endpoints desde cero
- mayor tiempo de mantenimiento

Para un MVP funcional y medible, Supabase reduce mucho la complejidad.

## Fases de Implementacion

## Fase 1: PWA + Analitica Base

### Objetivo

Hacer la app instalable y empezar a medir uso real.

### Tareas

1. Integrar `vite-plugin-pwa`
2. Crear manifest de la app
3. Configurar iconos base
4. Activar service worker con Workbox
5. Cachear shell de la app
6. Cachear panoramas recientes
7. Integrar `posthog-js`
8. Definir capa de tracking de eventos del tour

### Eventos iniciales recomendados

- `app_loaded`
- `scene_view`
- `route_change`
- `hotspot_click`
- `info_panel_open`
- `quiz_answer`
- `dragdrop_complete`
- `audio_play`
- `video_open`
- `map_node_click`

### Resultado esperado

- app instalable en movil
- experiencia mas estable en mala conectividad
- trazabilidad de uso basica

## Fase 2: Persistencia en Supabase

### Objetivo

Guardar eventos y sesiones en PostgreSQL para consulta interna.

### Tareas

1. Crear proyecto Supabase
2. Crear tablas principales
3. Conectar frontend con Supabase
4. Enviar eventos importantes en segundo plano
5. Guardar metadata minima de sesion y dispositivo

### Tablas sugeridas

#### `sessions`

- `id`
- `created_at`
- `anonymous_id`
- `device_type`
- `viewport`
- `route_initial`
- `entry_scene`
- `referrer`

#### `scene_views`

- `id`
- `session_id`
- `scene_id`
- `route_id`
- `entered_at`
- `duration_ms`

#### `hotspot_events`

- `id`
- `session_id`
- `scene_id`
- `hotspot_type`
- `target_scene_id`
- `clicked_at`

#### `quiz_attempts`

- `id`
- `session_id`
- `scene_id`
- `quiz_kind`
- `quiz_index`
- `selected_answer`
- `is_correct`
- `answered_at`

#### `interaction_events`

- `id`
- `session_id`
- `scene_id`
- `event_name`
- `payload_json`
- `created_at`

## Fase 3: Dashboard Interno con Metabase

### Objetivo

Ver comportamiento de usuarios y rendimiento del recorrido.

### Tareas

1. Levantar Metabase
2. Conectarlo a PostgreSQL
3. Crear preguntas base
4. Crear dashboard interno

### Visualizaciones recomendadas

- escenas mas visitadas
- tiempo promedio por escena
- hotspots mas clickeados
- rutas mas usadas
- tasa de apertura del panel educativo
- resultados de quiz por escena
- uso movil vs escritorio

## Fase 4: Marketing y Conversion con GTM + GA4

### Objetivo

Medir trafico, campañas y conversiones de forma estandar.

### Tareas

1. Integrar Google Tag Manager
2. Publicar contenedor con variables del tour
3. Enviar eventos seleccionados a GA4
4. Definir conversiones importantes

### Eventos que si conviene enviar a GA4

- `tour_start`
- `scene_view`
- `route_change`
- `quiz_completed`
- `video_open`
- `pwa_install`

### Eventos que conviene dejar principalmente en PostHog / PostgreSQL

- detalle fino de interacciones
- drag and drop por categoria
- heatmaps
- debugging de uso

## PostHog: uso recomendado

PostHog debe ser la fuente principal para:

- mapas de calor
- grabaciones de sesion si luego se habilitan
- funnels de navegacion
- eventos detallados de producto
- analisis de abandono por escena

## PWA: alcance recomendado

### Meta

Permitir:

- instalar la app sin app store
- abrir rapido desde movil
- mantener cache de shell y activos criticos
- soporte offline parcial del tour

### Cache recomendado

#### Precargar

- HTML principal
- JS/CSS del bundle
- favicon y manifest

#### Runtime cache

- imagenes de `public/360`
- recursos de interfaz

### Limitacion inicial razonable

No intentar cachear absolutamente todas las panoramicas desde el dia uno.
Conviene empezar con:

- shell de la app
- ultimas escenas visitadas
- assets de UI

## Riesgos y Mitigaciones

### Riesgo

Demasiadas herramientas al mismo tiempo.

### Mitigacion

Implementar por fases y validar cada capa antes de seguir.

### Riesgo

Eventos inconsistentes entre herramientas.

### Mitigacion

Definir una nomenclatura unica de eventos desde el inicio.

### Riesgo

Peso excesivo en movil por panoramicas.

### Mitigacion

Cache selectivo, lazy loading y limites de almacenamiento.

## Backlog Tecnico Priorizado

### Sprint 1

- agregar PWA
- agregar manifest
- agregar service worker con Workbox
- integrar PostHog
- definir helper de tracking

### Sprint 2

- crear proyecto Supabase
- crear esquema PostgreSQL
- persistir `sessions`
- persistir `scene_views`
- persistir `interaction_events`

### Sprint 3

- integrar GTM
- integrar GA4
- crear dashboard base en Metabase

### Avance actual

- PWA lista
- Supabase conectado y recibiendo eventos reales
- despliegue en Vercel activo
- base de GTM + GA4 integrada en frontend
- documentacion inicial de Metabase disponible en `docs/metabase-setup.md`
- consultas iniciales de dashboard disponibles en `docs/metabase-queries.sql`

## Convencion de Eventos

Se recomienda una sola capa `trackEvent(name, payload)` en frontend.

### Ejemplo de nombres

- `scene_view`
- `scene_exit`
- `hotspot_click`
- `route_change`
- `info_panel_open`
- `quiz_answer`
- `dragdrop_complete`
- `video_open`
- `audio_play`
- `pwa_install`

## Recomendacion Final

La implementacion mas factible por ahora es:

1. PWA con Workbox
2. PostHog
3. Supabase + PostgreSQL
4. Metabase
5. GTM + GA4

## Siguiente paso recomendado

Empezar por:

- instalar `vite-plugin-pwa`
- crear `manifest`
- dejar base de PostHog

Eso nos da impacto visible rapido y prepara el resto del stack.
