$BASE = "c:\Users\Excellent Store\OneDrive\Desktop\Teacher System\teacher-lms\src"

Write-Host "Starting theme update..."

# Get all .tsx files
$files = Get-ChildItem $BASE -Filter "*.tsx" -Recurse | Where-Object { $_.FullName -notmatch "node_modules" }

$fileCount = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    $changed = $false
    
    # Replace #050816 backgrounds with #0F2520
    if ($content -match "#050816") {
        $content = $content -replace "#050816", "#0F2520"
        $changed = $true
    }
    
    # Replace bg-[#F9F6F0] with bg-[#0F2520]
    if ($content -match 'bg-\[#F9F6F0\]') {
        $content = $content -replace 'bg-\[#F9F6F0\]', 'bg-[#0F2520]'
        $changed = $true
    }
    
    # Replace border-[#E7DED5] with border-[rgba(212,181,158,0.18)]
    if ($content -match 'border-\[#E7DED5\]') {
        $content = $content -replace 'border-\[#E7DED5\]', 'border-[rgba(212,181,158,0.18)]'
        $changed = $true
    }
    
    # Replace text-[#1C1C1C] with text-[#F9F6F0]
    if ($content -match 'text-\[#1C1C1C\]') {
        $content = $content -replace 'text-\[#1C1C1C\]', 'text-[#F9F6F0]'
        $changed = $true
    }
    
    # Replace text-[#5F5F5F] with text-[rgba(249,246,240,0.75)]
    if ($content -match 'text-\[#5F5F5F\]') {
        $content = $content -replace 'text-\[#5F5F5F\]', 'text-[rgba(249,246,240,0.75)]'
        $changed = $true
    }
    
    # Replace hover:bg-[#F3EEE7] with hover:bg-[rgba(212,181,158,0.08)]
    if ($content -match 'hover:bg-\[#F3EEE7\]') {
        $content = $content -replace 'hover:bg-\[#F3EEE7\]', 'hover:bg-[rgba(212,181,158,0.08)]'
        $changed = $true
    }
    
    # Replace border-[#1A3B34] with border-[rgba(212,181,158,0.12)]
    if ($content -match 'border-\[#1A3B34\]') {
        $content = $content -replace 'border-\[#1A3B34\]', 'border-[rgba(212,181,158,0.12)]'
        $changed = $true
    }
    
    # Replace hover:bg-[#1A3B34] with hover:bg-[rgba(212,181,158,0.1)]
    if ($content -match 'hover:bg-\[#1A3B34\]') {
        $content = $content -replace 'hover:bg-\[#1A3B34\]', 'hover:bg-[rgba(212,181,158,0.1)]'
        $changed = $true
    }
    
    # Replace text-gray-400 with text-[rgba(249,246,240,0.55)]
    if ($content -match 'text-gray-400') {
        $content = $content -replace 'text-gray-400', 'text-[rgba(249,246,240,0.55)]'
        $changed = $true
    }
    
    # Replace text-gray-300 with text-[rgba(249,246,240,0.75)]
    if ($content -match 'text-gray-300') {
        $content = $content -replace 'text-gray-300', 'text-[rgba(249,246,240,0.75)]'
        $changed = $true
    }
    
    # Replace text-blue-400 with text-[#D4B59E]
    if ($content -match 'text-blue-400') {
        $content = $content -replace 'text-blue-400', 'text-[#D4B59E]'
        $changed = $true
    }
    
    # Replace text-purple-400 with text-[#D4B59E]
    if ($content -match 'text-purple-400') {
        $content = $content -replace 'text-purple-400', 'text-[#D4B59E]'
        $changed = $true
    }
    
    # Replace from-blue-400 with from-[#D4B59E]
    if ($content -match 'from-blue-400') {
        $content = $content -replace 'from-blue-400', 'from-[#D4B59E]'
        $changed = $true
    }
    
    # Replace via-blue-500 with via-[#C7A187]
    if ($content -match 'via-blue-500') {
        $content = $content -replace 'via-blue-500', 'via-[#C7A187]'
        $changed = $true
    }
    
    # Replace to-purple-500 with to-[#D4B59E]
    if ($content -match 'to-purple-500') {
        $content = $content -replace 'to-purple-500', 'to-[#D4B59E]'
        $changed = $true
    }
    
    # Replace from-blue-500 with from-[#D4B59E]
    if ($content -match 'from-blue-500') {
        $content = $content -replace 'from-blue-500', 'from-[#D4B59E]'
        $changed = $true
    }
    
    # Replace to-purple-400 with to-[#D4B59E]
    if ($content -match 'to-purple-400') {
        $content = $content -replace 'to-purple-400', 'to-[#D4B59E]'
        $changed = $true
    }
    
    # Replace from-blue-600 with from-[#D4B59E]
    if ($content -match 'from-blue-600') {
        $content = $content -replace 'from-blue-600', 'from-[#D4B59E]'
        $changed = $true
    }
    
    # Replace to-purple-600 with to-[#C7A187]
    if ($content -match 'to-purple-600') {
        $content = $content -replace 'to-purple-600', 'to-[#C7A187]'
        $changed = $true
    }
    
    # Replace bg-blue-500 with bg-[#D4B59E]
    if ($content -match 'bg-blue-500') {
        $content = $content -replace 'bg-blue-500', 'bg-[#D4B59E]'
        $changed = $true
    }
    
    # Replace bg-purple-500 with bg-[#C7A187]
    if ($content -match 'bg-purple-500') {
        $content = $content -replace 'bg-purple-500', 'bg-[#C7A187]'
        $changed = $true
    }
    
    if ($changed) {
        Set-Content $file.FullName $content -NoNewline
        $fileCount++
    }
}

Write-Host "Updated $fileCount files"
