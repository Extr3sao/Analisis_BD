# Pla de Proves - Pantalla Negra Frontend

## Objectiu
Evitar regressions on l'app React queda en negre en arrencar o en navegar entre pestanyes crítiques.

## Hipòtesi principal
- Error runtime al render (`ReferenceError` / component trencat) quan es carrega `App.jsx`.
- Elements crítics (Deep Scan i Configuració de connexions) no es renderitzen després de canvis.

## Estratègia de prova
1. **Smoke render test**: validar que l'app arrenca i pinta layout base.
2. **Navigation smoke test**: validar que la pestanya `Deep Scan` mostra botó `Auditar`.
3. **Connection UX smoke test**: validar que `Configuració` mostra `Afegir des de cadena` i format `USER/PASSWORD@HOST:PORT/SERVICE`.
4. **Build check**: compilar frontend en mode producció.

## Casos de prova
- `T1`: Render inicial sense crash.
- `T2`: Navegació a `Deep Scan` i visibilitat del botó d'acció.
- `T3`: Navegació a `Configuració` i visibilitat de la secció de cadenes de connexió.
- `T4`: `vite build` correcte.

## Com executar
```bash
cd src/web-app
npm test
npm run build
```

## Criteri d'acceptació
- Tots els tests `T1..T3` passen.
- Build sense errors.
- UI mostra `Auditar` a `Deep Scan` i `Afegir des de cadena` a `Configuració`.

## Accions de mitigació si falla
- Revisar consola del navegador (error runtime exacta).
- Validar imports de `App.jsx` i components utilitzats.
- Aïllar bloc que falla amb test específic addicional.
