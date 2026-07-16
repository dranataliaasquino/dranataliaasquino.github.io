# dranataliaasquino — sitio web

Sitio profesional de la Dra. Natalia Asquino. Construido con [Astro](https://astro.build) y desplegado en GitHub Pages sobre el dominio [dranataliaasquino.com.uy](https://dranataliaasquino.com.uy).

El sitio está **en producción e indexable** (`LIVE = true` en `src/site.config.ts`).

## Cómo correr el sitio en local

Requisitos: Node.js 20+ y npm.

```bash
npm install
npm run dev
```

Abrir http://localhost:4321 en el navegador.

## Comandos principales

| Comando           | Acción                                |
| ----------------- | ------------------------------------- |
| `npm install`     | Instala dependencias                  |
| `npm run dev`     | Servidor local con hot reload         |
| `npm run build`   | Genera el sitio estático en `./dist/` |
| `npm run preview` | Previsualiza el build localmente      |

## Estructura

```
src/
├── pages/                      # Una página = un archivo .astro
│   ├── index.astro
│   ├── sobre-natalia.astro
│   ├── servicios.astro
│   ├── equipo.astro
│   ├── consultorios.astro
│   ├── investigacion.astro
│   ├── preguntas-frecuentes.astro
│   ├── para-colegas.astro
│   ├── contacto.astro
│   ├── cv.astro
│   ├── privacidad.astro        # noindex
│   ├── articulos/              # index.astro + [slug].astro (blog)
│   └── casos/                  # index.astro — sección en preparación, noindex
├── components/                 # Header, Footer, Section, LocationCard
├── layouts/
│   └── BaseLayout.astro        # meta tags, JSON-LD, analytics — usado por todas las páginas
├── content/
│   ├── config.ts               # Schemas de las colecciones (articulos, casos)
│   └── articulos/              # Markdown de los artículos publicados
├── styles/global.css
└── site.config.ts              # Configuración central: contacto, ubicaciones, navegación, LIVE

public/
├── CNAME                       # Dominio personalizado
├── robots.txt
├── favicon.svg
├── og-image.png                # Previsualización en redes
├── images/                     # Logo y fotos (equipo, retratos)
└── files/CV_Asquino_2026_ES.pdf
```

## Edición rápida

**Cambiar dato de contacto, dirección, horarios o número de WhatsApp:**
Editar `src/site.config.ts`. Los cambios se propagan a todas las páginas (incluido el JSON-LD de `LocalBusiness`).

**Cambiar la paleta de colores:**
Editar `tailwind.config.mjs`.

**Agregar una página nueva:**
Crear archivo `.astro` en `src/pages/` (por ejemplo `src/pages/promociones.astro`). La URL será `/promociones/`.

**Publicar un artículo nuevo:**
Crear archivo Markdown en `src/content/articulos/` con el slug como nombre de archivo — `higiene-bucal.md` se publica en `/articulos/higiene-bucal/`. Front-matter requerido (validado por `src/content/config.ts`; si falta un campo, el build falla):

```markdown
---
title: "Cómo tener una correcta higiene bucal"
description: "Resumen breve, se usa en la lista de artículos y en la meta description."
pubDate: 2026-05-14
audience: pacientes   # pacientes | colegas
draft: false          # true lo excluye del build
---

Contenido del artículo acá...
```

Los artículos se listan ordenados por `pubDate` descendente en `/articulos/` y en el bloque "Lecturas recientes" de la home.

## SEO y analytics

- **Sitemap:** generado por `@astrojs/sitemap` en `/sitemap-index.xml`. El `lastmod` se elimina a propósito (ver comentario en `astro.config.mjs`): el sitio es institucional y evergreen, no queremos que Google muestre la fecha del último build como fecha de publicación.
- **Structured data (JSON-LD):** `MedicalOrganization` + `LocalBusiness` por consultorio en `BaseLayout.astro`, `Person` en `/sobre-natalia/`, `Article` en cada artículo, `VideoObject` en `/investigacion/`.
- **noindex por página:** pasar `noindex={true}` a `BaseLayout`. Hoy lo usan `/privacidad/` y `/casos/` (sección en preparación).
- **Analytics:** Umami Cloud (sin cookies, sin banner de consentimiento). El script solo se inyecta cuando `LIVE === true`, así el tráfico de dev y pre-launch no ensucia las métricas. Panel: https://cloud.umami.is · `UMAMI_ID` en `src/site.config.ts`. Decisión y alternativas descartadas (GA4, Plausible) en la sección 14 del manual de infraestructura (ver "Soporte y mantenimiento").
- **Redes sociales:** `SOCIAL` existe en `site.config.ts` pero **no se renderiza** en el sitio mientras los perfiles de IG y FB estén incompletos. Instrucciones para reactivarlos en el comentario de `site.config.ts`.

## Modo LIVE

`src/site.config.ts` expone `LIVE` (booleano), hoy en `true`. Es el interruptor maestro de visibilidad:

| `LIVE`  | Efecto                                                                     |
| ------- | -------------------------------------------------------------------------- |
| `true`  | Indexable, analytics de Umami activo                                       |
| `false` | `<meta name="robots" content="noindex, nofollow">` en todas las páginas, sin analytics |

Ojo: `public/robots.txt` es un archivo estático y **no** responde a `LIVE`. Hoy está en modo producción (allow-all salvo `/privacidad/`). Si alguna vez hay que volver a pre-launch, además de poner `LIVE = false` hay que reemplazar `robots.txt` por `User-agent: *` / `Disallow: /` (instrucciones en el propio archivo).

## Despliegue

El sitio se despliega automáticamente a GitHub Pages cada vez que se hace `push` a `main`. La configuración está en `.github/workflows/deploy.yml` (build con Node 20 + `actions/deploy-pages`). El deploy tarda 2-3 minutos.

**Setup actual:**

- Repositorio: `dranataliaasquino.github.io` (público), bajo la cuenta `dranataliaasquino` (formato de repositorio de sitio personal de GitHub: el repo se llama igual que `<usuario>.github.io`).
- Settings → Pages → Source: GitHub Actions.
- URL técnica de GitHub Pages: `https://dranataliaasquino.github.io/`.
- Dominio personalizado: `dranataliaasquino.com.uy` (configurado en `public/CNAME` y en `site` de `astro.config.mjs`).
- DNS gestionados en Antel (`dns.antel.net.uy`): 4 registros A apex apuntando a `185.199.108–111.153`, CNAME `www` → `dranataliaasquino.github.io`. MX y SPF (ImprovMX + Gmail) para el correo institucional.
- Email institucional: `contacto@dranataliaasquino.com.uy` (forwarding ImprovMX free → Gmail).

**Si se cambia el dominio en el futuro:**

1. Editar `astro.config.mjs`: cambiar `site` al nuevo dominio.
2. Editar `public/CNAME` con el nuevo dominio.
3. Actualizar la línea `Sitemap:` de `public/robots.txt`.
4. Actualizar `SITE.url` en `src/site.config.ts`.
5. Configurar DNS del dominio para apuntar a GitHub Pages (registros A a 185.199.108–111.153).
6. En Settings → Pages, actualizar el dominio personalizado.

## Pendientes (TODO)

Solo lo que se resuelve dentro de este repo. La lista completa y canónica de pendientes —incluidos los de cuentas externas (Google Business Profile, Instagram, Facebook, backlinks)— vive en `Dental Practice/Website/CLAUDE.md`. Esta lista no se mantiene por duplicado: si algo cambia, la referencia es esa.

- [ ] Reemplazar las fotos actuales por las de la sesión de fotografía profesional (`public/images/`). Las de hoy son reales, no placeholders genéricos: lo pendiente es la sesión profesional.
- [ ] Completar Publicaciones en `src/pages/investigacion.astro` (hoy remite al CV) cuando Natalia defina cuáles destacar.
- [ ] Agregar casos clínicos: crear `src/content/casos/` con los primeros `.md` (el schema ya existe en `src/content/config.ts`), reemplazar el estado "en preparación" de `src/pages/casos/index.astro` y sacarle el `noindex`.
- [ ] Confirmar la URL pública de Facebook tras el cambio de handle y actualizar `SOCIAL.facebook` en `src/site.config.ts`.
- [ ] Reactivar los íconos de IG/FB (Footer + `sameAs` en el structuredData de `BaseLayout.astro`) cuando ambos perfiles tengan contenido publicable.

## Convenciones

- Idioma: español (es-UY).
- Paleta: Sage & Sand. Tokens en `tailwind.config.mjs`.
- Tipografía: Inter (sans) + Source Serif 4 (serif para titulares).
- Componentes en `src/components/`. Layouts en `src/layouts/`.
- Sin formularios con backend: contacto vía mailto y WhatsApp.

## Soporte y mantenimiento

Sitio mantenido por Federico (Cowork OS / Dental Practice / Website), con Claude Code en WSL apuntando a esta carpeta.

**Todo cambio va por rama + draft PR**, por chico que sea: un push a `main` publica el sitio en vivo. Ver `CLAUDE.md` en la raíz del repo para las convenciones técnicas (comandos, modelo de deploy, convenciones de commit, no-issues conocidos).

Contactos técnicos de emergencia (Antel, ImprovMX, GitHub): sección 17 del manual de infraestructura `Dental Practice/2026-07-16_Presencia_Online_Consultorio_v11.docx`.
