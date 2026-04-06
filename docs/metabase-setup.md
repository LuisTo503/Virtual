# Metabase Con Supabase

Esta fase se puede arrancar ya, porque el proyecto ya esta guardando datos reales en PostgreSQL via Supabase.

## Objetivo

Tener un dashboard interno para ver:

- escenas mas visitadas
- rutas mas usadas
- hotspots mas clickeados
- uso movil vs escritorio
- desempeno de quiz
- aperturas de audio, video y mapa

## Opcion mas factible ahora

Usar `Metabase` conectado directo a la base PostgreSQL de Supabase.

Eso evita construir primero un backend adicional y te deja consultar los datos reales del tour de inmediato.

## Que necesitas de Supabase

En Supabase, abre:

- `Project Settings`
- `Database`

Y localiza estos datos:

- host
- port
- database name
- user
- password

Importante:

- usa la conexion de PostgreSQL para Metabase
- no uses la `publishable key`
- si vas a exponer Metabase en internet, crea credenciales dedicadas para lectura cuando sea posible

## Como levantar Metabase

### Opcion 1. Metabase Cloud

La mas rapida si quieres evitar infraestructura.

### Opcion 2. Docker local o en servidor

Comando base:

```bash
docker run -d ^
  -p 3000:3000 ^
  --name metabase ^
  metabase/metabase
```

En Git Bash o shell tipo Unix:

```bash
docker run -d \
  -p 3000:3000 \
  --name metabase \
  metabase/metabase
```

Luego abre:

```txt
http://localhost:3000
```

## Como conectar Metabase a Supabase

En el asistente inicial de Metabase:

1. `Add your data`
2. selecciona `PostgreSQL`
3. completa:

```txt
Display name: Tour Verde Virtual
Host: <host de Supabase>
Port: 5432
Database name: postgres
Username: <usuario de Supabase>
Password: <password de la base>
SSL: enabled
```

Si Supabase te da un nombre distinto de base de datos, usa ese en lugar de `postgres`.

## Tablas utiles para el primer dashboard

- `sessions`
- `scene_views`
- `hotspot_events`
- `quiz_attempts`
- `interaction_events`

## Dashboard inicial recomendado

### KPIs

- sesiones totales
- escenas vistas
- hotspots clickeados
- quizzes respondidos
- tasa de acierto de quiz

### Graficas

- escenas mas visitadas
- rutas mas usadas
- hotspots por escena
- eventos por tipo
- sesiones por tipo de dispositivo
- interacciones por dia

## Buenas practicas

- empieza con preguntas simples y utiles
- usa filtros por fecha desde el inicio
- crea una coleccion llamada `Tour Verde Virtual`
- separa KPIs, navegacion, engagement y aprendizaje

## Siguiente paso sugerido

Usa las consultas de:

- `docs/metabase-queries.sql`

y conviertelas en tarjetas dentro de Metabase.
