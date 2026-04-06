# Backend Admin En Vercel

El panel admin ahora puede consumir endpoints backend en:

- `/api/admin/overview`
- `/api/admin/navigation`
- `/api/admin/learning`
- `/api/admin/sessions`
- `/api/admin/exports`

## Objetivo

Evitar lectura directa de tablas crudas desde el navegador y mover las agregaciones del admin al servidor.

## Variable necesaria en Vercel

Agrega en `Project Settings > Environment Variables`:

```env
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

Tambien deben existir:

```env
VITE_SUPABASE_URL=https://zpsieatyklmygasgksln.supabase.co
VITE_SUPABASE_ANON_KEY=tu_publishable_key
```

## Importante

- `SUPABASE_SERVICE_ROLE_KEY` solo va en backend
- no la pongas en archivos `VITE_*`
- no la expongas al navegador

## Comportamiento actual

El frontend admin intenta:

1. consumir `/api/admin/*`
2. si no encuentra backend disponible, hace fallback a lectura local o datos mock

## Recomendacion

En produccion, deja activo el backend admin con `SUPABASE_SERVICE_ROLE_KEY` para que:

- overview
- navigation
- learning
- sessions
- exports

usen agregacion segura desde servidor.
