# Revisió informe post-CRQ

## Goal
Fer una passada final dirigida sobre el generador actiu del PDF per deixar l'informe post-CRQ pràcticament tancat a nivell institucional: reforç de `CHECK_01`, `CHECK_02`, `CHECK_03`, `CHECK_06`, `CHECK_07`, `CHECK_08`, `CHECK_10`, `CHECK_11`, `CHECK_12`, observacions finals i normalització de títols/literals residuals del builder.

## Workflow

- `systematic-debugging`: utilitzat per confirmar la font real del PDF, aïllar on persistien textos genèrics i comprovar quins blocs actius de `src/api/post_crq_audit.py` impactaven la sortida final.
- `plan-writing`: utilitzat per estructurar la passada en quatre fases: anàlisi, edició del catàleg funcional, normalització del builder/pipeline i verificació final amb PDF regenerat.

## Tasks

- [x] Confirmar el flux real del PDF i els punts actius del generador.
  - Verify: `build_post_crq_pdf_report` acaba resolent la sortida amb el builder final actiu i el catàleg funcional de `EXPLICACION_CHECKS_CONTROL_QUALITAT_CRQ.md`.
- [x] Contrastar els checks prioritaris pendents amb la lògica SQL disponible.
  - Verify: `CHECK_07`, `CHECK_08`, `CHECK_10`, `CHECK_11` i `CHECK_12` tenen textos revisats amb abast, prudència i validació posterior coherents.
- [x] Ajustar observacions finals i textos reutilitzats per evitar fórmules genèriques.
  - Verify: `final_observations.next_steps` queda prioritzat per risc i el builder final deixa d'arrossegar literals residuals amb mojibake.
- [x] Regenerar un nou PDF i validar-ne el contingut.
  - Verify: existeixen `output/pdf/report_auditoria_post_crq_general_E13DBA_revisat_v3.pdf` i el seu text extret associat.
- [x] Documentar la segona passada i els punts dubtosos.
  - Verify: existeix `canvis_aplicats_revisio_post_crq.md` amb fitxers tocats, verificacions i validacions manuals pendents.

## Done When

- [x] El PDF revisat `v3` està generat a `output/pdf/`.
- [x] Els checks pendents reflecteixen millor la lògica real i les limitacions de la SQL.
- [x] Les observacions finals i el detall per lot mantenen una prudència homogènia.
- [x] La verificació automàtica mínima (`py_compile` i `pytest` focalitzat) ha passat.
- [x] Queden documentats els punts que encara requereixen validació manual sobre dades reals.
