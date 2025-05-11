$content = Get-Content -Path "index.html" -Raw

# Find where Exercise 20 ends and Exercise 21 begins
$exercise20End = $content.IndexOf('<!-- Exercise 20 -->')
$exercise20End = $content.IndexOf('</div>', $content.IndexOf('</div>', $content.IndexOf('</div>', $exercise20End + 1) + 1) + 1) + 6

# Find where the course-completion div starts
$completionStart = $content.IndexOf('<div class="course-completion">')

if ($exercise20End -ne -1 -and $completionStart -ne -1) {
    # Create new content with exercises 1-20 only, followed by the course completion
    $newContent = $content.Substring(0, $exercise20End)
    $newContent += "`n                    `n"
    $newContent += $content.Substring($completionStart)
    
    # Update the course completion text
    $newContent = $newContent.Replace("30 exercises", "20 exercises")
    
    # Save the modified content
    Set-Content -Path "index.html" -Value $newContent
    Write-Host "Removed exercises 21-30. The file now contains only exercises 1-20."
} else {
    Write-Host "Could not find proper markers. Exercise 20 end: $exercise20End, Completion: $completionStart"
} 