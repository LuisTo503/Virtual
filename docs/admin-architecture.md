# Arquitectura Del Modulo Admin

## Objetivo

Definir la estructura tecnica inicial del panel admin para que se pueda implementar sin romper el recorrido principal.

## Decision Arquitectonica

El panel admin vivira dentro del mismo proyecto frontend, pero aislado por modulo.

Esto permite:

- reutilizar Vite y React
- compartir estilos base y utilidades
- mantener un solo deploy en Vercel
- separar claramente la experiencia publica del tour y la experiencia privada de administracion

## Estructura De Carpetas Recomendada

```txt
src/
  admin/
    app/
      AdminApp.jsx
      admin-routes.js
    components/
      layout/
        AdminLayout.jsx
        AdminSidebar.jsx
        AdminTopbar.jsx
      cards/
        KpiCard.jsx
      charts/
        SessionsChart.jsx
        TopScenesChart.jsx
        RoutesChart.jsx
        QuizAccuracyChart.jsx
      filters/
        DashboardFilters.jsx
        DateRangeFilter.jsx
      tables/
        SessionsTable.jsx
        HotspotsTable.jsx
        QuizTable.jsx
    pages/
      OverviewPage.jsx
      NavigationPage.jsx
      LearningPage.jsx
      SessionsPage.jsx
      TrafficPage.jsx
      ExportsPage.jsx
    services/
      admin-api.js
      supabase-admin-service.js
      ga-admin-service.js
      export-service.js
    hooks/
      useAdminFilters.js
      useDashboardQuery.js
    utils/
      formatters.js
      csv.js
    styles/
      admin.css
```

## Principios De Estructura

- `app/`: punto de entrada del admin y definicion de rutas
- `components/`: piezas visuales reutilizables
- `pages/`: vistas del dashboard
- `services/`: acceso a datos y adaptadores
- `hooks/`: estado compartido y carga de datos
- `utils/`: formato y exportacion
- `styles/`: estilos base del admin

## Relacion Con La App Actual

La app publica del tour sigue viviendo en:

- `src/App.jsx`

El admin se prepara en un modulo paralelo:

- `src/admin/`

Eso evita mezclar logica del tour con logica operativa o analitica.

## Separacion De Responsabilidades

### Frontend publico

Responsable de:

- mostrar panoramas
- recoger eventos
- enviar telemetria

### Frontend admin

Responsable de:

- consumir KPIs agregados
- mostrar graficas y tablas
- aplicar filtros
- lanzar exportaciones CSV

### Backend admin

Responsable de:

- consolidar datos de Supabase y GA Data API
- aplicar seguridad
- devolver datasets listos para dashboard

## Fuentes De Datos Por Servicio

### `supabase-admin-service.js`

Debe manejar:

- sesiones del tour
- escenas vistas
- hotspots
- quizzes
- interacciones

### `ga-admin-service.js`

Debe manejar:

- usuarios
- sesiones web
- page views
- canales
- dispositivos
- geografia

### `admin-api.js`

Debe actuar como fachada unica del frontend admin.

Ejemplo:

- `getOverviewMetrics(filters)`
- `getNavigationMetrics(filters)`
- `getLearningMetrics(filters)`
- `getSessionsTable(filters)`
- `getTrafficMetrics(filters)`
- `exportCsv(filters, moduleKey)`

## Estado Y Filtros

Los filtros globales deben vivir en una sola capa de estado compartido.

Filtros iniciales:

- fecha desde
- fecha hasta
- dispositivo
- ruta
- escena

Filtros adicionales:

- canal
- pagina
- pais

## Componentes Base De La V1

### Layout

- `AdminLayout`
- `AdminSidebar`
- `AdminTopbar`

### Visualizacion

- `KpiCard`
- `SessionsChart`
- `TopScenesChart`
- `RoutesChart`
- `QuizAccuracyChart`

### Operacion

- `DashboardFilters`
- `SessionsTable`
- `HotspotsTable`
- `QuizTable`

## Dependencias Previstas

Para esta arquitectura se preve usar:

- `react-router-dom`
- `recharts`
- `shadcn/ui`

Todavia no se instalan en este paso; aqui solo queda definida la estructura.

## Siguiente Paso

Despues de esta arquitectura, el siguiente movimiento tecnico es:

1. integrar `react-router-dom`
2. crear `AdminApp`
3. levantar layout y rutas del admin
4. agregar paginas placeholder de cada modulo
