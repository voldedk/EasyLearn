$content = Get-Content -Path "index.html" -Raw
$startMarker = "<!-- Exercise 23 -->"
$endMarker = "<!-- Exercise 24 -->"

$startIndex = $content.IndexOf($startMarker)
$endIndex = $content.IndexOf($endMarker)

if ($startIndex -ne -1 -and $endIndex -ne -1) {
    $newContent = $content.Substring(0, $startIndex) + $endMarker + $content.Substring($endIndex + $endMarker.Length)
    Set-Content -Path "index.html" -Value $newContent
    Write-Host "Exercise 23 has been removed."
} else {
    Write-Host "Could not find Exercise 23 markers. Start: $startIndex, End: $endIndex"
} 