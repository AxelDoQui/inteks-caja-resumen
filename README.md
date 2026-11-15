# InTeks Caja

PWA para Android (y cualquier navegador) que habla con la misma API que ya
usa el Panel de Cierres de escritorio. Cuatro pestañas:

- **Resumen** — pendiente de ingresar, fondo, pendiente de reponer a WU/RIA,
  divisas en poder (`resumenApp`). Solo lectura.
- **Cambio de divisas** — apuntar un cambio (local, divisa, cantidad, euros,
  fecha, notas), igual que «Apuntar un cambio» de la web (`guardarCambio`).
- **Cierre WU/RIA** — el importe de cada local por día, igual que esa misma
  pantalla de la web (`getEnvios`/`guardarEnvios`).
- **Cierre tienda** — el Z (efectivo y gastos exactos) y el Stacker (sacado y
  gastos redondeados) de una tienda y un día, igual que la web
  (`getCierreTienda`/`guardarCierreTienda`). Bloqueado si ese cierre ya está
  recogido, igual que la web.

Los guardados van **directos a la hoja**, sin cola ni reintento: si no hay
red, se avisa y no se guarda nada (como la web; a diferencia del Panel de
escritorio, que si tiene cola para sus propias pantallas).

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
