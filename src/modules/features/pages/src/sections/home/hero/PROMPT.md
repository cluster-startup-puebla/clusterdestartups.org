# Hero de inicio

Versión activa: `v2` (`HERO_VERSION` en `version.ts`).

La home solo importa `Hero` y `heroPreload` desde esta carpeta. El resto de la página no cambia al agregar una versión.

## Cómo cambiar de versión

1. Crea `versions/<id>/` con un componente que reciba `HeroProps` (`eyebrow`, `title`, `description`, `primaryCta`).
2. Exporta un `HeroVersion` (`id`, `Component`, `preload`) desde `versions/<id>/index.ts`.
3. Regístralo en `HERO_VERSIONS` (`version.ts`) y en `heroVersions` (`versions/index.ts`).
4. Asigna `HERO_VERSION` al id nuevo.

`preload` es la imagen LCP de esa versión, o `null` si no hay imagen above the fold.

## v1

Copy a la izquierda y carrusel de tres notas a la derecha, sobre fondo `hero-dark` con `NodeField`. El CTA va a `/quienes-somos`. Las diapositivas son Café Cursor, InnovaFest y Sinergia de Clústeres.

## v2

Cartel editorial sobre `bg-surface-subtle`. El título va en `text-display` y el año 2030 en `text-accent`. La foto no tiene tarjeta, radio ni velo. El índice es 01–03 con regla de marca, y un bloque `bg-brand` cierra el hero. Mismas tres notas y el mismo CTA.
