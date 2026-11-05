# ============================================================
# Royal History — Trigger Daily Generation Script
# Royal Technologies (https://www.royaltechbd.com/)
# ============================================================

$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$ROOT_DIR   = Split-Path -Parent $SCRIPT_DIR
$PAT_FILE   = Join-Path $SCRIPT_DIR ".pat"
$LOG_FILE   = Join-Path $ROOT_DIR "trigger.log"

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Check if node path in Laragon exists or system node
$nodeExe = "node"
$laragonNode = "D:\laragon\bin\nodejs\node-v22\node.exe"
if (Test-Path $laragonNode) {
    $nodeExe = $laragonNode
}

# Run generation
$genScript = Join-Path $SCRIPT_DIR "generate-history.js"
Add-Content -Path $LOG_FILE -Value "[$timestamp] Running Royal History generation..."
& $nodeExe $genScript *>> $LOG_FILE
Add-Content -Path $LOG_FILE -Value "[$timestamp] Generation completed."
