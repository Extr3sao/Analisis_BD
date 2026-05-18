# build_exe.ps1
# Script de compilació automàtica a executable independent de Windows (.exe)
# Dashboard E13BD v4.6 - Premier Edition

# Configuració de la sortida de consola en UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "       BUILD ENGINE D'AUDITORIA ORACLE - PORTABLE EXE      " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Verificar entorn virtual .venv
if (-not (Test-Path ".venv")) {
    Write-Host "-> Creant entorn virtual de Python .venv..." -ForegroundColor Green
    python -m venv .venv
}

Write-Host "`n[1/5] Iniciant entorn de Python i verificant dependències..." -ForegroundColor Yellow
& .venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m pip install pyinstaller

# 2. Compilar Frontend React
Write-Host "`n[2/5] Compilant Frontend de React..." -ForegroundColor Yellow
$ORIGINAL_DIR = Get-Location
Set-Location src\web-app

if (-not (Test-Path "node_modules")) {
    Write-Host "-> Instal·lant dependències de Node.js per al Frontend (npm install)..." -ForegroundColor Green
    npm install
}

Write-Host "-> Generant la carpeta de distribució React (dist)..." -ForegroundColor Green
cmd /c "npm.cmd run build"
if ($LASTEXITCODE -ne 0) {
    Set-Location $ORIGINAL_DIR
    Write-Error "La compilació del frontend de React ha fallat amb codi $LASTEXITCODE."
    exit $LASTEXITCODE
}
Set-Location $ORIGINAL_DIR

# 3. Compilar Docusaurus Manuals
Write-Host "`n[3/5] Compilant el Manual de Docusaurus..." -ForegroundColor Yellow
Set-Location docs

if (-not (Test-Path "node_modules")) {
    Write-Host "-> Instal·lant dependències de Node.js per a Docusaurus (npm install)..." -ForegroundColor Green
    npm install
}

Write-Host "-> Generant la carpeta de distribució del Manual (docs/build)..." -ForegroundColor Green
cmd /c "npm.cmd run build"
if ($LASTEXITCODE -ne 0) {
    Set-Location $ORIGINAL_DIR
    Write-Error "La compilació del manual interactiu ha fallat amb codi $LASTEXITCODE."
    exit $LASTEXITCODE
}
Set-Location $ORIGINAL_DIR

# 4. Crear l'executable amb PyInstaller
Write-Host "`n[4/5] Empaquetant l'aplicació en un sol executable amb PyInstaller..." -ForegroundColor Yellow

# Netegem builds anteriors si existeixen per evitar conflictes
if (Test-Path "build") { Remove-Item -Recurse -Force "build" }
if (Test-Path "dist\dashboard.exe") { Remove-Item -Force "dist\dashboard.exe" }

# Executem PyInstaller
# --onefile: Empaqueta tot en un sol executable .exe independent
# --add-data: Inclou el directori del Frontend, Docusaurus Manuals i Configuració inicial
# --hidden-import: Inclou mòduls crítics de tercers per garantir que es resolen en l'entorn frozen
pyinstaller --onefile --name "dashboard" `
    --add-data "src/web-app/dist;src/web-app/dist" `
    --add-data "docs/build;docs/build" `
    --add-data "config;config" `
    --hidden-import "uvicorn" `
    --hidden-import "fastapi" `
    --hidden-import "jinja2" `
    --hidden-import "xhtml2pdf" `
    --hidden-import "pandas" `
    --hidden-import "yaml" `
    --hidden-import "src.api.main" `
    src/api/main.py

if ($LASTEXITCODE -ne 0) {
    Write-Error "L'empaquetament de PyInstaller ha fallat amb codi $LASTEXITCODE."
    exit $LASTEXITCODE
}

# 5. Resultat final
Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "   EXECUTABLE GENERAT CORRECTAMENT A: dist\dashboard.exe   " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "   Ara pots utilitzar l'aplicació portable amb un sol clic!" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
