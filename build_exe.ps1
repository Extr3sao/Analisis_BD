# build_exe.ps1
# Script de compilacio automatica a executable independent de Windows (.exe)
# Disseny resilient d'aillament temporal contra errors de OneDrive i camins especials

# Configuracio de la sortida de consola en UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "       BUILD ENGINE DE AUDITORIA ORACLE - PORTABLE EXE    " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Variables de directoris
$PROJECT_ROOT = Get-Location
$TEMP_BUILD_DIR = "$env:TEMP\dashboard_build_tmp"
$INSTANT_CLIENT_DIR = "$PROJECT_ROOT\instantclient"

# 1. Descarrega automatica de l'Oracle Instant Client per a mode Portable (Nivell 2)
if (-not (Test-Path $INSTANT_CLIENT_DIR)) {
    Write-Host "`n[INFO] No es troba la carpeta local instantclient." -ForegroundColor Yellow
    Write-Host "-> Descarregant Oracle Instant Client Basic Lite (aprox. 30MB)..." -ForegroundColor Green
    $URL = "https://download.oracle.com/otn_software/nt/instantclient/213000/instantclient-basiclite-windows.x64-21.3.0.0.0.zip"
    $ZIP_PATH = "$PROJECT_ROOT\instantclient.zip"
    
    try {
        $webClient = New-Object System.Net.WebClient
        $webClient.DownloadFile($URL, $ZIP_PATH)
        
        Write-Host "-> Descomprimint Instant Client..." -ForegroundColor Green
        if (Test-Path "$PROJECT_ROOT\temp_instantclient") { Remove-Item -Recurse -Force "$PROJECT_ROOT\temp_instantclient" }
        Expand-Archive -Path $ZIP_PATH -DestinationPath "$PROJECT_ROOT\temp_instantclient" -Force
        
        Move-Item -Path "$PROJECT_ROOT\temp_instantclient\instantclient_21_3" -Destination $INSTANT_CLIENT_DIR
        
        Remove-Item -Force $ZIP_PATH
        Remove-Item -Recurse -Force "$PROJECT_ROOT\temp_instantclient"
        Write-Host "-> Oracle Instant Client portable configurat localment amb exit!" -ForegroundColor Green
    } catch {
        Write-Host "-> AVIS: No s'ha pogut descarregar el Instant Client. S'utilitzara el mode Thin." -ForegroundColor Yellow
    }
} else {
    Write-Host "`n[INFO] S'ha detectat una carpeta instantclient local." -ForegroundColor Green
}

# 2. Compilar Frontend React a la carpeta local original
Write-Host "`n[2/5] Compilant Frontend de React..." -ForegroundColor Yellow
Set-Location "$PROJECT_ROOT\src\web-app"

if (-not (Test-Path "node_modules")) {
    Write-Host "-> Instal.lant dependencies de Node.js per al Frontend (npm install)..." -ForegroundColor Green
    npm install
}

Write-Host "-> Generant la carpeta de distribucio React (dist)..." -ForegroundColor Green
cmd /c "npm.cmd run build"
if ($LASTEXITCODE -ne 0) {
    Set-Location $PROJECT_ROOT
    Write-Error "La compilacio del frontend ha fallat."
    exit $LASTEXITCODE
}
Set-Location $PROJECT_ROOT

# 3. Compilar Docusaurus Manuals a la carpeta local original
Write-Host "`n[3/5] Compilant el Manual de Docusaurus..." -ForegroundColor Yellow
Set-Location "$PROJECT_ROOT\docs"

if (-not (Test-Path "node_modules")) {
    Write-Host "-> Instal.lant dependencies de Node.js per a Docusaurus (npm install)..." -ForegroundColor Green
    npm install
}

Write-Host "-> Generant la carpeta de distribucio del Manual (docs/build)..." -ForegroundColor Green
cmd /c "npm.cmd run build"
if ($LASTEXITCODE -ne 0) {
    Set-Location $PROJECT_ROOT
    Write-Error "La compilacio del manual ha fallat."
    exit $LASTEXITCODE
}
Set-Location $PROJECT_ROOT

# 4. Crear directori de compilacio temporal aïllat de OneDrive i camins especials
Write-Host "`n[4/5] Preparant entorn de compilacio aillat fora de OneDrive..." -ForegroundColor Yellow
if (Test-Path $TEMP_BUILD_DIR) {
    try { Remove-Item -Recurse -Force $TEMP_BUILD_DIR } catch {}
}
New-Item -ItemType Directory -Path $TEMP_BUILD_DIR -Force | Out-Null

# Copiar fitxers font i recursos necessaris a la carpeta de compilacio aïllada
Write-Host "-> Copiant codi font i assets a $TEMP_BUILD_DIR..." -ForegroundColor Green
Copy-Item -Path "$PROJECT_ROOT\src" -Destination "$TEMP_BUILD_DIR\src" -Recurse -Force
Copy-Item -Path "$PROJECT_ROOT\config" -Destination "$TEMP_BUILD_DIR\config" -Recurse -Force
New-Item -ItemType Directory -Path "$TEMP_BUILD_DIR\docs" -Force | Out-Null
Copy-Item -Path "$PROJECT_ROOT\docs\build" -Destination "$TEMP_BUILD_DIR\docs\build" -Recurse -Force
Copy-Item -Path "$PROJECT_ROOT\requirements.txt" -Destination "$TEMP_BUILD_DIR\requirements.txt" -Force

# Canviar al directori temporal aïllat
Set-Location $TEMP_BUILD_DIR

# Crear virtualenv temporal lliure de OneDrive
Write-Host "-> Creant entorn virtual de Python temporal fora de OneDrive..." -ForegroundColor Green
python -m venv .venv
& .venv\Scripts\Activate.ps1

Write-Host "-> Instal.lant dependencies de Python en entorn aillat..." -ForegroundColor Green
python -m pip install --upgrade pip | Out-Null
python -m pip install -r requirements.txt | Out-Null
python -m pip install pyinstaller | Out-Null

# Executar PyInstaller de forma totalment aïllada i lliure d'errors de OneDrive/Errno 22
Write-Host "-> Empaquetant executable amb PyInstaller..." -ForegroundColor Green
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
    Set-Location $PROJECT_ROOT
    Write-Error "L'empaquetament de PyInstaller ha fallat al directori temporal."
    exit $LASTEXITCODE
}

# 4.1 Retornar els resultats al directori de projecte de l'usuari
Write-Host "`n[4.1/5] Transportant executable generat al directori original..." -ForegroundColor Yellow
Set-Location $PROJECT_ROOT

# Netegem distribucio anterior al projecte de l'usuari
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
New-Item -ItemType Directory -Path "dist" -Force | Out-Null

# Copiar executable a la carpeta dist de l'usuari
Copy-Item -Path "$TEMP_BUILD_DIR\dist\dashboard.exe" -Destination "$PROJECT_ROOT\dist\dashboard.exe" -Force

# Copiar Instant Client portable al costat de l'executable final (dist)
if (Test-Path $INSTANT_CLIENT_DIR) {
    Write-Host "-> Copiant Instant Client portable a dist\instantclient..." -ForegroundColor Green
    Copy-Item -Path $INSTANT_CLIENT_DIR -Destination "$PROJECT_ROOT\dist\instantclient" -Recurse -Force
}

# Netejar entorn temporal
Write-Host "-> Netejant fitxers de compilacio temporals..." -ForegroundColor Green
try { Remove-Item -Recurse -Force $TEMP_BUILD_DIR } catch {}

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
