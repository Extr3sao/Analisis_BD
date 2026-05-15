# run.ps1
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "   SISTEMA D'AUDITORIA ORACLE - PREMIER 4.0    " -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

function Invoke-FrontendBuild {
    Write-Host "-> Executant npm run build..." -ForegroundColor Green
    cmd /c "npm.cmd run build"
    if ($LASTEXITCODE -ne 0) {
        throw "El build del frontend ha fallat amb codi $LASTEXITCODE"
    }
}

# 1. Configuració del Backend
Write-Host "`n[1/2] Iniciant Backend (FastAPI)..." -ForegroundColor Yellow
if (-not (Test-Path ".venv")) {
    Write-Host "-> Creant entorn virtual .venv..."
    python -m venv .venv
}

# 2. Build del Frontend
Write-Host "`n[1/3] Verificant dependències de Python..." -ForegroundColor Yellow
& .venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt

Write-Host "`n[2/3] Generant build del Frontend..." -ForegroundColor Yellow
$ORIGINAL_DIR = Get-Location
Set-Location src\web-app

if (-not (Test-Path "node_modules")) {
    Write-Host "-> Instal·lant dependències de Node (npm install)..."
    npm install
}

Write-Host "-> Executant npm run build..."
Invoke-FrontendBuild

Set-Location $ORIGINAL_DIR

# 3. Arrencada del Sistema
Write-Host "`n[3/3] Iniciant Sistema Unificat (Port 8000)..." -ForegroundColor Yellow

# Lancem el backend
Write-Host "-> Verificant i llançant el servidor..." -ForegroundColor Green
& .venv\Scripts\Activate.ps1
uvicorn src.api.main:app --host 127.0.0.1 --port 8000
