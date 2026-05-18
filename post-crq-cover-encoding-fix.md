# Post-CRQ cover encoding fix

## Goal
Corregir el mojibake de la portada activa del PDF Post-CRQ y dejar una regresion de extraccion.

## Tasks
- [x] Reproducir la portada activa y aislar el texto roto en `post_crq_audit.py` -> Verify: PDF de prueba muestra `AUDITORIA ORACLE ?? VALIDACI?? POST-CRQ`
- [x] Corregir las cadenas visibles de la portada activa y el resumen global -> Verify: primera pagina extraida ya no contiene `VALIDACI?` ni `??`
- [x] A?adir regresion en `test_report_generation.py` -> Verify: pytest del bloque PDF pasa
- [ ] Reiniciar la aplicacion -> Verify: backend y frontend responden `200`

## Done When
- [ ] La portada activa muestra acentos correctos en PDF
