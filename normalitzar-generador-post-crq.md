# Normalitzar generador post-CRQ

## Goal
Aplicar la normalització lingüística i terminològica al camí actiu de generació dels informes post-CRQ perquè els PDFs surtin correctes d'origen.

## Tasks
- [ ] Confirmar el camí actiu de generació (`post_crq_pipeline.py` + `build_post_crq_pdf_report`) -> Verify: el flux V2 queda acotat sense tocar duplicats morts.
- [ ] Corregir els textos generats pel pipeline (resums, fallback funcional i dada tècnica) -> Verify: ja no apareixen `primary key`, `foreign keys` ni `Sense PK activa` en les sortides del model.
- [ ] Sanejar el catàleg funcional i el seu parser -> Verify: l'annex es carrega amb accents correctes, terminologia institucional i headings compatibles.
- [ ] Ajustar la normalització de títols al renderitzador actiu -> Verify: els títols visibles del PDF mostren `clau primària`, `claus foranes`, `NUMBER` i `APEX` quan pertoqui.
- [ ] Actualitzar les proves afectades i executar verificació -> Verify: les proves rellevants passen i una mostra de PDF es genera sense els textos degradats.

## Done When
- [ ] El generador produeix un PDF de mostra amb terminologia i català institucional coherents sense postedició manual.
