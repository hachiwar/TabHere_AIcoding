$ErrorActionPreference = "Stop"
$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$ReleaseDir = Join-Path $ProjectRoot "release"

python -m pip install -r (Join-Path $PSScriptRoot "requirements.txt")
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
python (Join-Path $PSScriptRoot "tabhere_desktop.py") --self-test
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
python -m PyInstaller `
  --noconfirm `
  --clean `
  --onefile `
  --windowed `
  --name TabHereDesktop `
  --exclude-module numpy `
  --exclude-module pystray._appindicator `
  --exclude-module pystray._darwin `
  --exclude-module pystray._gtk `
  --exclude-module pystray._xorg `
  --icon (Join-Path $PSScriptRoot "icon-128.png") `
  --distpath $ReleaseDir `
  --workpath (Join-Path $ReleaseDir ".pyinstaller") `
  --specpath $ReleaseDir `
  (Join-Path $PSScriptRoot "tabhere_desktop.py")
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Built: $ReleaseDir\TabHereDesktop.exe"
