$ErrorActionPreference = 'Stop'
$project = $PSScriptRoot
$source = Join-Path $project 'installer\CPSUniversalDownloader.iss'
$onedirApp = Join-Path $project 'build-v1.3.0\onedir\CPSUniversalDownloader\CPSUniversalDownloader.exe'
$compilerCandidates = @(
    (Join-Path ${env:ProgramFiles(x86)} 'Inno Setup 6\ISCC.exe'),
    (Join-Path $env:ProgramFiles 'Inno Setup 6\ISCC.exe'),
    (Join-Path $env:LOCALAPPDATA 'Programs\Inno Setup 6\ISCC.exe')
)
$compiler = $compilerCandidates | Where-Object { $_ -and (Test-Path -LiteralPath $_) } | Select-Object -First 1

if (-not (Test-Path -LiteralPath $onedirApp)) {
    throw "Build the onedir application first using build-portable.ps1: $onedirApp"
}
if (-not $compiler) {
    throw 'Inno Setup 6 was not found. Install JRSoftware.InnoSetup with winget, then run this script again.'
}

$webviewBootstrapper = Join-Path $project 'assets\MicrosoftEdgeWebview2Setup.exe'
if (-not (Test-Path -LiteralPath $webviewBootstrapper)) {
    Invoke-WebRequest -Uri 'https://go.microsoft.com/fwlink/p/?LinkId=2124703' -OutFile $webviewBootstrapper
}
if ((Get-Item -LiteralPath $webviewBootstrapper).Length -lt 100000) {
    throw 'The Microsoft WebView2 bootstrapper download is incomplete.'
}

& $compiler $source
if ($LASTEXITCODE -ne 0) { throw 'Installer build failed.' }

$installer = Join-Path $project 'release\CPS-Universal-Downloader-v1.3.0-Setup.exe'
if (-not (Test-Path -LiteralPath $installer)) { throw "Installer output is missing: $installer" }
Write-Host "Per-user installer: $installer"
