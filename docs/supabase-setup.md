# Setup de Supabase y PostgreSQL

## Objetivo

Preparar el proyecto para guardar sesiones e interacciones del tour en PostgreSQL usando Supabase.

## 1. Crear proyecto en Supabase

1. Crear un proyecto nuevo en Supabase.
2. Copiar:
   - Project URL
   - anon public key

Importante:

- La `secret key` de Supabase no debe ponerse en `VITE_*`
- No debe exponerse en el frontend
- Solo se usa en backend seguro o funciones servidor

## 2. Configurar variables de entorno

Crear un archivo `.env` basado en `.env.example` y completar:

```env
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=https://us.i.posthog.com
VITE_GTM_ID=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## 3. Crear esquema SQL

Ejecutar el contenido de:

- `docs/supabase-schema.sql`

en el SQL Editor de Supabase.

Ese script ya incluye:

- creacion de tablas
- indices
- activacion de RLS
- politicas para permitir `insert` desde el cliente publico

Con eso deberian desaparecer los errores del Security Advisor relacionados con:

- `RLS Disabled in Public`
- `Sensitive Columns Exposed`

## 4. Tablas listas

Quedaran creadas:

- `sessions`
- `scene_views`
- `hotspot_events`
- `quiz_attempts`
- `interaction_events`

## 5. Integracion actual en el proyecto

Ya existe base tecnica en:

- `src/lib/supabase.js`
- `src/lib/backend-events.js`

Actualmente:

- la app puede arrancar sin Supabase
- al agregar credenciales, la capa queda lista para persistir

## 6. Proximo paso recomendado

Conectar la capa `trackEvent()` para que ademas de PostHog y dataLayer, escriba en Supabase:

- `scene_view` -> `scene_views`
- `hotspot_click` -> `hotspot_events`
- quiz y dragdrop -> `quiz_attempts`
- todo lo demas -> `interaction_events`

## 7. Metabase

Cuando Supabase ya tenga datos:

1. Crear instancia de Metabase
2. Conectar a la base PostgreSQL del proyecto
3. Crear preguntas base:
   - escenas mas visitadas
   - rutas mas usadas
   - hotspots mas clickeados
   - uso movil vs escritorio
   - quiz completados
