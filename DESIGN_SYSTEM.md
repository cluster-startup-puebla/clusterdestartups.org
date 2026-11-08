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

El favicon es una C blanca sobre un cuadrado redondeado `#e8186a`.

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
| `--logo-magenta` | Magenta del wordmark | `#A81C70` | Tinta de STARTUPS e INNOVACIÓN. No recolorea la interfaz ni se sustituye por el rosa |
| `--logo-ink` | Gris del wordmark | `#5A5A5C` | Tinta de «Clúster de» y de la «e» |

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

Los `<a class="text-link">` llevan subrayado (`text-underline-offset: 0.18em`) para no depender solo del color (WCAG 1.4.1). La clase `.btn` no se subraya.

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
- `cookie-banner` (barra fija al pie; se oculta con `html[data-cookies="set"]` para no parpadear)

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
- Carrusel del hero: el título no rota. En v1 el marco usa `aspect-[16/10]`, `shadow-hero` y un velo `from-navy` solo en la base. La deriva y la barra de avance son las utilities `animate-hero-drift` y `animate-hero-progress` (tokens en `@theme`). Pausa al pasar el cursor, al enfocar y con `motion-reduce`. Cada foto abre su nota en otra pestaña con UTM `utm_campaign=home`.
- Hero v2 (editorial): la versión activa se elige con `HERO_VERSION` en `src/modules/features/pages/src/sections/home/hero/version.ts`. v2 es un cartel sobre `bg-surface-subtle` (reacciona al tema). El título es más corto que la v1 y solo la palabra «Startup» va en `text-accent`. 2030, «startups» y «fácil» quedan en `text-ink`. La foto va a sangre, sin radio ni velo. Índice `01–03` y un bloque `bg-brand` centrado al pie. No usa `hero-dark` ni `NodeField`.
- Franja de aliados (home, entre el hero y “En el estado”): clase `allies-band` con fondo blanco fijo (`#FFFFFF`, borde `#E5E7EB`) en claro y oscuro, porque los lockups oficiales van en tinta oscura o con placa propia. El carril `allies-track` repite la fila cuatro veces y se desplaza un cuarto (`allies-marquee`, 48s, lineal, pausa al pasar el cursor) para que el ciclo no muestre hueco. Con `prefers-reduced-motion` la segunda copia se oculta y la fila hace wrap. La altura base es `h-12` / `sm:h-14`. Tres grupos, con más aire entre grupos (`allies-group`, 4.5rem) que dentro. Gobierno del Estado, SEDETRA, Cinco de Mayo y SECIHTI van juntos en `allies-cluster` (gap 0.75rem). Agroalimentario, Plásticos y Energético van en `allies-family` (gap 2rem). AMMJE queda solo, como organismo empresarial. El Energético llegó en blanco; el wordmark pasó a navy y el isotipo de color se conservó. SEDETRA baja a `h-10` / `sm:h-11` y SECIHTI sube a `h-14` / `sm:h-16` para igualar la altura de las letras, porque el archivo de SEDETRA dedica más del alto al titular. El Clúster de Plásticos y Economía Circular entra como `logo-cluster-plasticos.png`: el original es blanco sobre negro, así que la placa negra se volvió transparente y la tinta blanca pasó a navy, conservando el arco verde. Va en `h-16` / `sm:h-20`. El Agroalimentario va en `h-20` / `sm:h-24`: el hexágono y el wordmark comparten el alto. El Energético es un lockup muy ancho; va en `h-12` / `sm:h-14` con `max-w-48` para que el ancho no pase el de SEDETRA y el isotipo siga asomándose con el resto. El hero v2 usa `min-h: calc(100svh - 11rem)` para que, en una laptop, el primer pantallazo cierre con la etiqueta Aliados y la parte alta de los logos.
- Home, mapa de actividad: silueta de los municipios de Puebla (`puebla-map-paths.ts`, límites simplificados). En color solo Zacatlán y Puebla capital (`fill-brand`), Amozoc (`fill-ink`) y Cholula —San Andrés y San Pedro— (`fill-brand-light`). El resto va en `fill-ink/10`. Los totales van en texto (`text-h1 text-brand`). La actividad del municipio aparece al pasar el cursor, al enfocar o al tocar. Sin inventario del padrón, sin metros del hub y sin “meta 2030”. El hub, si se menciona, es solo “en proceso de lanzamiento”, sin sede.
- Foto del fundador: el retrato de la ficha es un botón. Al tocarlo abre un `<dialog>` a pantalla completa (`h-dvh`, padding `p-4` y en `sm` `p-8`). La imagen usa `object-contain` y `max-h` contra `100dvh`. El cierre es un botón de 44px (`bg-surface text-ink`) y también cierra al tocar el velo `bg-navy/80` o con Escape. El navy se queda oscuro en los dos modos para que el retrato se lea. Sin foto no hay lightbox. El logo de una escuela en «Estudió en» es el de la institución, el mismo para cualquier campus. «Sigue a» es un rectángulo con borde (`rounded-md`, sin relleno) y el isotipo oficial de LinkedIn; no es pastilla. «También en» son las otras startups del directorio (`alsoAt`, por slug), en una fila por empresa: wordmark suelto, nombre y el rol debajo. La startup principal queda solo en «Su startup» y en el encabezado. En el detalle de otra empresa, esa persona sale con el rol de `alsoAt` y sin la biografía de su ficha. «Antes en» se queda para empleos pasados y no apunta al directorio.
- Banner del perfil de fundador: la franja superior repite el logo como silueta de la tinta del tema, no el archivo a color. `brightness-0` lo vuelve negro en claro (40% sobre `bg-surface-subtle`) y `dark:invert` lo vuelve claro en oscuro (55%). Un logo blanco, negro o de color se lee igual; no hace falta marcar cada archivo. Si el archivo es un ícono relleno, el banner usa `logoMark`: el símbolo sin la placa, para que la repetición no se vuelva una cuadrícula de recuadros. La ficha de la empresa sigue mostrando el ícono completo.
- Navbar móvil: debajo de `lg` el menú muestra cada grupo abierto. El título (Nosotros, Empresas, Comunicación) es una etiqueta y las opciones van debajo, con una línea a la izquierda. No hace falta un segundo toque para ver Startups, Founders, Blog o Medios.
- Mapa del directorio de empresas: clase `company-map` (react-leaflet). El contenedor crea contexto de apilamiento (`isolation: isolate`) para que los panes del mapa no tapen el header `z-50`. El pin es el logo de la empresa en una placa `bg-elevated` con borde `--brand-primary`. Si no hay logo, va la inicial. Cada empresa se queda en su coordenada. Si en la pantalla caen juntas, se dibujan como un círculo `company-map-cluster` (`bg-brand`, `text-on-brand`) con el conteo. Al picarlo, el mapa vuela hasta que la zona se lee; si siguen en el mismo punto, los logos se abren en abanico (`company-map-fan`) y el pin real no se mueve. Monterrey y Playa del Carmen no entran al grupo de Puebla. El directorio abre en lista; el mapa es la otra opción del control. El popup y los controles usan `--bg-elevated`, `--text-primary` y `--link`, así que reaccionan al tema. Las teselas son el canvas gris de Esri (claro y oscuro, sin etiquetas), para leer la zona y no la calle. El encuadre inicial es la zona metropolitana de Puebla; un punto a más de 45 km no lo abre. Un control `Lista | Mapa` (`rounded-full`, activo `bg-brand text-on-brand`) cambia la vista. Alto `calc(100svh - 16rem)`, mínimo `24rem`, máximo `40rem`, radio `rounded-lg`, borde `border-line`.
- Ficha con nombre anterior: `previousSlug` abre la misma empresa en la ruta vieja. Solo ahí aparece el aviso (`bg-surface-subtle`, borde `border-line`) con el botón `btn-primary` «Ver la página nueva», que lleva a `slug`. El canónico de esa ruta es la página nueva. El directorio lista la empresa una vez.
- Sello de ficha confirmada: `BadgeCheck` de Lucide con la clase `verified-mark`. El relleno es `--brand-accent` (rosa de marca en claro, rosa claro en oscuro) y la palomita es `--on-accent`. Solo se pinta si `verified` es `true`. Si es `false`, en el mismo lugar va `badge-muted`: texto `En revisión`, borde `border-line`, sin relleno de marca, para que se lea como pendiente y no como error.
- Filtros de directorio (empresas y founders), debajo de `lg`: el buscador queda visible y debajo van todos los grupos a la vez, como facetas de ecommerce (Estado, Industria, Región, Lote, Fundadora). Cada grupo con varias opciones es un botón de 44px (`rounded-full`); al tocarlo abre solo esa lista de casillas en una `card`. Un grupo de una sola opción (Fundadora, Early) es el control en la misma fila. Lo activo se ve en el botón (`bg-brand text-on-brand`) y en pastillas que se quitan con un toque. En empresas, Estado es una sola opción: Verificadas (default, sin parámetro), Sin verificar o Todas. Siempre queda una marcada; no se puede dejar el grupo vacío. Los conteos de las demás facetas salen de ese recorte, así que Logística no cuenta fichas que el listado no muestra. Con Todas, las no verificadas van al final. «Limpiar filtros» vacía búsqueda y secciones, vuelve a Verificadas y conserva `theme` en el URL. En móvil, al cambiar un filtro la barra se queda en su lugar: el scroll solo se corrige si el router se fue arriba. Desde `lg` sigue el sidebar con casillas.
- Flag de secciones ocultas: `src/modules/cores/site/src/config/hidden-sections.ts` (`HIDDEN_SECTIONS`). Nav, footer y home consultan `isHiddenSection()` antes de renderizar enlaces; las rutas siguen existiendo por URL directa.
