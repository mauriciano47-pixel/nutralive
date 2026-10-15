<#
.SYNOPSIS
  NutraLive Autonomous Pipeline - Single-Command Ship & Deploy
.DESCRIPTION
  Ejecuta pruebas unitarias, compila el bundle de producción, despliega en GitHub Pages,
  empaqueta el ZIP atómico para Cloudflare y sincroniza Git automáticamente.
#>

param(
  [string]$CommitMessage = "feat(release): actualizacion automatizada de produccion NutraLive"
)

$ErrorActionPreference = "Stop"
$rootDir = $PSScriptRoot
$frontendDir = Join-Path $rootDir "frontend"
$desktopZip = "C:\Users\mauro\OneDrive\Desktop\SUBIR_A_CLOUDFLARE_NUTRALIVE.zip"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "   🚀 NUTRALIVE AUTONOMOUS PIPELINE - SHIP & DEPLOY         " -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan

# 1. Tests automáticos
Write-Host "`n[1/5] Ejecutando suite de 26 pruebas clínicas..." -ForegroundColor Yellow
npm --prefix $frontendDir test
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Error en tests. Despliegue abortado." -ForegroundColor Red
  exit 1
}
Write-Host "✅ Pruebas unitarias al 100% OK." -ForegroundColor Green

# 2. Build Vite
Write-Host "`n[2/5] Compilando bundle de produccion con Vite..." -ForegroundColor Yellow
npm --prefix $frontendDir run build
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Error en compilación de Vite." -ForegroundColor Red
  exit 1
}
Write-Host "✅ Compilación exitosa." -ForegroundColor Green

# 3. Despliegue en GitHub Pages
Write-Host "`n[3/5] Desplegando en GitHub Pages (gh-pages)..." -ForegroundColor Yellow
npm --prefix $frontendDir run deploy
if ($LASTEXITCODE -ne 0) {
  Write-Host "⚠️ Advertencia al desplegar gh-pages." -ForegroundColor Yellow
} else {
  Write-Host "✅ GitHub Pages publicado exitosamente." -ForegroundColor Green
}

# 4. Empaquetado atómico para Cloudflare Pages
Write-Host "`n[4/5] Generando paquete ZIP atómico para Cloudflare en el Escritorio..." -ForegroundColor Yellow
if (Test-Path $desktopZip) {
  Remove-Item $desktopZip -Force
}
$distPath = Join-Path $frontendDir "dist\*"
Compress-Archive -Path $distPath -DestinationPath $desktopZip -Force
$zipInfo = Get-Item $desktopZip
$kbSize = [math]::Round($zipInfo.Length / 1024, 1)
Write-Host "✅ Paquete generado: $($zipInfo.FullName) ($kbSize KB)" -ForegroundColor Green

# 5. Git Commit & Push
Write-Host "`n[5/5] Sincronizando repositorio Git (GitHub main)..." -ForegroundColor Yellow
git add .
$gitDiff = git status --porcelain
if ($gitDiff) {
  git commit -m "$CommitMessage"
  git push origin main
  Write-Host "✅ Cambios subidos a GitHub main con éxito." -ForegroundColor Green
} else {
  Write-Host "ℹ️ No hay cambios pendientes en Git para commitear." -ForegroundColor Gray
}

# Verificación de hash en vivo
Write-Host "`n🔍 Verificando hash en vivo en GitHub Pages..." -ForegroundColor Cyan
Start-Sleep -Seconds 3
$liveScript = curl.exe -s https://mauriciano47-pixel.github.io/nutralive/ | Select-String "index-"
Write-Host "Hash servido en GitHub Pages:" -ForegroundColor White
Write-Host $liveScript -ForegroundColor Green

Write-Host "`n🎉 PIPELINE COMPLETADO EXITOSAMENTE." -ForegroundColor Green
