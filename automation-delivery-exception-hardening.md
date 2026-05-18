# Automation Delivery Exception Hardening

## Goal
Reduir captures genèriques al camí de lliurament de correu d'automatitzacions sense tocar el contracte actual de classificació i cues de reintent.

## Tasks
- [x] Estrènyer `_send_failure_notification(...)` a errors de lliurament esperats -> Verify: regressió existent
- [x] Estrènyer `_send_email_with_tracking(...)` al mateix conjunt d'errors -> Verify: regressions existents
- [x] Verificar el mòdul focalitzat -> Verify: `pytest tests/test_automation.py`

## Done When
- [x] El camí de correu ja no depèn de `except Exception` en aquests dos punts
- [x] Les regressions del mòdul continuen verdes
