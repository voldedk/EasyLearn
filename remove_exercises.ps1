$content = Get-Content -Path "index.html" -Raw
$pattern22 = "(?s)<!-- Exercise 22 -->.*?<!-- Exercise 23 -->"
$pattern23 = "(?s)<!-- Exercise 23 -->.*?<!-- Exercise 24 -->"

# Replace Exercise 22 with nothing
$content = $content -replace $pattern22, ""
# Replace Exercise 23 with nothing (after already removing 22)
$content = $content -replace $pattern23, "<!-- Exercise 24 -->"

# Save changes
Set-Content -Path "index.html" -Value $content
Write-Host "Exercises 22 and 23 have been removed." 