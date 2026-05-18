# CHECK_01 ORA-00936 fix

## Goal
Corregir el cataleg Post-CRQ perqu? els checks no generin SQL invalid amb coma penjant abans de FROM.

## Tasks
- [x] Reproduir el SQL real de CHECK_01 i aillar l'error `ORA-00936` -> Verify: dump del SQL generat mostra `,` abans de `FROM`
- [x] Corregir la font canonica del cataleg Post-CRQ -> Verify: `parse_post_crq_checks()` ja no retorna SQL amb `,\nFROM`
- [x] Afegir regressio al parser/normalitzador -> Verify: test dedicat falla si reapareix el patro
- [ ] Verificar el bloc rellevant -> Verify: pytest verd al modul Post-CRQ

## Done When
- [ ] CHECK_01 deixa de generar SQL invalid
- [ ] El contracte de dates amb `TO_DATE(...)` segueix intacte
