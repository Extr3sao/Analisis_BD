# Clarify Distribution Test Mode

## Goal
Aclarar el bloque de envío del job de distribución para que `Proves` sea una opción visible y los destinatarios de prueba solo se usen cuando corresponde.

## Tasks
- [x] Revisar el bloque de envío y el modelo `delivery` → Verificar: frontend y backend usan `targets`, `override_recipients` y `test_mode`.
- [x] Ajustar la UI del selector y el campo de prueba → Verificar: aparece `Proves`, el destinatario por defecto se mantiene y desaparece el aviso amarillo.
- [x] Alinear la normalización backend con `test_mode` → Verificar: jobs nuevos y existentes conservan el estado correctamente.
- [ ] Verificar con tests y build → Verificar: `npm test`, `pytest` y `npm run build` pasan.

## Done When
- [ ] El formulario muestra opciones claras de envío y no mezcla pruebas con envíos reales.
- [ ] El backend solo redirige correos a prueba cuando `Proves` está activado.
