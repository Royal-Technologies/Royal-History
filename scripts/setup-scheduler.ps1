# ============================================================
# Royal History — Windows Task Scheduler Setup
# Royal Technologies (https://www.royaltechbd.com/)
# ============================================================
# Run ONCE to register daily trigger:
#   ► প্রতিদিন রাত ১২:০৫ AM (BST / 18:05 UTC)
# ============================================================

param(
    [string]$GitHubPAT = ""
)

$SCRIPT_DIR  = Split-Path -Parent $MyInvocation.MyCommand.Path
$TRIGGER_PS1 = Join-Path $SCRIPT_DIR "trigger-history.ps1"
$PAT_FILE    = Join-Path $SCRIPT_DIR ".pat"
$TASK_BASE   = "RoyalHistory_Daily"

Write-Host ""
Write-Host "╔══════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Royal History — Scheduler Setup            ║" -ForegroundColor Cyan
Write-Host "║   Royal Technologies (royaltechbd.com)       ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$triggers = @(
    @{ Time = "00:05"; Desc = "দৈনিক ইতিহাস (রাত ১২:০৫ টা BST / 18:05 UTC)" }
)

foreach ($t in $triggers) {
    $timeClean = $t.Time -replace ":", ""
    $taskName  = "${TASK_BASE}_${timeClean}"

    # Unregister existing task if any
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

    $action  = New-ScheduledTaskAction -Execute "powershell.exe" `
        -Argument "-NonInteractive -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$TRIGGER_PS1`""
    $trigger = New-ScheduledTaskTrigger -Daily -At $t.Time
    $setting = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopIfGoingOnBatteries -AllowStartIfOnBatteries

    Register-ScheduledTask `
        -TaskName $taskName `
        -Action $action `
        -Trigger $trigger `
        -Settings $setting `
        -Description "Royal History: $($t.Desc)" | Out-Null

    Write-Host "✔ Task তৈরি হয়েছে: $taskName ($($t.Time) BST) — $($t.Desc)" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 শিডিউলার রেজিস্ট্রেশন সম্পন্ন!" -ForegroundColor Cyan
Write-Host "টেস্ট করতে রান করুন: powershell -File `"$TRIGGER_PS1`"" -ForegroundColor Yellow
Write-Host ""
