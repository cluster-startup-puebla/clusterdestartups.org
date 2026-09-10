# Design System — clusterdestartups.org

**Clúster de Startups e Innovación (CSI) A.C.**
Documento de trabajo — Septiembre 2026
Modo por defecto: **Claro** · Modo alternativo: **Oscuro**

> Implementación: los tokens viven en `src/app/globals.css` (Tailwind v4 vía `@theme`).
> Cómo usarlo en código: ver sección [Uso en código](#uso-en-código) y las reglas en `AGENTS.md`.

---

## 1. Concepto de marca

> "El punto de impacto que transforma todo."

CSI se posiciona como el punto donde convergen **talento, capital e innovación** para detonar startups con proyección desde Puebla hacia el resto del país. La identidad visual debe transmitir:

| Atributo | Traducción visual |
|---|---|
| **Impacto** | Contraste alto, acentos en rosa mexicano, formas concentradas |
| **Vinculación / Colaboración** | Composiciones circulares, elementos que se conectan entre sí |
| **Innovación** | Tipografía geométrica, espacios en blanco generosos, gradientes sutiles |
| **Transformación** | Iconografía orgánica-geométrica, uso de movimiento en interacciones |
| **Dinamismo** | Microinteracciones, transiciones suaves, nunca estático |

Tono de marca: **discreta pero seria** — no busca ser protagonista visual, busca transmitir solidez institucional con energía tecnológica. Nada de mascotas, nada de ilustraciones infantiles; fotografía real de personas y espacios por encima de stock genérico.

**Nota de exclusión:** este sistema no reutiliza el logotipo, nombre ni isotipo de "Krater32" (referencia de moodboard revisada). Todo elemento gráfico aquí es original para CSI / clusterdestartups.org.

---

## 2. Paleta de color

### 2.1 Colores de marca (fijos en ambos modos)

| Token | Nombre | Hex | Uso |
|---|---|---|---|
| `--brand-primary` | Rosa Mexicano | `#E8186A` | CTAs, acentos, links activos, highlights |
| `--brand-primary-dark` | Rosa Mexicano oscuro | `#B8104F` | Hover/active de elementos primarios |
| `--brand-primary-light` | Rosa Mexicano claro | `#FF4D93` | Estados sobre fondo oscuro, gradientes |
| `--brand-secondary` | Navy CSI | `#16284F` | Texto institucional, footer, headers oscuros |
| `--brand-secondary-light` | Navy claro | `#28406F` | Superficies secundarias en modo oscuro |

### 2.2 Modo Claro (default)

| Token | Hex | Uso |
|---|---|---|
| `--bg-base` | `#FFFFFF` | Fondo principal |
| `--bg-subtle` | `#F7F7F8` | Fondos de sección alterna |
| `--bg-elevated` | `#FFFFFF` (+ sombra) | Tarjetas, modales |
| `--border-default` | `#E5E7EB` | Bordes, separadores |
| `--text-primary` | `#16284F` | Titulares, texto principal (navy) |
| `--text-secondary` | `#4B5563` | Texto de apoyo |
| `--text-muted` | `#8A8F98` | Metadatos, captions |
| `--text-on-brand` | `#FFFFFF` | Texto sobre fondo rosa/navy |
| `--link` | `#E8186A` | Enlaces |
| `--focus-ring` | `#E8186A` (40% opacidad) | Estados de foco/accesibilidad |

### 2.3 Modo Oscuro (alternativo)

| Token | Hex | Uso |
|---|---|---|
| `--bg-base` | `#0E1420` | Fondo principal (navy casi negro, no negro puro) |
| `--bg-subtle` | `#16284F` | Fondos de sección alterna (navy de marca) |
| `--bg-elevated` | `#1C2B47` | Tarjetas, modales |
| `--border-default` | `#2B3B5C` | Bordes, separadores |
| `--text-primary` | `#F5F6F8` | Titulares, texto principal |
| `--text-secondary` | `#B8C0CE` | Texto de apoyo |
| `--text-muted` | `#7C8AA3` | Metadatos, captions |
| `--text-on-brand` | `#FFFFFF` | Texto sobre fondo rosa |
| `--link` | `#FF4D93` | Enlaces (rosa aclarado para contraste AA sobre navy) |
| `--focus-ring` | `#FF4D93` (50% opacidad) | Estados de foco/accesibilidad |

### 2.4 Colores funcionales (ambos modos)

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--success` | `#1E8E5A` | `#3DDC91` | Confirmaciones |
| `--warning` | `#B8860B` | `#F5C244` | Alertas leves |
| `--error` | `#C6303E` | `#FF6B7A` | Errores, campos inválidos |
| `--info` | `#2563EB` | `#5B9BFF` | Mensajes informativos |

**Regla de contraste:** todo texto sobre `--brand-primary` o `--brand-secondary` debe usar `--text-on-brand` (#FFFFFF). Verificar AA (4.5:1) en cuerpo de texto y AA para texto grande en headings.

**Acento interactivo (`--brand-accent`):** los elementos con rosa como texto/borde activo (badges, botones secundarios, links, hovers) usan el token `--brand-accent` en vez del rosa fijo: en claro es `#E8186A` y en oscuro cambia a `#FF4D93` (rosa claro) para mantener AA sobre navy. Utilities: `text-accent`, `bg-accent`, `border-accent`; texto sobre relleno acento: `text-on-accent`.

---

## 3. Tipografía

Pareja base: **Akzidenz-Grotesk BQ Extended + Raleway**, tal como en la referencia revisada. De estas dos, **Raleway está tal cual en Google Fonts** (uso literal, sin cambios). Akzidenz-Grotesk BQ Extended es de fundición comercial (Berthold/Bitstream) y **no está disponible en Google Fonts**; el equivalente libre más cercano es **Archivo** en su corte **Expanded**, porque es la misma familia de grotesco de finales del s. XIX y —a diferencia de Space Grotesk/Sora, que son geométricas modernas— Archivo sí tiene eje de ancho variable (de Condensed a Expanded), que es justo lo que hace especial al "BQ Extended" original.

| Rol | Fuente del moodboard | ¿En Google Fonts? | Qué usar |
|---|---|---|---|
| Titulares / Display | Akzidenz-Grotesk BQ Extended | ❌ No (comercial) | **Archivo**, corte *Expanded*, pesos 600/700 |
| Cuerpo de texto | Raleway | ✅ Sí, idéntica | **Raleway**, pesos 400/500/600 |

Links directos:
- Archivo → [fonts.google.com/specimen/Archivo](https://fonts.google.com/specimen/Archivo)
- Raleway → [fonts.google.com/specimen/Raleway](https://fonts.google.com/specimen/Raleway)

En este proyecto las fuentes se cargan con `next/font/google` (Archivo con eje `wdth`, Raleway variable) y quedan expuestas como `--font-archivo` / `--font-raleway`. `font-stretch: 125%` aplica el corte Expanded en display.

### Escala tipográfica

| Token | Tamaño | Línea | Peso | Uso |
|---|---|---|---|---|
| `--text-display` | 56–72px | 1.05 | 700 | Hero headlines |
| `--text-h1` | 40px | 1.1 | 700 | Títulos de página |
| `--text-h2` | 32px | 1.15 | 600 | Secciones |
| `--text-h3` | 24px | 1.2 | 600 | Subsecciones |
| `--text-h4` | 18px | 1.3 | 600 | Tarjetas, componentes |
| `--text-body-lg` | 18px | 1.6 | 400 | Intro/lead paragraphs |
| `--text-body` | 16px | 1.6 | 400 | Cuerpo estándar |
| `--text-small` | 14px | 1.5 | 400 | Captions, metadatos |
| `--text-micro` | 12px | 1.4 | 500 | Labels, badges (uppercase, tracking +0.04em) |

Reglas: mayúsculas solo en labels/badges cortos; nunca en párrafos. Interlineado generoso (1.6) en cuerpo para legibilidad institucional.

---

## 4. Espaciado y grid

Escala base 4px:

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

- Grid de 12 columnas, contenedor máximo **1280px** (utility `max-w-site`), márgenes laterales 24px (mobile) / 64px (desktop).
- Separación entre secciones: 96–128px desktop, 64px mobile (`py-24`–`py-32` desktop, `py-16` mobile).
- Radio de esquina: `--radius-sm` 8px (inputs, chips), `--radius-md` 16px (tarjetas), `--radius-lg` 24px (bloques hero), `--radius-full` para botones pill.

---

## 5. Componentes clave

### Botones

| Variante | Fondo | Texto | Borde |
|---|---|---|---|
| Primario | `--brand-primary` | `--text-on-brand` | ninguno, radio full |
| Secundario | transparente | `--brand-primary` | 1.5px `--brand-primary` |
| Terciario / ghost | transparente | `--text-primary` | ninguno, subrayado en hover |
| Sobre fondo oscuro | `--brand-primary-light` | `#0E1420` | ninguno |

Hover: oscurecer 10% (`--brand-primary-dark`) + leve elevación (sombra `0 4px 12px rgba(232,24,106,0.25)`).

### Tarjetas

- Fondo `--bg-elevated`, borde 1px `--border-default`, radio `--radius-md`.
- Sombra sutil en claro: `0 2px 8px rgba(22,40,79,0.06)`.
- En oscuro: sin sombra, usar borde más claro para separar del fondo.

### Navegación

- Header transparente sobre hero, se vuelve `--bg-base` con sombra al hacer scroll.
- Links en `--text-primary`, estado activo en `--brand-primary` con subrayado de 2px.

### Formularios

- Inputs: fondo `--bg-subtle`, borde `--border-default`, radio `--radius-sm`.
- Focus: borde `--brand-primary` + `--focus-ring`.
- Placeholder en `--text-muted`.

### Badges / Tags (para niveles del ecosistema, membresías, nodos)

- Fondo `--brand-primary` al 12% opacidad, texto `--brand-primary`, radio full, `--text-micro`.

---

## 6. Iconografía e imágenes

- **Iconos:** trazo geométrico, grosor consistente (1.5–2px), esquinas redondeadas leves. Set recomendado: Phosphor Icons o Lucide (open source, coherente con estética del moodboard).
- **Fotografía:** personas reales trabajando en espacios del Hub CERHAN II, manos colaborando, espacios FabLab — evitar stock genérico de "startup" con laptops de stock.
- **Formas gráficas de apoyo:** círculos y patrones de puntos/conexiones (nodos) como metáfora de red/ecosistema — sin usar el isotipo de la referencia revisada. Pueden usarse como fondos decorativos con opacidad baja (5–10%) en `--brand-primary` o `--brand-secondary`.
- **Gradientes de marca:** `linear-gradient(135deg, #E8186A 0%, #16284F 100%)` para fondos hero en modo oscuro; usar con moderación (secciones destacadas, no fondos generales). Utility: `bg-brand-gradient`.

---

## 7. Tono de voz aplicado a UI

- Español institucional mexicano, directo, sin tecnicismos innecesarios.
- CTAs orientados a acción concreta: "Súmate al clúster", "Conoce los nodos", "Agenda una visita al Hub" — evitar genéricos tipo "Click aquí".
- Mensajes de error/confirmación empáticos pero breves, sin exclamaciones excesivas.

---

## 8. Modo oscuro — reglas de conmutación

- Toggle accesible en header (icono sol/luna), persistente vía `localStorage` (clave `csi-theme`). **El modo claro es el default declarado del sitio**, independientemente de la preferencia del sistema; solo se usa oscuro si el usuario lo eligió explícitamente. Componente listo: `src/modules/cores/theme/src/components/theme-toggle.tsx`.
- El tema se aplica con el atributo `data-theme="dark"|"light"` en `<html>`, seteado por un script inline en `<head>` (evita FOUC). El breakpoint de Tailwind `dark:` está configurado como `[data-theme="dark"] &`.
- Todas las imágenes con fondo blanco sólido deben tener una variante o un contenedor con `--bg-elevated` para no romper contraste en oscuro.
- Gráficas y diagramas del ecosistema (7 niveles, mapa de 42 componentes) requieren set de color dual: versión con líneas navy sobre blanco (claro) y líneas blancas/rosa sobre navy (oscuro).

---

## 9. Uso en código

### Tokens → utilities de Tailwind

Los semánticos se mapean a clases (definidas en `globals.css` vía `@theme inline`):

| Utility | Token | Modo oscuro |
|---|---|---|
| `bg-surface` | `--bg-base` | ✅ |
| `bg-surface-subtle` | `--bg-subtle` | ✅ |
| `bg-elevated` | `--bg-elevated` | ✅ |
| `border-line` | `--border-default` | ✅ |
| `text-ink` | `--text-primary` | ✅ |
| `text-ink-secondary` | `--text-secondary` | ✅ |
| `text-ink-muted` | `--text-muted` | ✅ |
| `text-on-brand` | `--text-on-brand` | — |
| `text-link` | `--link` | ✅ |
| `bg-brand` / `text-brand` | `--brand-primary` | fijo |
| `bg-brand-dark` | `--brand-primary-dark` | fijo |
| `bg-brand-light` | `--brand-primary-light` | fijo |
| `bg-navy` / `text-navy` | `--brand-secondary` | fijo |
| `text-success` / `text-warning` / `text-error` / `text-info` | funcionales | ✅ |

> Regla: usar **utilities semánticas** (`bg-surface`, `text-ink`) en el markup, nunca hex directo. Para forzar valores del modo contrario usar el variant `dark:` (ej. `dark:bg-navy`).

### Tipografía

- `font-display` → Archivo (con `font-stretch: 125%` aplicado por CSS a headings/display).
- `font-body` → Raleway (default del body).
- Escala: `text-display`, `text-h1`…`text-h4`, `text-body-lg`, `text-body`, `text-small`, `text-micro` (con line-height y peso embebidos).

### Clases de componente (definidas en `@layer components`)

- `btn` + `btn-primary` / `btn-secondary` / `btn-ghost` / `btn-on-dark`
- `card`
- `badge-brand`
- `input`
- `bg-brand-gradient`
- `container-site` (contenedor 1280px con padding lateral responsivo)

### Ejemplo

```tsx
<section className="bg-surface-subtle py-16 lg:py-32">
  <div className="container-site">
    <h2 className="text-h2 text-ink">Conoce los nodos</h2>
    <p className="text-body text-ink-secondary">…</p>
    <span className="badge-brand">Nivel 1 · Nodo base</span>
    <a href="/unete" className="btn btn-primary">Súmate al clúster</a>
  </div>
</section>
```

---

## 10. Checklist de implementación

- [x] Variables CSS custom properties definidas en `:root` y `[data-theme="dark"]`
- [ ] Contraste AA verificado en todos los pares texto/fondo
- [x] Tipografías cargadas vía `font-display: swap`
- [ ] Componentes documentados en Storybook o equivalente antes de escalar a más páginas
- [ ] Favicon y OG images en ambas variantes de color

## 11. Componentes adicionales

- `hero-dark`: tratamiento fijo oscuro (fondo `#0E1420` + gradiente diagonal de Rosa Mexicano, texto blanco) para el Hero de Inicio. **No reacciona al modo claro/oscuro**: es una decisión de diseño intencional para la sección de mayor impacto. Clases auxiliares: `.hero-cta-secondary` (botón secundario sobre fondo oscuro).
- Flag de secciones ocultas: `src/modules/cores/site/src/config/hidden-sections.ts` (`HIDDEN_SECTIONS`). Nav, footer y home consultan `isHiddenSection()` antes de renderizar enlaces; las rutas siguen existiendo por URL directa.
