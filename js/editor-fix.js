// Force dark background on all code editors
(function() {
    function applyDarkThemeToEditors() {
        console.log("Applying dark theme to all code editors");
        
        // Get all code input areas
        const codeInputs = document.querySelectorAll('.code-input');
        
        // Apply styling directly to each element
        codeInputs.forEach(editor => {
            editor.style.backgroundColor = "#272822";
            editor.style.color = "#f8f8f2";
            editor.style.borderColor = "#444";
            editor.style.fontFamily = "Consolas, Monaco, 'Courier New', monospace";
        });
    }
    
    // Better handling of locked and unlocked exercises
    function fixExerciseMessages() {
        console.log("Fixing exercise locked messages");
        
        // Handle unlocked exercises only - leave locked exercises alone
        document.querySelectorAll('.exercise-card:not(.locked)').forEach(card => {
            // Make sure all elements in unlocked exercises are visible
            const content = card.querySelector('.exercise-content');
            if (content) {
                // Remove locked message from unlocked exercises
                const lockedMessage = content.querySelector('.locked-message');
                if (lockedMessage) {
                    lockedMessage.remove();
                }
                
                const descriptionDiv = content.querySelector('.exercise-description');
                const codeEditor = content.querySelector('.code-editor');
                const codeOutput = content.querySelector('.code-output');
                const hint = content.querySelector('.exercise-hint');
                
                // Show all content in unlocked exercises
                if (descriptionDiv) descriptionDiv.style.display = 'block';
                if (codeEditor) codeEditor.style.display = 'block';
                if (codeOutput) codeOutput.style.display = 'block';
                if (hint) hint.style.display = 'block';
            }
        });
    }

    // Apply immediately if document is already loaded
    if (document.readyState === "complete" || document.readyState === "interactive") {
        applyDarkThemeToEditors();
        fixExerciseMessages();
    } else {
        // Otherwise wait for DOMContentLoaded
        document.addEventListener('DOMContentLoaded', function() {
            applyDarkThemeToEditors();
            fixExerciseMessages();
        });
    }
    
    // Also apply after a short delay to ensure it catches all editors
    setTimeout(function() {
        applyDarkThemeToEditors();
        fixExerciseMessages();
    }, 500);
    
    // Apply again a bit later in case of dynamic content loading
    setTimeout(function() {
        applyDarkThemeToEditors();
        fixExerciseMessages();
    }, 1500);
})(); 