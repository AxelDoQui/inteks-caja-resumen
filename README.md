# InTeks Caja

PWA para Android (y cualquier navegador), con el **mismo diseño que la web**
de InTeks Caja (mismo CSS, iconos e Inicio con la rejilla de baldosas) pero
hablando con el script por `fetch` en vez de `google.script.run`. Pantallas:

- **Inicio** — pendiente de ingresar, WU en caja, fondo disponible y lo
  pendiente de reponer a WU/RIA (`resumenApp`). Solo lectura.
- **Resumen** — con selector de mes: cada tienda (días, Z, Stacker,
  diferencia, sin recoger), banco, WU y RIA por local, y divisas (fondo,
  pendiente de reponer, qué hay en el fondo). Igual que la web, salvo las
  tarjetas de administración multi-local (Fondos de locales, PCs, Automáticos),
  que no están aquí.
- **Cierre tienda** — Z (efectivo y gastos exactos) y Stacker (sacado y
  gastos redondeados), igual que la web (`getCierreTienda`/`guardarCierreTienda`).
  Bloqueado si ese cierre ya está recogido.
- **Cierre WU/RIA** — el importe de cada local por día (`getEnvios`/`guardarEnvios`).
  Los locales que cierran domingo se deshabilitan ese día, y si el WU de un
  día ya está en una recogida se bloquea entero, igual que la web.
- **Recogida tienda** — cierres sin recoger, lo traído del fondo de locales,
  aportes y retiradas, reponer a WU/RIA con ese dinero, y lo pendiente de
  ingresar en el banco (marcar como ingresado o sacar dinero antes de
  ingresarlo), igual que la web (`getPendientesTienda`, `getTraidosPendientes`,
  `getDeudaEnvios`, `guardarRecogidaTienda`, `getSinIngresar`,
  `marcarIngresada`, `sacarDeRecogida`).
- **Recogida WU** — el bloque lunes–miércoles o jueves–domingo (o fechas a
  mano), el importe por local, ajustes (sobra/falta según WU), lo pendiente
  de reponer antes de preparar el dinero, y las últimas recogidas con
  «Entregado ✓» / Ajustar, igual que la web (`propuestaRecogidaWU`,
  `guardarRecogidaWU`, `ajustarRecogidaWU`, `marcarEntregadaWU`,
  `deshacerEntregaWU`).
- **Divisas** — Cambio (con tipo de cambio y previsión del fondo en vivo,
  fecha editable y últimos cambios con Anular), Reponer (marcar cambios
  pendientes y guardar la reposición) y Fondo (saldos y mover dinero o
  divisa), igual que la web (`datosDivisas`, `guardarCambio`,
  `guardarReposicion`, `guardarMovimientoFondo`).
- **Historial** — los diez tipos de movimiento (cierres tienda, recogidas
  tienda, salidas de ventas, WU, RIA, recogidas WU, reponer WU/RIA, cambios,
  reposiciones, fondo divisas), con **Anular** pidiendo motivo, igual que la
  web (`historial`, `anular`, `deshacerIngreso`). Anular no borra nada: el
  movimiento queda tachado.

Ya está toda la rejilla de Inicio construida.

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
