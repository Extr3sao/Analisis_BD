# build_exe.ps1
# Script de compilacio automatica a executable independent de Windows (.exe)
# Dashboard E13BD v4.6 - Premier Edition con Oracle Instant Client Portable

# Configuracio de la sortida de consola en UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "       BUILD ENGINE DE AUDITORIA ORACLE - PORTABLE EXE    " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Verificar entorn virtual .venv
if (-not (Test-Path ".venv")) {
    Write-Host "-> Creant entorn virtual de Python .venv..." -ForegroundColor Green
    python -m venv .venv
}

Write-Host "`n[1/5] Iniciant entorn de Python i verificant dependencies..." -ForegroundColor Yellow
& .venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m pip install pyinstaller

# 1.1 Descarrega automatica de l'Oracle Instant Client per a mode Portable (Nivell 2)
$INSTANT_CLIENT_DIR = "instantclient"
if (-not (Test-Path $INSTANT_CLIENT_DIR)) {
    Write-Host "`n[INFO] No es troba la carpeta local instantclient." -ForegroundColor Yellow
    Write-Host "-> Descarregant Oracle Instant Client Basic Lite (aprox. 30MB)..." -ForegroundColor Green
    $URL = "https://download.oracle.com/otn_software/nt/instantclient/213000/instantclient-basiclite-windows.x64-21.3.0.0.0.zip"
    $ZIP_PATH = "instantclient.zip"
    
    try {
        # Descarregar fitxer zip
        $webClient = New-Object System.Net.WebClient
        $webClient.DownloadFile($URL, $ZIP_PATH)
        
        Write-Host "-> Descomprimint Instant Client..." -ForegroundColor Green
        # Descomprimir a una carpeta temporal
        if (Test-Path "temp_instantclient") { Remove-Item -Recurse -Force "temp_instantclient" }
        Expand-Archive -Path $ZIP_PATH -DestinationPath "temp_instantclient" -Force
        
        # El zip conte la carpeta instantclient_21_3. La movem a l'arrel com a "instantclient"
        Move-Item -Path "temp_instantclient\instantclient_21_3" -Destination $INSTANT_CLIENT_DIR
        
        # Neteja de fitxers temporals
        Remove-Item -Force $ZIP_PATH
        Remove-Item -Recurse -Force "temp_instantclient"
        Write-Host "-> Oracle Instant Client portable instal.lat localment amb exit!" -ForegroundColor Green
    } catch {
        Write-Host "-> AVIS: No s'ha pogut descarregar el Instant Client. S'utilitzara el mode Thin." -ForegroundColor Yellow
    }
} else {
    Write-Host "`n[INFO] S'ha detectat una carpeta instantclient local." -ForegroundColor Green
}

# 2. Compilar Frontend React
Write-Host "`n[2/5] Compilant Frontend de React..." -ForegroundColor Yellow
$ORIGINAL_DIR = Get-Location
Set-Location src\web-app

if (-not (Test-Path "node_modules")) {
    Write-Host "-> Instal.lant dependencies de Node.js per al Frontend (npm install)..." -ForegroundColor Green
    npm install
}

Write-Host "-> Generant la carpeta de distribucio React (dist)..." -ForegroundColor Green
cmd /c "npm.cmd run build"
if ($LASTEXITCODE -ne 0) {
    Set-Location $ORIGINAL_DIR
    Write-Error "La compilacio del frontend ha fallat."
    exit $LASTEXITCODE
}
Set-Location $ORIGINAL_DIR

# 3. Compilar Docusaurus Manuals
Write-Host "`n[3/5] Compilant el Manual de Docusaurus..." -ForegroundColor Yellow
Set-Location docs

if (-not (Test-Path "node_modules")) {
    Write-Host "-> Instal.lant dependencies de Node.js per a Docusaurus (npm install)..." -ForegroundColor Green
    npm install
}

Write-Host "-> Generant la carpeta de distribucio del Manual (docs/build)..." -ForegroundColor Green
cmd /c "npm.cmd run build"
if ($LASTEXITCODE -ne 0) {
    Set-Location $ORIGINAL_DIR
    Write-Error "La compilacio del manual ha fallat."
    exit $LASTEXITCODE
}
Set-Location $ORIGINAL_DIR

# 4. Crear l'executable amb PyInstaller
Write-Host "`n[4/5] Empaquetant aplicacio en un sol executable amb PyInstaller..." -ForegroundColor Yellow

# Netegem builds anteriors si existeixen per evitar conflictes
if (Test-Path "build") { Remove-Item -Recurse -Force "build" }
if (Test-Path "dist\dashboard.exe") { Remove-Item -Force "dist\dashboard.exe" }

# Executem PyInstaller
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
    Write-Error "L'empaquetament de PyInstaller ha fallat."
    exit $LASTEXITCODE
}

# 4.1 Copiar Instant Client portable al costat de l'executable final (dist)
if (Test-Path $INSTANT_CLIENT_DIR) {
    Write-Host "`n[4.1/5] Integrant Instant Client portable al directori de distribucio..." -ForegroundColor Yellow
    if (Test-Path "dist\instantclient") { Remove-Item -Recurse -Force "dist\instantclient" }
    Copy-Item -Path $INSTANT_CLIENT_DIR -Destination "dist\instantclient" -Recurse -Force
    Write-Host "-> Carpeta instantclient portable afegida correctament a dist\instantclient!" -ForegroundColor Green
}

# 5. Resultat final
Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "   EXECUTABLE PORTABLE GENERAT CORRECTAMENT A: dist" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
Write-Host "   Pots copiar la carpeta dist sencera a qualsevol ordinador." -ForegroundColor Green
Write-Host "   Estructura portable generada:" -ForegroundColor Green
Write-Host "   - dist/" -ForegroundColor Green
Write-Host "     |-- dashboard.exe (executable principal)" -ForegroundColor Green
Write-Host "     \-- instantclient/ (llibreries de suport Oracle)" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
