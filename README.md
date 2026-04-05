# Tour Verde Virtual 🌿

Plataforma de recorrido virtual 360° con estructura educativa.  
Stack: **React 18 + Vite + Pannellum**

---

## ⚙️ Instalación paso a paso

### 1. Requisitos previos
- Node.js v18 o superior → https://nodejs.org/
- VS Code → https://code.visualstudio.com/

### 2. Extensiones recomendadas para VS Code

Instala estas extensiones desde el panel de extensiones (Ctrl+Shift+X):

| Extensión | ID | Para qué sirve |
|---|---|---|
| ES7+ React/Redux Snippets | `dsznajder.es7-react-js-snippets` | Snippets rápidos de React |
| Vite | `antfu.vite` | Integración con Vite |
| CSS Modules | `clinyong.vscode-css-modules` | Autocomplete en .module.css |
| Prettier | `esbenp.prettier-vscode` | Formateo de código |
| Auto Import | `steoates.autoimport` | Importaciones automáticas |
| Path Intellisense | `christian-kohler.path-intellisense` | Autocomplete de rutas |

### 3. Abrir el proyecto

```bash
# Descomprime la carpeta y abre en VS Code
code tour-verde-virtual
```

### 4. Instalar dependencias

Abre la terminal en VS Code (Ctrl+`) y ejecuta:

```bash
npm install
```

### 5. Iniciar servidor de desarrollo

```bash
npm run dev
```

Abre http://localhost:5173 en tu navegador. ✅

---

## 📁 Estructura del proyecto

```
tour-verde-virtual/
├── public/
│   └── 360/                    ← PON AQUÍ TUS IMÁGENES 360°
│       ├── EXTERIOR-baja.jpg
│       ├── LOBBY-PATIO-baja.jpg
│       ├── PISCINA_ADULTOS1-baja.jpg
│       ├── PATIO_SILLAS-baja.jpg
│       ├── Patio_ninos2-baja.jpg
│       ├── Pasillo_D3.jpg
│       ├── D3_Balcon.jpg
│       └── Baño2_D3.jpg
│
├── src/
│   ├── data/
│   │   └── scenes.js           ← Configuración de escenas, hotspots y rutas
│   ├── components/
│   │   ├── TourViewer.jsx      ← Visor Pannellum 360°
│   │   ├── Sidebar.jsx         ← Panel lateral de escenas
│   │   ├── InfoPanel.jsx       ← Panel educativo con quizzes
│   │   └── MiniMap.jsx         ← Mapa de ruta en visor
│   ├── hooks/
│   │   └── usePannellum.js     ← Hook para Pannellum (referencia)
│   ├── styles/
│   │   └── app.css             ← Variables globales y reset
│   ├── App.jsx                 ← Componente raíz
│   └── main.jsx                ← Punto de entrada
│
├── index.html                  ← HTML base (carga Pannellum CSS)
├── vite.config.js
└── package.json
```

---

## 🖼️ Agregar tus imágenes 360°

1. Crea la carpeta `public/360/` si no existe
2. Copia tus 8 imágenes equirectangulares ahí
3. Los nombres ya están configurados en `src/data/scenes.js`

> **Tip de rendimiento**: Para imágenes pesadas (>5MB), usa la versión `-baja.jpg` para el tour y guarda las originales de alta resolución como alternativa.

---

## 🎯 Cómo editar el contenido educativo

Abre `src/data/scenes.js` y modifica el objeto `educacion` de cada escena:

```js
educacion: {
  titulo: 'Nombre del espacio',
  descripcion: 'Texto descriptivo del espacio...',
  pregunta: '¿Tu pregunta guía aquí?',
  opciones: ['Opción A', 'Opción B', 'Opción C'],
  correcta: 1, // índice (0, 1 o 2) de la respuesta correcta
},
```

---

## 🔗 Agregar hotspots (puntos interactivos)

En `scenes.js`, dentro de cada escena agrega al array `hotspots`:

```js
// Hotspot de navegación a otra escena
{
  type: 'scene',
  targetScene: 'id-de-escena-destino',
  yaw: 45,      // ángulo horizontal (-180 a 180)
  pitch: -10,   // ángulo vertical (-90 a 90)
  text: '→ Ir a sala',
  cssClass: 'hotspot-nav',
},

// Hotspot de información
{
  type: 'info',
  yaw: -30,
  pitch: 5,
  text: 'Texto informativo del punto',
  cssClass: 'hotspot-info',
},
```

> **Tip**: Para encontrar el yaw/pitch correcto, arrastra la imagen en el visor y usa `viewer.getYaw()` / `viewer.getPitch()` en la consola del navegador.

---

## 🚀 Publicar en producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para subir a:
- **Netlify**: arrastra la carpeta `dist/` a netlify.com/drop
- **Vercel**: `npx vercel --prod`
- **GitHub Pages**: requiere ajuste de `base` en `vite.config.js`

---

## 📦 Dependencias principales

| Paquete | Versión | Uso |
|---|---|---|
| react | 18.x | UI components |
| vite | 5.x | Bundler y dev server |
| pannellum | 2.5.6 | Visor 360° (via CDN) |
| leaflet | 1.9.x | Mapas (Componente 1 fase 2) |

---

## 💡 Próximos pasos (Fase 2)

- [ ] Integrar Leaflet.js para mapa interactivo de destinos
- [ ] Conectar H5P para fichas educativas avanzadas
- [ ] Agregar Google Analytics 4
- [ ] Dashboard Metabase para métricas
- [ ] PWA para uso offline en móvil
# Virtual
# Virtual
