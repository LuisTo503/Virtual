const q = (pregunta, opciones, correcta, explicacion) => ({ pregunta, opciones, correcta, explicacion })
const drag = (titulo, instrucciones, opciones, categorias, respuestas, explicacion) => ({
  kind: 'dragdrop',
  titulo,
  instrucciones,
  opciones,
  categorias,
  respuestas,
  explicacion,
})

const interactive = ({ titulo, descripcion, narracion, foco, uso }) => ({
  titulo,
  descripcion,
  narracion,
  quizzes: [
    q(`Cual es la funcion principal de ${titulo.toLowerCase()}?`, [uso, 'Operacion tecnica', 'Circulacion vehicular'], 0, `La escena destaca por ${uso.toLowerCase()}.`),
    q(`Que debes observar primero en ${titulo.toLowerCase()}?`, [foco, 'Solo el color del piso', 'Elementos aleatorios'], 0, `El aprendizaje mejora cuando observas ${foco.toLowerCase()}.`),
    drag(
      `Drag and drop: ${titulo}`,
      'Arrastra cada elemento a la categoria correcta.',
      ['Funcion', 'Observacion', 'Recorrido'],
      ['Uso principal', 'Enfoque de lectura', 'Relacion espacial'],
      {
        Funcion: 'Uso principal',
        Observacion: 'Enfoque de lectura',
        Recorrido: 'Relacion espacial',
      },
      `En ${titulo.toLowerCase()}, conviene distinguir uso, lectura espacial y relacion con el recorrido.`
    ),
  ],
  ventanas: [
    { id: 'win-1', titulo: `Lectura de ${titulo}`, etiqueta: 'Ventana', contenido: descripcion },
    { id: 'win-2', titulo: 'Clave de aprendizaje', etiqueta: 'Analisis', contenido: `En esta escena conviene identificar ${foco.toLowerCase()} para comprender mejor el espacio.` },
  ],
  videos: [
    { id: 'vid-1', titulo: `Microvideo de ${titulo}`, descripcion: `Resumen rapido de ${titulo.toLowerCase()}.`, escenas: [titulo, foco, uso] },
  ],
  h5pActivities: [
    { id: 'act-1', titulo: `Actividad tipo H5P: ${titulo}`, descripcion: `Actividad interactiva sobre ${titulo.toLowerCase()}.`, reto: `Selecciona los aspectos clave de ${titulo.toLowerCase()}.`, checklist: [foco, uso, 'Relacion con el recorrido'] },
  ],
})

export const SCENES = {
  exterior: {
    id: 'exterior', title: 'Exterior', subtitle: 'Entrada principal', icon: 'EX', group: 'areas-comunes', panorama: '/360/patio_ninos2-baja.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'lobby', yaw: 12, pitch: -5, text: 'Ir al lobby', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'vestibulo_d3', yaw: 90, pitch: -6, text: 'Vestibulo D3', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: -60, pitch: 8, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Exterior', descripcion: 'Vista inicial del proyecto con acceso a las areas comunes y a la zona residencial.', narracion: 'Bienvenido al recorrido. Desde este punto puedes leer el acceso principal y la distribucion general del proyecto.', foco: 'accesos y circulacion', uso: 'orientar la llegada al proyecto' }),
  },
  lobby: {
    id: 'lobby', title: 'Lobby / Patio', subtitle: 'Area comun', icon: 'LB', group: 'areas-comunes', panorama: '/360/patio_sillas-baja.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'exterior', yaw: 180, pitch: -4, text: 'Volver al exterior', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'piscina', yaw: 45, pitch: -8, text: 'Piscina', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'usos_multiples', yaw: -45, pitch: -6, text: 'Salon de usos multiples', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: -18, pitch: 10, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Lobby principal', descripcion: 'Area de recepcion y estancia con apertura hacia jardines y espacios de convivencia.', narracion: 'El lobby recibe, orienta y conecta con otras amenidades del proyecto.', foco: 'recepcion y apertura visual', uso: 'recibir y distribuir usuarios' }),
  },
  piscina: {
    id: 'piscina', title: 'Piscina adultos', subtitle: 'Area recreativa', icon: 'PI', group: 'areas-comunes', panorama: '/360/piscina_adultos1-baja.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'lobby', yaw: 178, pitch: -5, text: 'Lobby', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'patio_sillas', yaw: 90, pitch: -10, text: 'Area social', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'sky_lounge', yaw: -65, pitch: -8, text: 'Sky lounge', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: 8, pitch: -18, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Piscina', descripcion: 'Zona recreativa al aire libre conectada con jardines y corredores.', narracion: 'La piscina combina paisaje, estancia y recorrido como parte de las amenidades exteriores.', foco: 'agua, sombra y conexiones', uso: 'recreacion y descanso' }),
  },
  patio_sillas: {
    id: 'patio_sillas', title: 'Area social', subtitle: 'Area comun', icon: 'AS', group: 'areas-comunes', panorama: '/360/patio_sillas-baja.jpg', yaw: 35, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'piscina', yaw: 175, pitch: -6, text: 'Piscina', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'patio_ninos', yaw: -85, pitch: -6, text: 'Patio ninos', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'proyecciones', yaw: 45, pitch: -4, text: 'Sala de proyecciones', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: 30, pitch: 20, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Area social', descripcion: 'Espacio cubierto con mobiliario para reuniones informales y convivencia.', narracion: 'Esta area social permite descanso, reunion y permanencia cercana a otras amenidades.', foco: 'mobiliario y permanencia', uso: 'convivencia y estancia' }),
  },
  patio_ninos: {
    id: 'patio_ninos', title: 'Patio ninos', subtitle: 'Area recreativa', icon: 'PN', group: 'areas-comunes', panorama: '/360/patio_ninos2-baja.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'patio_sillas', yaw: 120, pitch: -7, text: 'Area social', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'squash', yaw: -70, pitch: -5, text: 'Cancha de squash', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: 60, pitch: -12, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Patio infantil', descripcion: 'Jardin amplio con elementos de juego y area verde integrada.', narracion: 'El patio infantil combina juego, vegetacion y seguridad para familias.', foco: 'juego, sombra y supervision', uso: 'recreacion infantil' }),
  },
  usos_multiples: {
    id: 'usos_multiples', title: 'Usos multiples', subtitle: 'Amenidad interior', icon: 'UM', group: 'amenidades', panorama: '/360/sala_de_usos_multiples-baja.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'lobby', yaw: 180, pitch: -4, text: 'Lobby', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'proyecciones', yaw: 50, pitch: -4, text: 'Sala de proyecciones', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'sky_lounge', yaw: -70, pitch: -4, text: 'Sky lounge', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: 0, pitch: 12, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Salon multiuso', descripcion: 'Ambiente adaptable para actividades comunitarias, talleres o reuniones.', narracion: 'El salon multiuso destaca por su flexibilidad programatica y su valor comunitario.', foco: 'flexibilidad y programa', uso: 'eventos y reuniones' }),
  },
  proyecciones: {
    id: 'proyecciones', title: 'Sala de proyecciones', subtitle: 'Amenidad interior', icon: 'SP', group: 'amenidades', panorama: '/360/sala_proyecciones-baja.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'usos_multiples', yaw: 175, pitch: -4, text: 'Usos multiples', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'squash', yaw: 60, pitch: -6, text: 'Squash', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'patio_sillas', yaw: -80, pitch: -5, text: 'Area social', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: 5, pitch: 10, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Sala audiovisual', descripcion: 'Amenidad orientada a cine, presentaciones o entretenimiento privado.', narracion: 'Esta sala aprovecha control de luz y disposicion frontal para crear una experiencia audiovisual.', foco: 'control de luz y atencion', uso: 'proyecciones y presentaciones' }),
  },
  squash: {
    id: 'squash', title: 'Squash', subtitle: 'Amenidad deportiva', icon: 'SQ', group: 'amenidades', panorama: '/360/squash2-baja.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'proyecciones', yaw: 170, pitch: -3, text: 'Sala de proyecciones', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'sky_lounge', yaw: 70, pitch: -5, text: 'Sky lounge', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'patio_ninos', yaw: -70, pitch: -5, text: 'Patio ninos', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: 10, pitch: 5, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Cancha de squash', descripcion: 'Espacio deportivo interior como parte de las amenidades del edificio.', narracion: 'La cancha de squash agrega actividad fisica y bienestar al recorrido residencial.', foco: 'deporte y bienestar', uso: 'actividad fisica' }),
  },
  sky_lounge: {
    id: 'sky_lounge', title: 'Sky lounge', subtitle: 'Amenidad panoramica', icon: 'SK', group: 'amenidades', panorama: '/360/sky_3-baja.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'usos_multiples', yaw: 180, pitch: -4, text: 'Usos multiples', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'terraza_d3', yaw: 65, pitch: -5, text: 'Terraza D3', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'squash', yaw: -65, pitch: -5, text: 'Squash', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: 0, pitch: 8, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Sky lounge', descripcion: 'Amenidad panoramica para descanso y reuniones con vista abierta.', narracion: 'El sky lounge combina visuales y estancia para crear una amenidad memorable.', foco: 'vistas y permanencia', uso: 'descanso panoramico' }),
  },
  vestibulo_d3: {
    id: 'vestibulo_d3', title: 'Vestibulo D3', subtitle: 'Suite D3', icon: 'VD', group: 'suite-d3', panorama: '/360/vestibulo_d3.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'exterior', yaw: 180, pitch: -4, text: 'Exterior', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'sala_fam_d3', yaw: 40, pitch: -4, text: 'Sala familiar', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'pasillo', yaw: -55, pitch: -5, text: 'Pasillo D3', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: 10, pitch: 12, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Vestibulo', descripcion: 'Zona de acceso que organiza la circulacion interior de la suite.', narracion: 'El vestibulo ordena la entrada y clarifica la distribucion interior de la vivienda.', foco: 'transicion y distribucion', uso: 'organizar accesos' }),
  },
  sala_fam_d3: {
    id: 'sala_fam_d3', title: 'Sala familiar D3', subtitle: 'Suite D3', icon: 'SF', group: 'suite-d3', panorama: '/360/sala_fam_d3.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'vestibulo_d3', yaw: 180, pitch: -4, text: 'Vestibulo', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'pasillo', yaw: 50, pitch: -5, text: 'Pasillo', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'terraza_d3', yaw: -65, pitch: -5, text: 'Terraza', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: 0, pitch: 10, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Sala familiar', descripcion: 'Espacio interior de reunion y descanso dentro de la suite.', narracion: 'La sala familiar concentra convivencia cotidiana y relaciones visuales con otras areas.', foco: 'confort y estancia', uso: 'convivencia privada' }),
  },
  pasillo: {
    id: 'pasillo', title: 'Pasillo Suite D3', subtitle: 'Suite D3', icon: 'PA', group: 'suite-d3', panorama: '/360/pasillo_d3.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'vestibulo_d3', yaw: 180, pitch: -5, text: 'Vestibulo', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'balcon', yaw: 20, pitch: -5, text: 'Balcon', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'bano', yaw: -80, pitch: -10, text: 'Bano', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'sala_fam_d3', yaw: 85, pitch: -6, text: 'Sala familiar', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: 0, pitch: -25, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Pasillo D3', descripcion: 'Conecta los distintos ambientes privados de la suite.', narracion: 'El pasillo distribuye y jerarquiza el recorrido interior de la suite.', foco: 'orientacion y remates visuales', uso: 'conectar espacios privados' }),
  },
  terraza_d3: {
    id: 'terraza_d3', title: 'Terraza D3', subtitle: 'Suite D3', icon: 'TR', group: 'suite-d3', panorama: '/360/terraza_d3.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'sala_fam_d3', yaw: 180, pitch: -4, text: 'Sala familiar', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'balcon', yaw: 65, pitch: -4, text: 'Balcon', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'sky_lounge', yaw: -70, pitch: -5, text: 'Sky lounge', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: 10, pitch: 8, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Terraza', descripcion: 'Area exterior privada vinculada con la vida social de la suite.', narracion: 'La terraza extiende la habitabilidad interior hacia el exterior privado.', foco: 'ventilacion y visuales', uso: 'estancia exterior privada' }),
  },
  balcon: {
    id: 'balcon', title: 'Balcon D3', subtitle: 'Suite D3', icon: 'BA', group: 'suite-d3', panorama: '/360/d3_balcon.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'pasillo', yaw: 180, pitch: -5, text: 'Pasillo', cssClass: 'hotspot-nav' },
      { type: 'scene', targetScene: 'terraza_d3', yaw: 55, pitch: -5, text: 'Terraza', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: -25, pitch: 10, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Balcon', descripcion: 'Espacio exterior de la suite para ventilacion, estancia y contemplacion.', narracion: 'El balcon mejora apertura exterior, vistas y continuidad con la vivienda.', foco: 'vistas y aire', uso: 'estancia exterior breve' }),
  },
  bano: {
    id: 'bano', title: 'Bano D3', subtitle: 'Suite D3', icon: 'BN', group: 'suite-d3', panorama: '/360/bano2_d3.jpg', yaw: 0, pitch: 0, hfov: 100,
    hotspots: [
      { type: 'scene', targetScene: 'pasillo', yaw: 90, pitch: -5, text: 'Pasillo', cssClass: 'hotspot-nav' },
      { type: 'info', yaw: -30, pitch: 5, text: 'Abrir experiencia interactiva', cssClass: 'hotspot-info' },
    ],
    educacion: interactive({ titulo: 'Bano principal', descripcion: 'Ambiente privado con ducha y entrada de luz natural.', narracion: 'Este bano muestra como luz natural y materialidad clara mejoran confort y percepcion espacial.', foco: 'luz natural y confort', uso: 'higiene y bienestar' }),
  },
}

export const ROUTES = {
  libre: { label: 'Recorrido libre', sceneIds: ['exterior', 'lobby', 'piscina', 'patio_sillas', 'patio_ninos', 'usos_multiples', 'proyecciones', 'squash', 'sky_lounge', 'vestibulo_d3', 'sala_fam_d3', 'pasillo', 'terraza_d3', 'balcon', 'bano'] },
  areas_comunes: { label: 'Areas comunes', sceneIds: ['exterior', 'lobby', 'piscina', 'patio_sillas', 'patio_ninos'] },
  amenidades: { label: 'Amenidades', sceneIds: ['usos_multiples', 'proyecciones', 'squash', 'sky_lounge'] },
  suite_d3: { label: 'Suite D3', sceneIds: ['vestibulo_d3', 'sala_fam_d3', 'pasillo', 'terraza_d3', 'balcon', 'bano'] },
}

export const GROUPS = {
  'areas-comunes': 'Areas comunes',
  amenidades: 'Amenidades',
  'suite-d3': 'Suite D3',
}
