# Despliegue En Vercel

Esta app ya esta lista para desplegarse en Vercel como sitio estatico construido con Vite.

## 1. Preparar el repositorio

Antes de subirla a Vercel, confirma que el proyecto este en GitHub, GitLab o Bitbucket.

Archivos clave ya listos:

- `package.json`
- `vite.config.js`
- `.env.example`

No subas `.env.local` al repositorio.

## 2. Variables de entorno en Vercel

En `Project Settings > Environment Variables`, agrega estas variables:

```env
VITE_SUPABASE_URL=https://zpsieatyklmygasgksln.supabase.co
VITE_SUPABASE_ANON_KEY=tu_publishable_key
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=https://us.i.posthog.com
VITE_GTM_ID=
```

Si todavia no vamos a activar PostHog o GTM en produccion, puedes dejar `VITE_POSTHOG_KEY` y `VITE_GTM_ID` vacias.

Importante:

- usa solo la `publishable key` de Supabase en frontend
- no uses la `secret key` en Vercel para esta app cliente

## 3. Crear el proyecto en Vercel

1. Entra a `https://vercel.com`
2. Haz clic en `Add New... > Project`
3. Importa el repositorio del tour
4. Vercel deberia detectar `Vite`
5. Revisa estos valores:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Si Vercel los completa automaticamente, dejalos asi.

## 4. Primer despliegue

1. Guarda las variables de entorno
2. Haz clic en `Deploy`
3. Espera a que termine el build

Si el build termina bien, Vercel te entregara una URL parecida a:

```txt
https://tour-verde-virtual.vercel.app
```

## 5. Verificaciones despues del deploy

Al abrir la URL publica, comprueba:

- que cargue el panorama inicial
- que funcionen los hotspots
- que se abra el panel educativo
- que el mapa se vea bien en desktop y movil
- que el menu movil funcione
- que Supabase siga guardando filas nuevas en `sessions`, `scene_views`, `hotspot_events`, `quiz_attempts` e `interaction_events`

## 6. Validar analitica en produccion

Despues del deploy, abre la app publica y genera interacciones reales:

- cambiar escena
- abrir info
- responder quiz
- hacer drag and drop
- abrir video
- tocar hotspots

Luego verifica en Supabase que aparezcan registros nuevos con el dominio publico como referencia.

## 7. Cuando el dominio ya exista

Con la URL publica ya vale la pena seguir con:

1. `Google Tag Manager`
2. `Google Analytics 4`
3. `Metabase`

Ese es el mejor momento porque:

- ya tienes un dominio estable
- puedes probar tags con `Tag Assistant`
- las metricas dejan de depender de `localhost`

## 8. Recomendaciones de seguridad

- rota la `secret key` de Supabase que compartiste antes
- rota tambien la contrasena de base de datos
- manten solo la `publishable key` en variables frontend

## 9. Checklist rapido

Antes de dar por bueno el deploy:

- `npm run build` compila sin errores
- variables `VITE_*` cargadas en Vercel
- panoramas visibles en produccion
- inserciones funcionando en Supabase
- menu movil y mapa verificados en telefono
- PWA instalable desde navegador movil
