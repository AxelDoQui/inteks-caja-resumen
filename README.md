# InTeks Caja — Resumen

PWA de solo lectura para Android (y cualquier navegador): muestra el Resumen
del mes de InTeks Caja (pendiente de ingresar, fondo, pendiente de reponer a
WU/RIA, divisas en poder) llamando a la misma API que ya usa el Panel de
Cierres de escritorio (`resumenApp`). No guarda ni envía nada: solo lee.

La primera vez que se abre pide la URL (`.../exec`) y la clave de
⚙️ Configuración → Conexión del Panel de Cierres; se guardan solo en
`localStorage` de ese navegador, nunca en el código ni en el repositorio.

Sin dependencias, sin build: `index.html`, `manifest.webmanifest`, `sw.js` y
los iconos se publican tal cual con GitHub Pages.

## Por qué existe aparte del Panel de Cierres

La web de InTeks Caja (Apps Script) se sirve siempre dentro de un `<iframe>`
de otro dominio (`script.googleusercontent.com`), así que Chrome nunca la
ofrece como instalable por mucho manifest que se le ponga dentro. Esta
página vive en su propio origen (GitHub Pages) y solo *llama* a la API de
InTeks Caja por `fetch`, así que sí cumple los requisitos de Chrome para
instalarse.

## Publicar un cambio

```
git add -A
git commit -m "..."
git push
```

GitHub Pages sirve directamente la rama `main`. No hace falta build ni
token: el repositorio es público y no contiene ninguna clave.
