# openrouter-check11-hardening

## Goal
Endurir `openrouter_client.py` i `post_crq_check11_ai.py` amb excepcions explícites de catàleg/xarxa/parsing sense canviar el contracte de fallback.

## Tasks
- [ ] Acotar `select_model` i `chat_completion` a errors previsibles del client OpenRouter -> Verify: `py_compile`
- [ ] Acotar el parse/validació de `CHECK_11` i afegir regressió de JSON invàlid -> Verify: pytest focalitzat
- [ ] Revalidar el bloc backend d'IA/post-crq -> Verify: pytest bloc

## Done When
- [ ] Els dos mòduls mantenen el mateix fallback funcional i les regressions passen
