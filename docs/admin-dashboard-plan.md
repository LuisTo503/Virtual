# Plan Profesional Del Panel Admin

## 1. Objetivo General

Construir un panel admin propio para `Tour Verde Virtual` que permita:

- monitorear uso real del recorrido
- medir interaccion educativa y navegacion
- visualizar indicadores clave de adopcion, engagement y aprendizaje
- filtrar resultados por fecha, dispositivo, ruta y escena
- tomar decisiones de mejora sobre contenido, UX y rendimiento

El panel debe reemplazar la necesidad inmediata de herramientas externas costosas y aprovechar tanto la base analitica de Supabase como la data agregada de Google Analytics.

## 2. Stack Definido

El panel admin se construira con:

- `React`
- `Recharts`
- `shadcn/ui`

## Stack de datos

Se usara una estrategia hibrida:

- `Supabase` para analitica propia del tour
- `Google Analytics Data API` para metrica web agregada

## Requisito funcional adicional

La primera version debe incluir:

- exportacion `CSV` por rango de fechas

## 3. Objetivos De Negocio

El panel debe responder preguntas como:

- cuantas sesiones reales tiene el recorrido
- que escenas generan mas interes
- que rutas usan mas las personas
- donde interactuan mas con hotspots, audio, video o mapa
- que tan bien funcionan los quizzes
- que escenas impulsan aprendizaje y permanencia
- cuanto pesa el trafico movil frente al de escritorio
- que elementos merecen optimizacion o rediseño
- cuantos usuarios y sesiones web llegan al sitio
- desde que canales o paginas entran

## 4. Audiencia Del Panel

### Perfil 1. Administrador del sistema

Necesita:

- ver estado general del tour
- detectar caidas de interaccion
- revisar adopcion por dia o periodo
- supervisar indicadores de uso movil

### Perfil 2. Equipo pedagogico o de contenidos

Necesita:

- ver que escenas tienen mas apertura educativa
- comparar desempeno de quizzes
- detectar escenas con baja comprension
- decidir donde reforzar audio, video o actividades

### Perfil 3. Equipo de producto o UX

Necesita:

- entender flujos de navegacion
- identificar escenas de abandono
- revisar hotspots poco usados
- mejorar usabilidad y conversion educativa

### Perfil 4. Coordinacion o marketing

Necesita:

- ver trafico web
- revisar usuarios y sesiones
- medir canales
- revisar adopcion general del producto

## 5. Alcance Funcional Inicial

La primera version del panel admin debe incluir:

- login simple de administrador
- dashboard con KPIs principales
- filtros globales por rango de fechas
- filtros por ruta
- filtros por escena
- filtros por dispositivo
- filtros de trafico web
- graficas y tablas resumen
- detalle de sesiones e interacciones
- exportacion CSV por rango de fechas

## 6. Arquitectura Recomendada

## Frontend Admin

- React + Vite
- `shadcn/ui` para cards, tablas, filtros, tabs y componentes del dashboard
- `Recharts` para graficas
- mismo repositorio o modulo admin dentro del proyecto
- componentes de dashboard reutilizables

## Backend Admin

Se recomienda una capa backend delgada para consolidar fuentes.

## Implementacion sugerida

- `Supabase PostgreSQL` como fuente principal del tour
- `Google Analytics Data API` como fuente de trafico web
- vistas SQL o funciones RPC para agregados internos
- endpoints admin para consolidar y normalizar respuestas

## Recomendacion tecnica concreta

- usar `Supabase` como fuente de verdad para interacciones del tour
- usar `GA Data API` como fuente de verdad para trafico y pagina
- consolidar ambas fuentes en endpoints internos del admin
- no consumir tablas crudas ni credenciales sensibles desde frontend

## 7. Fuentes De Datos

## Fuente 1. Supabase

Ideal para medir:

- escenas vistas
- rutas usadas
- hotspots
- quizzes
- audio
- video
- mapa
- PWA
- sesiones internas del recorrido

## Fuente 2. Google Analytics Data API

Ideal para medir:

- usuarios
- sesiones web
- page views
- engagement web
- trafico por pagina
- adquisicion
- canales
- geografia
- dispositivos web

## Regla recomendada

- si el dato vive dentro del recorrido 360, usar `Supabase`
- si el dato es de trafico web agregado, usar `GA Data API`

## 8. Modelo De Datos Disponible

Actualmente ya existen estas tablas:

- `sessions`
- `scene_views`
- `hotspot_events`
- `quiz_attempts`
- `interaction_events`

Estas tablas ya son suficientes para una primera version operativa del dashboard de producto y aprendizaje.

## 9. KPI Recomendados

## 9.1 KPI Ejecutivos

Indicadores para la cabecera del dashboard:

- `Usuarios activos`
- `Sesiones web`
- `Sesiones del tour`
- `Escenas vistas`
- `Promedio de escenas por sesion`
- `Hotspots clickeados`
- `Quizzes respondidos`
- `Porcentaje global de acierto`
- `Uso movil (%)`
- `Eventos de audio`
- `Eventos de video`
- `Instalaciones PWA`

## 9.2 KPI De Navegacion

- `Escenas mas visitadas`
- `Rutas mas usadas`
- `Hotspots mas clickeados`
- `Transiciones entre escenas`
- `Escena de entrada mas frecuente`
- `Profundidad media de recorrido por sesion`

## 9.3 KPI Educativos

- `Apertura del panel informativo`
- `Intentos de quiz por escena`
- `Acierto por escena`
- `Acierto por tipo de quiz`
- `Uso de audio por escena`
- `Uso de video por escena`
- `Engagement educativo por escena`

## 9.4 KPI Tecnicos Y De Producto

- `Sesiones por dia`
- `Eventos por dia`
- `Movil vs desktop`
- `Resoluciones mas frecuentes`
- `Errores registrados`
- `Uso del mapa`
- `Estado de adopcion de PWA`

## 9.5 KPI De Trafico Web

- `Usuarios por dia`
- `Sesiones por dia`
- `Page views`
- `Tiempo de engagement`
- `Canales de adquisicion`
- `Paginas mas visitadas`
- `Dispositivo web`
- `Pais o ciudad`

## 10. Vistas Del Panel

## Vista 1. Resumen General

Debe mostrar:

- tarjetas KPI principales
- resumen web desde GA
- tendencia de sesiones por dia
- distribucion por dispositivo
- top escenas
- top rutas

## Vista 2. Navegacion Del Tour

Debe mostrar:

- escenas mas vistas
- hotspots mas usados
- flujo entre escenas
- rutas mas activas
- sesiones con mayor profundidad de navegacion

## Vista 3. Aprendizaje E Interaccion

Debe mostrar:

- quizzes respondidos
- porcentaje de acierto
- rendimiento por escena
- uso de audio, video e info
- ranking de escenas con mejor engagement educativo

## Vista 4. Analitica De Sesiones

Debe mostrar:

- listado de sesiones
- dispositivo
- ruta inicial
- escena de entrada
- numero de escenas vistas
- numero de interacciones
- ultima actividad

## Vista 5. Salud Del Producto

Debe mostrar:

- instalaciones PWA
- uso del mapa
- errores tecnicos si se registran
- comparativos por fecha

## Vista 6. Trafico Y Adquisicion

Debe mostrar:

- usuarios y sesiones web
- canales de adquisicion
- trafico por pagina
- dispositivos
- localizacion geografica

## 11. Filtros Globales

Todos los modulos del panel deben compartir filtros de:

- fecha desde
- fecha hasta
- dispositivo
- ruta
- escena

Filtros especificos de trafico:

- canal
- pagina
- pais

Filtros opcionales de fase 2:

- tipo de evento
- tipo de quiz
- rango de interacciones por sesion

## 12. Consultas, Endpoints Y Agregaciones

Para rendimiento y mantenibilidad, no conviene construir cada grafica con consultas libres desde frontend.

Se recomienda:

- crear vistas SQL agregadas en PostgreSQL
- crear funciones RPC en Supabase para KPI complejos
- crear endpoints admin que consoliden varias metricas
- crear adaptadores por fuente de datos

## Vistas SQL sugeridas

- `admin_kpi_summary`
- `admin_sessions_daily`
- `admin_top_scenes`
- `admin_top_routes`
- `admin_hotspot_summary`
- `admin_quiz_summary`
- `admin_scene_engagement`
- `admin_device_breakdown`

## Endpoints sugeridos del backend admin

- `GET /api/admin/overview`
- `GET /api/admin/navigation`
- `GET /api/admin/learning`
- `GET /api/admin/sessions`
- `GET /api/admin/traffic`
- `GET /api/admin/export/csv`

## 13. Exportacion CSV

La exportacion CSV debe formar parte de la v1.

## Requerimientos

- exportar por rango de fechas
- respetar filtros activos
- permitir exportar al menos:
  - sesiones
  - escenas vistas
  - hotspots
  - quizzes
  - eventos de interaccion

## Formatos sugeridos

- un CSV por modulo
- o un CSV consolidado por vista activa

## Recomendacion tecnica

- generar CSV en backend
- devolver archivo descargable
- no construir CSV masivos directamente en frontend

## 14. Seguridad

El panel admin no debe consumir las tablas publicas directamente con permisos amplios.

Se recomienda:

- autenticacion de administradores
- rol admin separado
- acceso de solo lectura para analytics
- RLS especifica para vistas o tablas necesarias
- no exponer credenciales sensibles en frontend
- no exponer credenciales de `Google Analytics Data API` en frontend

## Seguridad de fuentes de datos

### Supabase

- acceso via backend o service role segura
- consultas limitadas a vistas y funciones admin

### Google Analytics Data API

- autenticacion via service account
- credenciales solo en backend
- endpoints proxy para el frontend admin

## 15. Roadmap Tecnico

## Fase 1. Fundacion del Admin

- definir ruta `/admin`
- crear layout base
- crear autenticacion admin
- integrar `shadcn/ui`
- integrar `Recharts`
- definir adaptadores de datos
- crear dashboard resumen
- conectar KPIs principales

## Fase 2. Modulos de Navegacion y Aprendizaje

- top escenas
- top rutas
- hotspots
- quiz analytics
- audio y video analytics

## Fase 3. Sesiones y Exportacion

- tabla de sesiones
- filtros avanzados
- detalle por sesion
- exportacion CSV

## Fase 4. Trafico Web Y Adquisicion

- usuarios
- sesiones web
- page views
- canales
- geografia
- dispositivos

## Fase 5. Madurez Analitica

- cohortes simples por fecha
- comparativas periodo actual vs anterior
- alertas por caida de uso
- benchmarking entre escenas

## 16. Requerimientos Tecnicos Adicionales

Para que el panel sea realmente potente, conviene agregar despues estos eventos o mejoras:

- `scene_exit`
- `session_end`
- `info_panel_open` persistido de forma explicita
- `viewer_error`
- `image_load_error`
- tiempo real por escena

Estos no son obligatorios para la primera version, pero aumentan mucho la calidad de analisis.

## 17. Diseño Del Dashboard

Debe verse profesional, claro y utilitario:

- interfaz limpia
- foco en legibilidad
- colores semanticos para KPI
- tablas con ordenamiento
- cards limpias con `shadcn/ui`
- graficas responsivas con `Recharts`
- responsive para escritorio y tablet

No hace falta que el panel admin sea prioritariamente movil en esta fase.

## 18. Recomendacion Final

La mejor ruta por costo, control y velocidad es:

1. construir panel admin propio
2. usar `Supabase` y `Google Analytics Data API` como fuentes complementarias
3. crear capa de agregacion segura en backend
4. lanzar primero dashboard ejecutivo, navegacion y aprendizaje
5. incluir exportacion CSV por fechas desde la v1

## 19. Entregable Recomendado De La Primera Version

La v1 del panel admin deberia incluir:

- login admin
- resumen general con 8 a 12 KPI
- graficas de sesiones, escenas y rutas
- modulo de trafico web
- modulo de quizzes
- modulo de engagement por escena
- tabla de sesiones
- filtros por fecha, escena, ruta y dispositivo
- exportacion CSV por rango de fechas

## 20. Siguiente Paso Recomendado

Diseñar ahora la arquitectura del panel admin en el proyecto y definir:

- estructura de rutas
- fuentes de datos
- endpoints o consultas
- componentes visuales del dashboard
- estrategia de exportacion CSV
