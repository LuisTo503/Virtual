# Rutas Del Panel Admin

## Objetivo

Definir las rutas del modulo `/admin` para la v1 del dashboard.

## Ruta Base

La raiz del panel admin sera:

```txt
/admin
```

## Mapa De Rutas

### 1. Resumen General

```txt
/admin
/admin/overview
```

Proposito:

- mostrar KPIs ejecutivos
- sesiones web y del tour
- top escenas
- top rutas
- resumen de engagement

### 2. Navegacion

```txt
/admin/navigation
```

Proposito:

- escenas mas visitadas
- rutas mas usadas
- hotspots mas clickeados
- flujo entre escenas

### 3. Aprendizaje

```txt
/admin/learning
```

Proposito:

- quizzes respondidos
- precision por escena
- precision por tipo de quiz
- uso de audio, video e info

### 4. Sesiones

```txt
/admin/sessions
```

Proposito:

- tabla de sesiones
- detalle de actividad por sesion
- sesiones con mayor engagement

### 5. Trafico Web

```txt
/admin/traffic
```

Proposito:

- usuarios y sesiones web
- page views
- canales
- dispositivo
- geografia

### 6. Exportaciones

```txt
/admin/exports
```

Proposito:

- exportar CSV por fechas
- exportar datos filtrados por modulo

## Rutas De Soporte

### Login Admin

```txt
/admin/login
```

Proposito:

- acceso del administrador

### No autorizado

```txt
/admin/unauthorized
```

Proposito:

- manejo de acceso no permitido

## Navegacion Lateral Recomendada

Orden recomendado del menu:

1. `Resumen`
2. `Navegacion`
3. `Aprendizaje`
4. `Sesiones`
5. `Trafico`
6. `Exportaciones`

## Convenciones De Ruteo

- `/admin` redirige a `/admin/overview`
- todas las rutas hijas usan el mismo layout
- los filtros globales persisten entre modulos cuando sea posible

## Guard De Acceso

Las rutas de admin deben quedar protegidas por:

- autenticacion
- validacion de rol admin

## Datos Por Ruta

### `/admin/overview`

Consume:

- overview metrics
- sessions daily
- top scenes
- top routes

### `/admin/navigation`

Consume:

- navigation metrics
- hotspot summary
- scene transitions

### `/admin/learning`

Consume:

- quiz summary
- scene learning summary
- audio and video events

### `/admin/sessions`

Consume:

- sessions table
- session activity summary

### `/admin/traffic`

Consume:

- GA users and sessions
- channels
- pages
- devices
- countries

### `/admin/exports`

Consume:

- export presets
- csv generation status

## Evolucion Futura

En fases posteriores se pueden agregar:

- `/admin/errors`
- `/admin/content`
- `/admin/settings`
- `/admin/users`
