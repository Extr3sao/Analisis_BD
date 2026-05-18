# main-endpoint-family-hardening

## Goal
Reducir boilerplate de errores internos en `main.py` por familias de endpoints activas y verificar que cada ruta conserva el `stage` correcto.

## Tasks
- [x] Extraer helper reusable para wrappers con `_raise_internal_http_error` -> Verify: import/compile
- [x] Aplicar helper a familia de endpoints de automatización CRUD/listado -> Verify: `tests/test_main_runtime.py`
- [x] Aplicar helper a familia de endpoints de configuración/listados de automatización -> Verify: `tests/test_main_runtime.py`
- [x] Ejecutar verificación focalizada del bloque -> Verify: py_compile + pytest dirigido

## Done When
- [x] Menos `except Exception as e` repetidos en `main.py`
- [x] Stages de error siguen correctos
- [x] Verificación del bloque en verde

