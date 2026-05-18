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

**Setup actual:**
- Repositorio: `dranataliaasquino.github.io` (público), bajo la cuenta `dranataliaasquino` (formato de repositorio de sitio personal de GitHub: el repo se llama igual que `<usuario>.github.io`).
- Settings → Pages → Source: GitHub Actions.
- URL técnica de GitHub Pages: `https://dranataliaasquino.github.io/`.
- Dominio personalizado: `dranataliaasquino.com.uy` (configurado en `public/CNAME`).
- DNS gestionados en Antel (`dns.antel.net.uy`): 4 registros A apex apuntando a `185.199.108–111.153`, CNAME `www` → `dranataliaasquino.github.io`. MX y SPF (ImprovMX + Gmail) para el correo institucional.
- Email institucional: `contacto@dranataliaasquino.com.uy` (forwarding ImprovMX free → Gmail).

**Modo LIVE / pre-launch:**
- `src/site.config.ts` expone una variable `LIVE` (booleana). Mientras `LIVE === false`, todas las páginas emiten `<meta name="robots" content="noindex, nofollow">` y `public/robots.txt` bloquea a todos los crawlers.
- Para lanzar al público hay que: poner `LIVE = true` en `site.config.ts`, restaurar `public/robots.txt` permitiendo crawling (`User-agent: *` / `Disallow: /privacidad/` + línea `Sitemap:`), confirmar `SITE.url` apuntando a `https://dranataliaasquino.com.uy`, y commitear todo en un solo commit con mensaje del estilo `Lanzo sitio en dranataliaasquino.com.uy`.

**Si se cambia el dominio en el futuro:**
1. Editar `astro.config.mjs`: cambiar `site` al nuevo dominio.
2. Editar `public/CNAME` con el nuevo dominio.
3. Configurar DNS del dominio para apuntar a GitHub Pages (registros A a 185.199.108–111.153).
4. En Settings → Pages, actualizar el dominio personalizado.

## Pendientes (TODO)

Alineado con la sección 18 del documento maestro `Dental Practice/2026-05-16_Presencia_Online_Consultorio_v04.md`. Si algo cambia, actualizar ambos.

- [ ] Activar modo LIVE (`src/site.config.ts` → `LIVE = true`) cuando Natalia apruebe el contenido y el sitio esté listo para indexarse.
- [ ] Reemplazar foto principal y avatar (actualmente placeholders).
- [ ] Completar Investigación y docencia: publicaciones, proyectos en curso, docencia (`src/pages/investigacion.astro`).
- [ ] Revisar los artículos (`src/content/articulos/`).
- [ ] Agregar casos clínicos (`src/content/casos/`).
- [ ] Configurar Google Business Profile en Montevideo y Punta del Este.
- [ ] Decidir e instalar herramienta de analytics (Google Analytics 4 vs Plausible/Umami).
- [ ] Verificar el sitio en Google Search Console (post-launch).

## Convenciones

- Idioma: español (es-UY).
- Paleta: Sage & Sand. Tokens en `tailwind.config.mjs`.
- Tipografía: Inter (sans) + Source Serif 4 (serif para titulares).
- Componentes en `src/components/`. Layouts en `src/layouts/`.
- Sin formularios con backend: contacto vía mailto, WhatsApp y AgendaPro.

## Soporte y mantenimiento

Sitio mantenido por Federico (Cowork OS / Dental Practice / Website). Cambios menores se hacen editando archivos directamente. Cambios mayores: usar Claude Code en WSL apuntando a esta carpeta.
