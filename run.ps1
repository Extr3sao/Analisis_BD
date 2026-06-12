# run.ps1
$ErrorActionPreference = "Stop"

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "   SISTEMA D'AUDITORIA ORACLE - PREMIER 4.0    " -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$VenvPath = Join-Path $ProjectRoot ".venv"
$VenvPython = Join-Path $VenvPath "Scripts\python.exe"

function Test-VenvPython {
    if (-not (Test-Path -LiteralPath $VenvPython)) {
        return $false
    }

    try {
        & $VenvPython --version *> $null
        return ($LASTEXITCODE -eq 0)
    }
    catch {
        return $false
    }
}

function New-ProjectVenv {
    if (Test-Path -LiteralPath $VenvPath) {
        $resolvedVenv = (Resolve-Path -LiteralPath $VenvPath).Path
        if ($resolvedVenv -ne (Join-Path $ProjectRoot ".venv")) {
            throw "Ruta .venv inesperada: $resolvedVenv"
        }

        Write-Host "-> L'entorn virtual .venv existeix pero no funciona. Recreant-lo..." -ForegroundColor Yellow
        Remove-Item -LiteralPath $VenvPath -Recurse -Force
    }
    else {
        Write-Host "-> Creant entorn virtual .venv..." -ForegroundColor Green
    }

    python -m venv $VenvPath
    if ($LASTEXITCODE -ne 0) {
        throw "No s'ha pogut crear l'entorn virtual .venv"
    }
}

function Invoke-FrontendBuild {
    Write-Host "-> Executant npm run build..." -ForegroundColor Green
    cmd /c "npm.cmd run build"
    if ($LASTEXITCODE -ne 0) {
        throw "El build del frontend ha fallat amb codi $LASTEXITCODE"
    }
}

Set-Location $ProjectRoot

Write-Host "`n[1/3] Verificant entorn Python..." -ForegroundColor Yellow
if (-not (Test-VenvPython)) {
    New-ProjectVenv
}

& $VenvPython --version

Write-Host "`n[2/3] Instal.lant dependencies de Python..." -ForegroundColor Yellow
& $VenvPython -m pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) {
    throw "La instal.lacio de dependencies Python ha fallat amb codi $LASTEXITCODE"
}

Write-Host "`n[3/3] Generant build del frontend..." -ForegroundColor Yellow
Set-Location (Join-Path $ProjectRoot "src\web-app")

if (-not (Test-Path -LiteralPath "node_modules")) {
    Write-Host "-> Instal.lant dependencies de Node (npm install)..." -ForegroundColor Green
    cmd /c "npm.cmd install"
    if ($LASTEXITCODE -ne 0) {
        throw "La instal.lacio de dependencies Node ha fallat amb codi $LASTEXITCODE"
    }
}

Invoke-FrontendBuild
Set-Location $ProjectRoot

Write-Host "`n[4/4] Iniciant sistema unificat (http://127.0.0.1:8000)..." -ForegroundColor Yellow
Write-Host "-> Prem CTRL+C per aturar el servidor." -ForegroundColor Green
& $VenvPython -m uvicorn src.api.main:app --host 127.0.0.1 --port 8000
if ($LASTEXITCODE -ne 0) {
    throw "El servidor ha finalitzat amb codi $LASTEXITCODE"
}
