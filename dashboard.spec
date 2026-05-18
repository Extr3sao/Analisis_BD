# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['src\\api\\main.py'],
    pathex=[],
    binaries=[],
    datas=[('src/web-app/dist', 'src/web-app/dist'), ('docs/build', 'docs/build'), ('config', 'config')],
    hiddenimports=['uvicorn', 'fastapi', 'jinja2', 'xhtml2pdf', 'pandas', 'yaml', 'src.api.main'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='dashboard',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
