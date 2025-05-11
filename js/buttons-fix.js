// Fix for the Run Code, Reset, and Submit buttons in the beginner course exercises
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing button fixes for exercises...');
    
    // Find all exercise cards
    const exerciseCards = document.querySelectorAll('.exercise-card');
    
    // Apply code editor styling improvements
    const style = document.createElement('style');
    style.textContent = `
        .code-input {
            font-family: Consolas, Monaco, 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.5;
            padding: 10px;
            tab-size: 4;
            white-space: pre;
            resize: vertical;
            border: 1px solid #444 !important;
            border-radius: 4px;
            background-color: #272822 !important;
            color: #f8f8f2 !important;
        }
        .code-input:focus {
            outline: none;
            border-color: #6b2fba !important;
            box-shadow: 0 0 0 2px rgba(107, 47, 186, 0.2) !important;
        }
    `;
    document.head.appendChild(style);
    
    exerciseCards.forEach(card => {
        // Get necessary elements
        const codeEditor = card.querySelector('.code-editor');
        const codeInput = card.querySelector('.code-input');
        const starterCodeElement = card.querySelector('.starter-code');
        const outputDisplay = card.querySelector('.output-display');
        const runButton = card.querySelector('.run-code-btn');
        const resetButton = card.querySelector('.reset-code-btn');
        const submitButton = card.querySelector('.submit-code-btn');
        const statusSpan = card.querySelector('.status');
        const exerciseId = card.getAttribute('data-exercise');
        
        if (!codeEditor || !codeInput || !starterCodeElement || !outputDisplay) {
            console.log(`Exercise ${exerciseId} is missing required elements.`);
            return;
        }
        
        // Get the starter code
        const starterCode = starterCodeElement.textContent.trim();
        
        // Handle Tab key in the code editor for proper indentation
        if (codeInput) {
            // Auto-pairing for brackets and quotes
            codeInput.addEventListener('keydown', function(e) {
                const start = this.selectionStart;
                const end = this.selectionEnd;
                const char = e.key;
                
                // Handle Tab key
                if (e.key === 'Tab') {
                    // Prevent default tab behavior (which would move focus)
                    e.preventDefault();
                    
                    // Check if there is text selected (for multi-line indentation)
                    if (start !== end && this.value.substring(start, end).includes('\n')) {
                        // Get selected text
                        const selectedText = this.value.substring(start, end);
                        let result;
                        
                        if (e.shiftKey) {
                            // Shift+Tab: Remove indentation (remove up to 4 spaces from the start of each line)
                            result = selectedText.replace(/^(    |\t)/gm, '');
                        } else {
                            // Tab: Add indentation (add 4 spaces at the start of each line)
                            result = selectedText.replace(/^/gm, '    ');
                        }
                        
                        // Replace the text
                        this.value = this.value.substring(0, start) + result + this.value.substring(end);
                        
                        // Maintain the selection
                        this.selectionStart = start;
                        this.selectionEnd = start + result.length;
                    } else {
                        // Single line or no selection
                        if (e.shiftKey) {
                            // Shift+Tab: Remove indentation (up to 4 spaces before cursor)
                            const lineStart = this.value.lastIndexOf('\n', start - 1) + 1;
                            const beforeCursor = this.value.substring(lineStart, start);
                            const spacesToRemove = Math.min(4, beforeCursor.length - beforeCursor.trimLeft().length);
                            
                            if (spacesToRemove > 0) {
                                this.value = this.value.substring(0, start - spacesToRemove) + this.value.substring(start);
                                this.selectionStart = this.selectionEnd = start - spacesToRemove;
                            }
                        } else {
                            // Tab: Add indentation (4 spaces)
                            const spaces = '    ';
                            this.value = this.value.substring(0, start) + spaces + this.value.substring(end);
                            this.selectionStart = this.selectionEnd = start + spaces.length;
                        }
                    }
                    return;
                }
                
                // Handle auto-pairing for brackets and quotes
                const pairs = {
                    '(': ')',
                    '{': '}',
                    '[': ']',
                    '"': '"',
                    "'": "'"
                };
                
                if (pairs[char] && start === end) {
                    // Auto-pair: When user types an opening bracket or quote
                    e.preventDefault();
                    const closingChar = pairs[char];
                    this.value = this.value.substring(0, start) + char + closingChar + this.value.substring(end);
                    this.selectionStart = this.selectionEnd = start + 1; // Place cursor between the pair
                    return;
                }
                
                // Auto-indentation after curly braces
                if (char === 'Enter') {
                    // Check if the character before cursor is an opening curly brace
                    if (this.value.charAt(start - 1) === '{' && this.value.charAt(start) === '}') {
                        e.preventDefault();
                        const indent = '    '; // 4 spaces
                        this.value = this.value.substring(0, start) + '\n' + indent + '\n' + this.value.substring(end);
                        this.selectionStart = this.selectionEnd = start + indent.length + 1; // Place cursor on the indented line
                        return;
                    }
                }
            });
        }
        
        // Handle Run Code button
        if (runButton) {
            runButton.addEventListener('click', function() {
                console.log(`Run button clicked for exercise ${exerciseId}`);
                const code = codeInput.value;
                
                // Simple simulation of code execution
                try {
                    // Check if the code contains Console.WriteLine
                    if (code.includes('Console.WriteLine')) {
                        // Extract the content inside Console.WriteLine
                        const matches = code.match(/Console\.WriteLine\s*\(\s*(?:"([^"]*)"|@"([^"]*)"|[^)]*)\s*\)/g);
                        if (matches && matches.length > 0) {
                            let output = '';
                            
                            // For each WriteLine, extract and display the content
                            matches.forEach(match => {
                                const content = match.match(/Console\.WriteLine\s*\(\s*(?:"([^"]*)"|@"([^"]*)"|[^)]*)\s*\)/);
                                if (content && (content[1] || content[2])) {
                                    output += (content[1] || content[2]) + '\n';
                                } else {
                                    // Check for string interpolation
                                    const interpolationMatch = match.match(/Console\.WriteLine\s*\(\s*\$"([^"]*)"\s*\)/);
                                    if (interpolationMatch && interpolationMatch[1]) {
                                        output += interpolationMatch[1] + '\n';
                                    } else {
                                        output += '[variable or expression output]\n';
                                    }
                                }
                            });
                            
                            outputDisplay.textContent = output.trim() || 'Program executed successfully with no output.';
                        } else {
                            outputDisplay.textContent = 'Program executed successfully with no visible output.';
                        }
                    } else {
                        outputDisplay.textContent = 'Program executed successfully with no output. Did you forget to use Console.WriteLine()?';
                    }
                    
                    // Update the exercise status to In Progress if not already completed
                    if (statusSpan && statusSpan.textContent !== 'Completed') {
                        statusSpan.textContent = 'In Progress';
                        statusSpan.className = 'status in-progress';
                    }
                } catch (error) {
                    outputDisplay.textContent = `Error: ${error.message}`;
                }
            });
        }
        
        // Handle Reset button
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                console.log(`Reset button clicked for exercise ${exerciseId}`);
                codeInput.value = starterCode;
                outputDisplay.textContent = 'Code not run yet...';
            });
        }
        
        // Handle Submit button
        if (submitButton) {
            submitButton.addEventListener('click', function() {
                console.log(`Submit button clicked for exercise ${exerciseId}`);
                const code = codeInput.value;
                
                // Very simple solution verification (would be more complex in a real app)
                let isCorrect = false;
                let message = '';
                
                switch (exerciseId) {
                    case '1': // Hello World
                        isCorrect = code.includes('Console.WriteLine("Hello, World!")');
                        message = isCorrect ? 
                            'Hello, World!\n\n✅ Correct! You have successfully completed this exercise.' : 
                            'Your solution doesn\'t match the expected output. Remember, you need to add Console.WriteLine("Hello, World!") inside the Main method.';
                        break;
                    case '2': // Variables and Output
                        isCorrect = code.includes('string name =') && 
                                    code.includes('int age =') && 
                                    code.includes('Console.WriteLine($"My name is {name} and I am {age} years old.")');
                        message = isCorrect ? 
                            'My name is [your name] and I am [your age] years old.\n\n✅ Correct! You have successfully completed this exercise.' : 
                            'Your solution is incomplete. Make sure you\'ve created the name and age variables and used them in the Console.WriteLine statement.';
                        break;
                    // Add more cases for other exercises
                    default:
                        isCorrect = true; // Assume correct for other exercises
                        message = 'Your solution has been submitted!\n\n✅ Exercise completed successfully.';
                }
                
                outputDisplay.textContent = message;
                
                // Update status and unlock next exercise if correct
                if (isCorrect) {
                    // Mark as completed
                    statusSpan.textContent = 'Completed';
                    statusSpan.className = 'status completed';
                    
                    // Unlock next exercise
                    const exerciseNumber = parseInt(exerciseId);
                    const nextExercise = document.querySelector(`.exercise-card[data-exercise="${exerciseNumber + 1}"]`);
                    
                    if (nextExercise && nextExercise.classList.contains('locked')) {
                        // Unlock the next exercise
                        nextExercise.classList.remove('locked');
                        
                        // Update status of next exercise
                        const nextStatus = nextExercise.querySelector('.status');
                        if (nextStatus) {
                            nextStatus.textContent = 'Not Started';
                            nextStatus.className = 'status not-started';
                        }
                        
                        // Remove lock message
                        const lockedMessage = nextExercise.querySelector('.locked-message');
                        if (lockedMessage) {
                            lockedMessage.remove();
                        }
                    }
                    
                    // Update course progress
                    updateCourseProgress();
                }
            });
        }
    });
    
    // Helper function to update course progress
    function updateCourseProgress() {
        // Count the total number of exercises
        const totalExercises = document.querySelectorAll('.exercise-card').length;
        const completedExercises = document.querySelectorAll('.status.completed').length;
        
        if (totalExercises > 0) {
            const progressPercent = Math.round((completedExercises / totalExercises) * 100);
            const progressFill = document.querySelector('.progress-fill');
            const progressText = document.querySelector('.progress-text');
            
            if (progressFill) {
                progressFill.style.width = `${progressPercent}%`;
            }
            
            if (progressText) {
                progressText.textContent = `${progressPercent}% Complete (${completedExercises}/${totalExercises})`;
            }
        }
    }
    
    console.log('Button fixes initialized.');
}); 