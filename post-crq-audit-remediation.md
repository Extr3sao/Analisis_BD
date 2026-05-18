# post_crq_audit focused remediation

## Goal
Corregir el siguiente riesgo funcional de mayor retorno en post_crq_audit y dejar regresión específica.

## Tasks
- [x] Aislar el riesgo funcional del pushdown temporal SQL -> Verify: mismatch identificado entre binds y TO_DATE
- [x] Corregir el helper central sin tocar múltiples call sites -> Verify: binds de rango quedan en YYYY-MM-DD
- [x] Añadir regresión unitaria del helper -> Verify: test nuevo pasa
- [x] Revalidar tests dirigidos del módulo -> Verify: test_post_crq_audit y test_post_crq_wrapped_sql en verde

## Done When
- [x] El filtro temporal empujado a SQL no usa binds ISO incompatibles con TO_DATE
