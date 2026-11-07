# ============================================================
# Royal History — Trigger Daily Generation & Auto-Push Script
# Royal Technologies (https://www.royaltechbd.com/)
# ============================================================

$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$ROOT_DIR   = Split-Path -Parent $SCRIPT_DIR
$LOG_FILE   = Join-Path $ROOT_DIR "trigger.log"

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$todayStr  = Get-Date -Format "yyyy-MM-dd"

# 1. Resolve Node executable (Laragon v22 or system node)
$nodeExe = "node"
$laragonNode = "D:\laragon\bin\nodejs\node-v22\node.exe"
if (Test-Path $laragonNode) {
    $nodeExe = $laragonNode
}

# 2. Resolve Git executable (Laragon git or system git)
$gitExe = "git"
$laragonGit = "D:\laragon\bin\git\cmd\git.exe"
if (Test-Path $laragonGit) {
    $gitExe = $laragonGit
}

Set-Location $ROOT_DIR

Add-Content -Path $LOG_FILE -Value "[$timestamp] ========================================"
Add-Content -Path $LOG_FILE -Value "[$timestamp] Running Royal History daily generation..."

# 3. Run card generation
$genScript = Join-Path $SCRIPT_DIR "generate-history.js"
& $nodeExe $genScript *>> $LOG_FILE

Add-Content -Path $LOG_FILE -Value "[$timestamp] Card generation finished. Staging git changes..."

# 4. Commit and push to GitHub so GitHub Pages is instantly updated
try {
    & $gitExe add cards/ database/ *>> $LOG_FILE
    $diffStatus = & $gitExe status --porcelain cards/ database/
    if ($diffStatus) {
        & $gitExe commit -m "chore(daily): publish today's history card $todayStr [skip ci]" *>> $LOG_FILE
        & $gitExe push origin main *>> $LOG_FILE
        Add-Content -Path $LOG_FILE -Value "[$timestamp] Successfully pushed today's card to GitHub main!"
    } else {
        Add-Content -Path $LOG_FILE -Value "[$timestamp] No changes detected to commit."
    }
} catch {
    Add-Content -Path $LOG_FILE -Value "[$timestamp] Git push error: $_"
}

Add-Content -Path $LOG_FILE -Value "[$timestamp] Daily trigger process completed."
Add-Content -Path $LOG_FILE -Value "[$timestamp] ========================================"
