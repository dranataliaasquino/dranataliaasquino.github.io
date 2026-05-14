# dranataliaasquino — sitio web

Sitio profesional de la Dra. Natalia Asquino. Construido con [Astro](https://astro.build) y desplegado en GitHub Pages.

## Cómo correr el sitio en local

Requisitos: Node.js 20+ y npm.

```bash
npm install
npm run dev
```

Abrir http://localhost:4321 en el navegador.

## Comandos principales

| Comando           | Acción                                     |
| ----------------- | ------------------------------------------ |
| `npm install`     | Instala dependencias                       |
| `npm run dev`     | Servidor local con hot reload              |
| `npm run build`   | Genera el sitio estático en `./dist/`      |
| `npm run preview` | Previsualiza el build localmente            |

## Estructura

```
src/
├── pages/              # Una página = un archivo .astro
│   ├── index.astro
│   ├── sobre-natalia.astro
│   ├── consultorios.astro
│   ├── articulos/
│   └── casos/
├── components/         # Componentes reutilizables (Header, Footer, etc.)
├── layouts/            # BaseLayout para todas las páginas
├── content/            # Markdown (artículos y casos clínicos)
├── styles/             # CSS global
└── site.config.ts      # Configuración central: contacto, ubicaciones, navegación
```

## Edición rápida

**Cambiar dato de contacto, dirección o número de WhatsApp:**
Editar `src/site.config.ts`. Los cambios se propagan a todas las páginas.

**Agregar una página nueva:**
Crear archivo `.astro` en `src/pages/` (por ejemplo `src/pages/preguntas-frecuentes.astro`). La URL será `/preguntas-frecuentes/`.

**Publicar un artículo nuevo:**
Crear archivo Markdown en `src/content/articulos/YYYY-MM-DD-titulo.md` con front-matter:
```markdown
---
title: "Título del artículo"
date: 2025-XX-XX
summary: "Resumen breve para la lista de artículos."
---

Contenido del artículo aquí...
```
*(Nota: el sistema de blog completo se implementará en Fase 3.)*

## Despliegue

El sitio se despliega automáticamente a GitHub Pages cada vez que se hace `push` a la rama `main`. La configuración está en `.github/workflows/deploy.yml`.

**Setup inicial (una sola vez):**
1. Crear repositorio en GitHub: `natalia-asquino-web` (público).
2. En el repositorio: Settings → Pages → Source: GitHub Actions.
3. Hacer push a `main`. El sitio aparecerá en `https://<usuario>.github.io/natalia-asquino-web/`.

**Si se compra un dominio:**
1. Editar `astro.config.mjs`: cambiar `site` al dominio.
2. Crear archivo `public/CNAME` con el dominio (por ejemplo `dranataliaasquino.uy`).
3. Configurar DNS del dominio para apuntar a GitHub Pages.
4. En Settings → Pages, agregar el dominio personalizado.

## Pendientes (TODO)

- [ ] Confirmar número de WhatsApp en `src/site.config.ts`.
- [ ] Reemplazar foto principal y avatar (placeholders en placeholder gris).
- [ ] Reemplazar logo provisional (monograma "NA" en favicon y header).
- [ ] Bio de Natalia (sobre-natalia.astro).
- [ ] Bios y consentimiento del equipo (equipo.astro).
- [ ] Consentimientos firmados de pacientes para casos clínicos.
- [ ] Dominio definitivo y configuración de DNS.

## Convenciones

- Idioma: español (es-UY).
- Paleta: Sage & Sand. Tokens en `tailwind.config.mjs`.
- Tipografía: Inter (sans) + Source Serif 4 (serif para titulares).
- Componentes en `src/components/`. Layouts en `src/layouts/`.
- Sin formularios con backend: contacto vía mailto, WhatsApp y AgendaPro.

## Soporte y mantenimiento

Sitio mantenido por Federico (Cowork OS / Dental Practice / Website). Cambios menores se hacen editando archivos directamente. Cambios mayores: usar Claude Code en WSL apuntando a esta carpeta.
