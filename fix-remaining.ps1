$BASE = "c:\Users\Excellent Store\OneDrive\Desktop\Teacher System\teacher-lms\src"

Write-Host "Fixing remaining blue/purple colors..."

$files = Get-ChildItem $BASE -Filter "*.tsx" -Recurse | Where-Object { $_.FullName -notmatch "node_modules" }

$fileCount = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    $changed = $false
    
    # Replace bg-blue-600/5 with bg-[rgba(212,181,158,0.03)]
    if ($content -match 'bg-blue-600/5') {
        $content = $content -replace 'bg-blue-600/5', 'bg-[rgba(212,181,158,0.03)]'
        $changed = $true
    }
    
    # Replace bg-blue-400/30 with bg-[rgba(212,181,158,0.12)]
    if ($content -match 'bg-blue-400/30') {
        $content = $content -replace 'bg-blue-400/30', 'bg-[rgba(212,181,158,0.12)]'
        $changed = $true
    }
    
    # Replace bg-blue-400/40 with bg-[rgba(212,181,158,0.15)]
    if ($content -match 'bg-blue-400/40') {
        $content = $content -replace 'bg-blue-400/40', 'bg-[rgba(212,181,158,0.15)]'
        $changed = $true
    }
    
    # Replace bg-purple-400/30 with bg-[rgba(212,181,158,0.12)]
    if ($content -match 'bg-purple-400/30') {
        $content = $content -replace 'bg-purple-400/30', 'bg-[rgba(212,181,158,0.12)]'
        $changed = $true
    }
    
    # Replace bg-purple-400/20 with bg-[rgba(212,181,158,0.08)]
    if ($content -match 'bg-purple-400/20') {
        $content = $content -replace 'bg-purple-400/20', 'bg-[rgba(212,181,158,0.08)]'
        $changed = $true
    }
    
    # Replace bg-blue-300/25 with bg-[rgba(212,181,158,0.1)]
    if ($content -match 'bg-blue-300/25') {
        $content = $content -replace 'bg-blue-300/25', 'bg-[rgba(212,181,158,0.1)]'
        $changed = $true
    }
    
    # Replace bg-purple-300/20 with bg-[rgba(212,181,158,0.08)]
    if ($content -match 'bg-purple-300/20') {
        $content = $content -replace 'bg-purple-300/20', 'bg-[rgba(212,181,158,0.08)]'
        $changed = $true
    }
    
    # Replace bg-purple-400/25 with bg-[rgba(212,181,158,0.1)]
    if ($content -match 'bg-purple-400/25') {
        $content = $content -replace 'bg-purple-400/25', 'bg-[rgba(212,181,158,0.1)]'
        $changed = $true
    }
    
    # Replace bg-blue-300/20 with bg-[rgba(212,181,158,0.08)]
    if ($content -match 'bg-blue-300/20') {
        $content = $content -replace 'bg-blue-300/20', 'bg-[rgba(212,181,158,0.08)]'
        $changed = $true
    }
    
    # Replace text-blue-300 with text-[rgba(249,246,240,0.75)]
    if ($content -match 'text-blue-300') {
        $content = $content -replace 'text-blue-300', 'text-[rgba(249,246,240,0.75)]'
        $changed = $true
    }
    
    # Replace hover:border-blue-500/30 with hover:border-[rgba(212,181,158,0.3)]
    if ($content -match 'hover:border-blue-500/30') {
        $content = $content -replace 'hover:border-blue-500/30', 'hover:border-[rgba(212,181,158,0.3)]'
        $changed = $true
    }
    
    # Replace border-blue-500/20 with border-[rgba(212,181,158,0.2)]
    if ($content -match 'border-blue-500/20') {
        $content = $content -replace 'border-blue-500/20', 'border-[rgba(212,181,158,0.2)]'
        $changed = $true
    }
    
    # Replace shadow-blue-600/25 with shadow-[rgba(212,181,158,0.25)]
    if ($content -match 'shadow-blue-600/25') {
        $content = $content -replace 'shadow-blue-600/25', 'shadow-[rgba(212,181,158,0.25)]'
        $changed = $true
    }
    
    # Replace shadow-blue-500/40 with shadow-[rgba(212,181,158,0.3)]
    if ($content -match 'shadow-blue-500/40') {
        $content = $content -replace 'shadow-blue-500/40', 'shadow-[rgba(212,181,158,0.3)]'
        $changed = $true
    }
    
    # Replace shadow-blue-500/10 with shadow-[rgba(212,181,158,0.08)]
    if ($content -match 'shadow-blue-500/10') {
        $content = $content -replace 'shadow-blue-500/10', 'shadow-[rgba(212,181,158,0.08)]'
        $changed = $true
    }
    
    # Replace shadow-blue-500/5 with shadow-[rgba(212,181,158,0.03)]
    if ($content -match 'shadow-blue-500/5') {
        $content = $content -replace 'shadow-blue-500/5', 'shadow-[rgba(212,181,158,0.03)]'
        $changed = $true
    }
    
    # Replace hover:shadow-blue-500/20 with hover:shadow-[rgba(212,181,158,0.15)]
    if ($content -match 'hover:shadow-blue-500/20') {
