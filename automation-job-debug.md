# Automation Job Debug

## Goal
Comprovar per què un job d'automatització surt com a `success` però no permet descarregar l'informe i aparentment no arriba el correu.

## Tasks
- [x] Inspeccionar el job i el run reals a la base d'automatització activa -> Verify: `AppData\\Local\\OracleAudit\\automation.db` conté el job i el run
- [x] Revisar backend de descàrrega i evidència de fitxer generat -> Verify: `GET /api/automation/runs/1/report` retorna el PDF
- [x] Revisar frontend de descàrrega i aïllar la causa -> Verify: logs mostren `GET /[object Promise]`
- [x] Corregir el helper de descàrrega i afegir test de regressió -> Verify: `vitest run src/api/automation.test.js`
- [x] Verificar el camí SMTP/entrega registrat pel run -> Verify: `deliveries_json` registra `status: ok` i el test email respon `success`

## Done When
- [x] La causa arrel de la descàrrega queda corregida i verificada
- [x] L'estat real del correu queda documentat amb evidència
