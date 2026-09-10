<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Design System CSI — clusterdestartups.org

**Fuente de verdad: `/DESIGN_SYSTEM.md`** (tokens implementados en `src/app/globals.css`, Tailwind v4). Cualquier decisión visual nueva debe registrarse primero en `DESIGN_SYSTEM.md`.

## Stack de estilos

- Tailwind CSS **v4** (CSS-first: `@theme inline` en `globals.css`, **sin** `tailwind.config.js`).
- Modo oscuro por atributo: `<html data-theme="dark|light">`, no por `prefers-color-scheme`. Breakpoint: `@custom-variant dark ([data-theme="dark"] &)` → utilities `dark:`.
- Fuentes vía `next/font/google` en `src/app/[locale]/layout.tsx`: Archivo (display, eje `wdth`) y Raleway (body). NO importar otras fuentes ni usar `<link>` de Google Fonts.

## Reglas al escribir UI (obligatorias)

1. **Nunca hex directo en el markup.** Usar utilities semánticas que ya reaccionan al modo:
   - Fondos: `bg-surface`, `bg-surface-subtle`, `bg-elevated`
   - Bordes: `border-line`
   - Texto: `text-ink`, `text-ink-secondary`, `text-ink-muted`, `text-on-brand`, `text-link`
   - Marca (fijas): `bg-brand`, `text-brand`, `bg-navy`, `text-navy`, `bg-brand-light`, `bg-brand-dark`
   - Funcionales: `text-success`, `text-warning`, `text-error`, `text-info`
   - Solo usar variant `dark:` para excepciones puntuales (ej. `dark:bg-navy`).
2. **Tipografía:** headings con `font-display` (Archivo; `font-stretch: 125%` ya aplicado por CSS base). Body usa `font-body` (Raleway, ya es default). Escala disponible: `text-display`, `text-h1`…`text-h4`, `text-body-lg`, `text-body`, `text-small`, `text-micro` (line-height/peso embebidos). No inventar tamaños fuera de la escala.
3. **Componentes:** usar clases del design system en `@layer components` en vez de reescribir estilos: `btn btn-primary|btn-secondary|btn-ghost|btn-on-dark`, `card`, `badge-brand`, `input`, `container-site`, `bg-brand-gradient`. Si falta una variante, agregarla en `globals.css` primero y documentarla en `DESIGN_SYSTEM.md`.
4. **Layout:** contenedor `container-site` (1280px) o grid de 12 cols; escala de espaciado base 4px (4/8/12/16/24/32/48/64/96/128); secciones `py-16` mobile / `py-24 lg:py-32` desktop; radios `rounded-sm|md|lg|full`.
5. **Contraste:** texto sobre `bg-brand` o `bg-navy` siempre `text-on-brand`. Blanco sobre `bg-brand-light` solo en modo oscuro (ver `btn-on-dark`).
6. **Tema (default = claro):** el script inline en `<head>` de `layout.tsx` lee `localStorage["csi-theme"]` antes del paint; no moverlo ni duplicarlo. Un toggle debe escribir `"dark"|"light"` en esa clave y actualizar `data-theme` en `<html>`.
7. **Imágenes con fondo blanco:** envolverlas en contenedor `bg-elevated` para que no rompan el modo oscuro.
8. **Iconos:** Phosphor o Lucide, trazo 1.5–2px. **Prohibido** reutilizar logo/isotipo de "Krater32"; formas de nodos/círculos solo como decoración con 5–10% de opacidad en `bg-brand` o `bg-navy`.
9. **CTAs:** español mexicano, acción concreta ("Súmate al clúster", "Conoce los nodos"); nunca "Click aquí".

## Checklist antes de terminar una tarea de UI

- [ ] Cero hex/rgb hardcodeados en componentes (solo permitidos en `globals.css`)
- [ ] Se probara en `light` y `dark` (`data-theme="dark"` en `<html>`)
- [ ] `npm run lint` y `npm run build` pasan
