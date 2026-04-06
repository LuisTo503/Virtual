-- Metabase starter queries para Tour Verde Virtual

-- 1. Sesiones totales
select count(*) as total_sessions
from sessions;

-- 2. Sesiones por tipo de dispositivo
select
  coalesce(device_type, 'unknown') as device_type,
  count(*) as total_sessions
from sessions
group by 1
order by total_sessions desc;

-- 3. Escenas mas visitadas
select
  scene_id,
  count(*) as total_views
from scene_views
group by scene_id
order by total_views desc, scene_id asc;

-- 4. Rutas mas usadas
select
  coalesce(route_id, 'sin_ruta') as route_id,
  count(*) as total_scene_views
from scene_views
group by 1
order by total_scene_views desc;

-- 5. Hotspots mas clickeados
select
  coalesce(scene_id, 'sin_escena') as scene_id,
  coalesce(hotspot_type, 'sin_tipo') as hotspot_type,
  coalesce(target_scene_id, 'sin_destino') as target_scene_id,
  count(*) as total_clicks
from hotspot_events
group by 1, 2, 3
order by total_clicks desc, scene_id asc;

-- 6. Hotspots por escena
select
  coalesce(scene_id, 'sin_escena') as scene_id,
  count(*) as total_clicks
from hotspot_events
group by 1
order by total_clicks desc;

-- 7. Eventos de interaccion mas frecuentes
select
  event_name,
  count(*) as total_events
from interaction_events
group by event_name
order by total_events desc, event_name asc;

-- 8. Eventos diarios
select
  date_trunc('day', created_at) as event_day,
  count(*) as total_events
from interaction_events
group by 1
order by event_day asc;

-- 9. Uso de audio, video y mapa
select
  event_name,
  count(*) as total_events
from interaction_events
where event_name in ('audio_play', 'video_open', 'map_toggle', 'map_node_click')
group by event_name
order by total_events desc;

-- 10. Desempeno general de quizzes
select
  quiz_kind,
  count(*) as total_attempts,
  sum(case when is_correct then 1 else 0 end) as total_correct,
  round(
    100.0 * sum(case when is_correct then 1 else 0 end) / nullif(count(*), 0),
    2
  ) as accuracy_pct
from quiz_attempts
group by quiz_kind
order by total_attempts desc;

-- 11. Desempeno de quiz por escena
select
  coalesce(scene_id, 'sin_escena') as scene_id,
  count(*) as total_attempts,
  sum(case when is_correct then 1 else 0 end) as total_correct,
  round(
    100.0 * sum(case when is_correct then 1 else 0 end) / nullif(count(*), 0),
    2
  ) as accuracy_pct
from quiz_attempts
group by 1
order by total_attempts desc, scene_id asc;

-- 12. Respuestas por tipo de quiz
select
  quiz_kind,
  quiz_index,
  count(*) as total_attempts
from quiz_attempts
group by 1, 2
order by quiz_kind asc, quiz_index asc;

-- 13. Sesiones con mas actividad
select
  s.id as session_id,
  s.device_type,
  s.route_initial,
  count(distinct sv.id) as scene_views,
  count(distinct he.id) as hotspot_clicks,
  count(distinct qa.id) as quiz_attempts,
  count(distinct ie.id) as interaction_events
from sessions s
left join scene_views sv on sv.session_id = s.id
left join hotspot_events he on he.session_id = s.id
left join quiz_attempts qa on qa.session_id = s.id
left join interaction_events ie on ie.session_id = s.id
group by s.id, s.device_type, s.route_initial
order by interaction_events desc, scene_views desc
limit 20;

-- 14. Embudo simple: sesiones -> vistas -> hotspots -> quiz
select
  (select count(*) from sessions) as sessions_total,
  (select count(*) from scene_views) as scene_views_total,
  (select count(*) from hotspot_events) as hotspot_clicks_total,
  (select count(*) from quiz_attempts) as quiz_attempts_total;

-- 15. Escenas con mayor engagement total
with scene_union as (
  select scene_id, count(*) as qty, 'scene_views' as source
  from scene_views
  group by scene_id

  union all

  select scene_id, count(*) as qty, 'hotspot_events' as source
  from hotspot_events
  group by scene_id

  union all

  select scene_id, count(*) as qty, 'quiz_attempts' as source
  from quiz_attempts
  group by scene_id

  union all

  select scene_id, count(*) as qty, 'interaction_events' as source
  from interaction_events
  where scene_id is not null
  group by scene_id
)
select
  coalesce(scene_id, 'sin_escena') as scene_id,
  sum(qty) as engagement_total
from scene_union
group by 1
order by engagement_total desc, scene_id asc;
