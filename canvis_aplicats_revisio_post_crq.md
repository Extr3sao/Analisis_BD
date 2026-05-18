# Canvis aplicats a la revisió post-CRQ

## Artefactes generats

- PDF revisat final d'aquesta passada: `output/pdf/report_auditoria_post_crq_general_E13DBA_revisat_v3.pdf`
- Text extret per validació: `output/pdf/report_auditoria_post_crq_general_E13DBA_revisat_v3.txt`
- Artefacte precedent conservat per traça: `output/pdf/report_auditoria_post_crq_general_E13DBA_revisat_v2.pdf`
- Pla de treball utilitzat durant la revisió: `revisio-informe-post-crq.md`

## Fitxers modificats en aquesta passada

- `EXPLICACION_CHECKS_CONTROL_QUALITAT_CRQ.md`
- `src/api/post_crq_pipeline.py`
- `src/api/post_crq_audit.py`
- `canvis_aplicats_revisio_post_crq.md`
- `revisio-informe-post-crq.md`

## Checks revisats

- `CHECK_01`
- `CHECK_02`
- `CHECK_03`
- `CHECK_06`
- `CHECK_07`
- `CHECK_08`
- `CHECK_10`
- `CHECK_11`
- `CHECK_12`

## Tipus de canvis aplicats

- Reforç del català tècnic i institucional als textos encara massa genèrics o poc naturals.
- Ajust de l'annex funcional perquè reflecteixi millor l'abast real, els límits i el valor operatiu dels checks pendents.
- Homogeneïtzació dels apartats `Impacte`, `Acció requerida`, `Validació posterior` i `Limitacions i matisos` entre annex i detall per lot.
- Substitució d'observacions finals genèriques per advertiments i passos següents prioritzats per risc real, amb menció del lot que concentra més incidències i dels controls que requereixen validació manual addicional.
- Neteja de literals residuals amb problemes de codificació a la coberta, l'annex i el builder final actiu.
- Normalització dels títols canònics dels checks al `report_model`, a l'annex i al detall per evitar literals artificials provinents del payload d'integració.

## Ajustos tècnics destacats per check

- `CHECK_07`: ara diferencia millor el possible impacte i la validació posterior segons tipus d'objecte (`PACKAGE BODY`, `PROCEDURE`, `FUNCTION`, `VIEW`, `MATERIALIZED VIEW`, `TYPE`) i concreta causes probables d'invalidesa.
- `CHECK_08`: reforça la fragilitat del model, l'ambigüitat semàntica del domini, el risc de conversions o arrodoniments inesperats i la necessitat de justificar funcionalment quan una columna `NUMBER` oberta és acceptable.
- `CHECK_10`: centra el risc en l'ocultació d'errors, la pèrdua de traçabilitat i la dificultat de diagnòstic; manté la prudència sobre la manca d'exclusió de línies comentades si la SQL no la garanteix.
- `CHECK_11`: deixa explícit que la implementació efectiva del control és més estreta que la descripció funcional antiga; el check es presenta com a detecció de proximitat `LOOP/FOR + DML` en menys de 25 línies, amb exclusió global si el codi inclou `BULK COLLECT` o `FORALL`, i la resta de patrons queda com a validació manual.
- `CHECK_12`: recupera la nota de prudència perquè no tota lògica fila a fila justifica una refactorització bulk; s'afegeix context sobre volum, freqüència, finestra operativa i cost de canvi.
- `CHECK_01` i `CHECK_02`: incorporen matisos sobre taules de staging, càrrega o suport temporal perquè la incidència no es presenti de manera massa taxativa.
- `CHECK_03`: reforça la naturalesa heurística de la recomanació de `CACHE` i concreta millor el mecanisme de degradació en entorns concurrents.
- `CHECK_06`: insisteix que compartir columna líder només suggereix redundància i que l'eliminació d'un índex exigeix revisar definició completa i plans d'execució.

## Ajustos globals del report

- `final_observations.next_steps` ara prioritza primer incidències d'integritat i referencialitat, després objectes invàlids i finalment riscos de rendiment, mantenibilitat i traçabilitat.
- `final_observations.warnings` i `final_observations.next_steps` ara destaquen el lot amb més concentració d'incidències, els controls que requereixen validació manual (`CHECK_11`) i els que demanen contrast funcional específic (`CHECK_08`, `CHECK_12`).
- El bloc detallat per lot conserva `g) Limitacions i matisos` i es reforça quan el text resumit és massa pobre per als checks prioritaris.
- La coberta, l'índex, l'annex i les observacions finals s'han regenerat amb literals nets, sense mojibake visible en els textos institucionals principals.

## Verificació executada

- Compilació sintàctica:
  - `python -m py_compile src/api/post_crq_audit.py src/api/post_crq_pipeline.py src/api/report_builder.py src/core/check_explanation_catalog.py`
- Regressió focalitzada del generador:
  - `python -m pytest tests/test_report_generation.py -q -k "test_generate_post_crq_pdf_report_with_all_checks_enabled or test_generate_post_crq_pdf_report_contains_cover_content or test_post_crq_markdown_index_uses_internal_links_for_fallback"`
  - Resultat: `3 passed`
- Regeneració completa del PDF sobre el payload d'integració del projecte:
  - `output/pdf/report_auditoria_post_crq_general_E13DBA_revisat_v3.pdf`
- Verificació per extracció de text:
  - presència de `Període aplicat`
  - presència d'observacions finals prioritzades per risc i del lot amb més concentració d'incidències
  - presència de `diagnòstic` i `traça` a `CHECK_10`
  - presència de `validació manual`, `25 línies`, `BULK COLLECT` i `FORALL` a `CHECK_11`
  - presència de la nota de prudència de `CHECK_12`
  - presència dels nous matisos d'`emmagatzematge`, `conversions` i `contracte de dades` a `CHECK_08`
  - absència de mojibake visible als literals institucionals principals del PDF `v3`
- Inspecció directa del PDF generat amb `pypdf` sobre pàgines clau:
  - portada del document
  - observacions finals
  - annex funcional dels `CHECK_07`, `CHECK_08`, `CHECK_10`, `CHECK_11` i `CHECK_12`
  - comprovació dels títols canònics de `CHECK_08`, `CHECK_11` i `CHECK_12`

## Punts dubtosos o que requereixen validació manual

- `CHECK_11`: la SQL actual sembla més estreta que la descripció funcional històrica; qualsevol afirmació sobre `COMMIT`, `DBMS_OUTPUT` o `EXECUTE IMMEDIATE` concatenat requereix validació manual o ampliació explícita de la SQL.
- `CHECK_12`: la conveniència real d'una refactorització bulk s'ha de confirmar amb volum, freqüència i finestra operativa del procés real.
- `CHECK_01` i `CHECK_02`: en taules de staging, càrrega o suport temporal convé revisar el context funcional real abans d'elevar la troballa a incidència estructural.
- La validació definitiva de qualitat documental s'hauria de repetir amb un `report_model` real de producció o preproducció, no només amb el payload complet d'integració.

## Limitacions estructurals del generador

- `src/api/post_crq_audit.py` conté múltiples versions històriques del builder; per minimitzar risc, aquesta passada ha consolidat la sortida sobre les funcions finals actives sense reescriure tots els blocs antics.
- El repositori no conserva un artefacte complet del `report_model` real d'aquest informe; per això la regeneració s'ha fet amb el payload d'integració enriquit amb el catàleg funcional actualitzat.
- En aquesta passada s'han ajustat textos i composició del `report_model`, però no s'ha ampliat la SQL dels checks; la lògica de detecció continua sent la mateixa i només s'ha refinat la manera com s'explica i es presenta al PDF final.
