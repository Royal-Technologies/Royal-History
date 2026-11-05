# ============================================================
# Royal History — Windows Task Scheduler Setup
# Royal Technologies (https://www.royaltechbd.com/)
# ============================================================
# Run ONCE as Administrator to register daily trigger:
#   ► প্রতিদিন সকাল ০৬:০৫ AM (BST / 00:05 UTC)
# ============================================================

param(
    [string]$GitHubPAT = ""
)

if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
    [Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "❌ Administrator হিসেবে চালাতে হবে!" -ForegroundColor Red
    Write-Host "   PowerShell -এ Right-click → 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

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

if (-not $GitHubPAT) {
    if (Test-Path $PAT_FILE) {
        $GitHubPAT = Get-Content $PAT_FILE -Raw | ForEach-Object { $_.Trim() }
        Write-Host "✔ বিদ্যমান PAT ফাইল পাওয়া গেছে।" -ForegroundColor Green
    } else {
        Write-Host "🔑 GitHub PAT দেওয়া না থাকলে সরাসরি লোকাল জেনারেটর রান হবে।" -ForegroundColor Gray
    }
}

if ($GitHubPAT -and -not (Test-Path $PAT_FILE)) {
    Set-Content -Path $PAT_FILE -Value $GitHubPAT -NoNewline
    Write-Host "✔ PAT সংরক্ষিত হয়েছে: scripts/.pat" -ForegroundColor Green
}

$triggers = @(
    @{ Time = "06:05"; Desc = "দৈনিক ইতিহাস (সকাল ০৬:০৫ টা BST / 00:05 UTC)" }
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
