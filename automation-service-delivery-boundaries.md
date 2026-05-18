# automation-service-delivery-boundaries

## Goal
Endurir les captures residuals d'`automation_service.py` en entregues i retries sense tocar les fronteres deliberades del scheduler/global job.

## Tasks
- [ ] Acotar les excepcions de regles de severitat i retries a tipus de lliurament coneguts -> Verify: `py_compile`
- [ ] Reutilitzar regressions existents de `test_automation.py` per comprovar que no es trenca el comportament -> Verify: pytest focalitzat
- [ ] Revalidar un bloc backend estable amb automatitzacions -> Verify: pytest bloc

## Done When
- [ ] `automation_service.py` ja no usa `except Exception` en aquests punts de negoci i els tests segueixen en verd
