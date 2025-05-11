// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add dark theme for code editors
    const editorStyle = document.createElement('style');
    editorStyle.textContent = `
        .code-input, .exercise-card .code-input, .code-editor .code-input {
            background-color: #272822 !important;
            color: #f8f8f2 !important;
            border: 1px solid #444 !important;
        }
    `;
    document.head.appendChild(editorStyle);
    
    // Immediately initialize all code editors
    initializeCodeEditors();
    
    // Sidebar Navigation
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const pageContainer = document.querySelector('.page-container');
    const logoLink = document.querySelector('.logo-link');
    const homeButton = document.querySelector('.home-link');
    const categorySections = document.querySelectorAll('.category-section');
    const featureButtons = document.querySelectorAll('.feature-box .button');
    
    // Initialize sidebar visibility on page load - ensure it's visible on desktop
    function initSidebarVisibility() {
        if (window.innerWidth <= 992) {
            // On mobile, collapse sidebar by default
            pageContainer.classList.add('sidebar-collapsed');
        } else {
            // On desktop, show sidebar by default
            pageContainer.classList.remove('sidebar-collapsed');
        }
        
        // Update toggle icon
        updateToggleIcon();
    }
    
    // Initialize sidebar on page load
    initSidebarVisibility();
    
    // Update toggle icon based on sidebar state
    function updateToggleIcon() {
        if (sidebarToggle) {
            const icon = sidebarToggle.querySelector('i');
            if (icon) {
                if (pageContainer.classList.contains('sidebar-collapsed')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        }
    }
    
    // Toggle sidebar on mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            pageContainer.classList.toggle('sidebar-collapsed');
            updateToggleIcon();
        });
    }
    
    // Function to initialize all sidebar links
    function initializeSidebarLinks() {
        const sidebarLinks = document.querySelectorAll('.sidebar a');
        const sidebar = document.querySelector('.sidebar');

        // Add click event listeners to sidebar links
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Save current sidebar scroll position
                if (sidebar) {
                    localStorage.setItem('sidebarScrollPosition', sidebar.scrollTop);
                }
                
                // Get the destination from data-section attribute or from href
                const sectionId = this.getAttribute('data-section');
                
                // If the link has a data-section attribute, handle it with the internal navigation
                if (sectionId) {
                    e.preventDefault();
                    
                    // Check if this is an external page that should be redirected to
                    const externalPages = ['type-casting', 'operators', 'math', 'strings', 'booleans', 
                                          'if-else', 'switch', 'loops', 'arrays', 'methods-intro', 
                                          'method-parameters', 'method-overloading', 'variables', 
                                          'data-types', 'intro', 'environment', 'syntax', 'output', 'terminology',
                                          'beginner-course'];
                    
                    if (externalPages.includes(sectionId)) {
                        // Navigate to the external HTML file
                        window.location.href = sectionId + '.html';
                    } else {
                        // Show section within the current page
                        showSection(sectionId);
                    }
                }
                // If the link is pointing to another HTML file, let the browser handle it naturally
                // (no preventDefault, so the href will work normally)
            });
        });

        console.log('Sidebar links initialized: ' + sidebarLinks.length);
    }
    
    // Listen for the sidebar-loaded event
    document.addEventListener('sidebar-loaded', initializeSidebarLinks);
    // Also initialize links on DOMContentLoaded, in case the sidebar is already loaded
    // (but only initialize once)
    let sidebarLinksInitialized = false;
    setTimeout(function() {
        if (!sidebarLinksInitialized) {
            initializeSidebarLinks();
            sidebarLinksInitialized = true;
            console.log('Sidebar links initialized by timeout');
        }
    }, 500);
    
    // Function to initialize all code editors on the page
    function initializeCodeEditors() {
        const codeEditors = document.querySelectorAll('.code-editor');
        
        codeEditors.forEach(editor => {
            const starterCodeElement = editor.querySelector('.starter-code');
            const codeInput = editor.querySelector('.code-input');
            
            if (starterCodeElement && codeInput) {
                const starterCode = starterCodeElement.textContent;
                
                // Get exercise ID for potential saved code
                const exerciseCard = editor.closest('.exercise-card');
                const exerciseId = exerciseCard ? exerciseCard.getAttribute('data-exercise') : null;
                
                if (exerciseId) {
                    // Check for saved code
                    const savedCode = getSavedCode(exerciseId);
                    codeInput.value = savedCode || starterCode.trim();
                } else {
                    // No exercise ID (like in challenges), just use starter code
                    codeInput.value = starterCode.trim();
                }
                
                // Adjust height to fit content
                codeInput.style.height = `${Math.max(200, codeInput.scrollHeight)}px`;
            }
        });
    }
    
    // Function to show a specific section
    function showSection(sectionId) {
        // Hide all sections
        categorySections.forEach(section => {
            section.classList.remove('active-section');
        });
        
        // Show the selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active-section');
            
            // Update active sidebar link
            const sidebarLinks = document.querySelectorAll('.sidebar a');
            sidebarLinks.forEach(link => {
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            // Hide or show exercise cards based on whether this is a course page
            const exerciseCards = document.querySelectorAll('.exercise-card');
            const isCourse = sectionId.includes('course');
            
            exerciseCards.forEach(card => {
                if (isCourse) {
                    // Only show exercise cards on course pages
                    card.style.display = '';
                } else {
                    // Hide exercise cards on non-course pages
                    card.style.display = 'none';
                }
            });
            
            // Remove automatic scrolling to top - allow user to maintain scroll position
            
            // Auto-collapse sidebar on mobile after selection
            if (window.innerWidth <= 992) {
                pageContainer.classList.add('sidebar-collapsed');
            }
            
            // Save last visited section to localStorage
            localStorage.setItem('lastVisitedSection', sectionId);
            
            // Update URL hash without triggering a page reload
            const currentPath = window.location.pathname;
            const currentHash = window.location.hash.substring(1);
            
            if (currentHash !== sectionId) {
                history.pushState(null, null, `#${sectionId}`);
            }
        }
    }
    
    // Logo click - go to home
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('home');
        });
    }
    
    // Home button click
    if (homeButton) {
        homeButton.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('home');
        });
    }
    
    // Topic navigation (next/prev links)
    const topicNavLinks = document.querySelectorAll('.topic-nav a');
    topicNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
                
                // Update href attribute to be proper
                if (!this.getAttribute('href').startsWith('#')) {
                    this.setAttribute('href', `#${sectionId}`);
                }
            }
        });
    });
    
    // Add click event listeners to feature box buttons
    featureButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Update href attribute if needed
            if (this.getAttribute('href') !== `#${sectionId}`) {
                this.setAttribute('href', `#${sectionId}`);
            }
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm.length < 2) {
            alert('Please enter at least 2 characters to search.');
            return;
        }
        
        // Get all topic titles and content
        const topics = document.querySelectorAll('.topic');
        let foundResults = false;
        
        // First, check which section has matching content
        let sectionsWithMatches = new Map(); // Using Map to store section id and match count
        
        topics.forEach(topic => {
            const topicText = topic.textContent.toLowerCase();
            if (topicText.includes(searchTerm)) {
                const parentSection = topic.closest('.category-section');
                if (parentSection) {
                    const sectionId = parentSection.id;
                    // Increment match count for this section
                    const currentCount = sectionsWithMatches.get(sectionId) || 0;
                    sectionsWithMatches.set(sectionId, currentCount + 1);
                }
            }
        });
        
        // If we found matches, show the section with the most matches
        if (sectionsWithMatches.size > 0) {
            // Sort sections by match count (descending)
            const sortedSections = Array.from(sectionsWithMatches.entries())
                .sort((a, b) => b[1] - a[1]);
            
            const bestMatchSection = sortedSections[0][0];
            showSection(bestMatchSection);
            
            // Highlight matching topics
            let firstMatch = true;
            topics.forEach(topic => {
                const topicText = topic.textContent.toLowerCase();
                
                // Check if this topic belongs to the current section and contains the search term
                if (topic.closest('.category-section').id === bestMatchSection && topicText.includes(searchTerm)) {
                    // Highlight the topic
                    topic.style.animation = 'none';
                    setTimeout(() => {
                        topic.style.animation = 'pulse 1s';
                    }, 10);
                    
                    // Add a temporary highlight class
                    topic.classList.add('search-highlight');
                    setTimeout(() => {
                        topic.classList.remove('search-highlight');
                    }, 3000);
                    
                    // Scroll to the first match
                    if (firstMatch) {
                        topic.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        firstMatch = false;
                    }
                    
                    foundResults = true;
                }
            });
            
            // Show result count
            alert(`Found ${sortedSections[0][1]} matches in the "${document.getElementById(bestMatchSection).querySelector('h2').textContent}" section.`);
        }
        
        if (!foundResults) {
            alert('No results found for: ' + searchTerm);
        }
    }
    
    // Trigger search on button click
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // Trigger search on Enter key
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // C# Logo Animation - Advanced effect
    const logo = document.getElementById('csharp-logo');
    
    // Add a subtle hover effect to the logo
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotateY(180deg)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
            this.style.transition = 'transform 0.5s ease';
        });
    }
    
    // Add a pulsing animation to the search button to draw attention
    if (searchButton) {
        searchButton.classList.add('pulse-animation');
        setTimeout(() => {
            searchButton.classList.remove('pulse-animation');
        }, 3000);
    }
    
    // Add CSS rule for search highlight
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(107, 47, 186, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(107, 47, 186, 0); }
            100% { box-shadow: 0 0 0 0 rgba(107, 47, 186, 0); }
        }
        
        .search-highlight {
            box-shadow: 0 0 15px rgba(107, 47, 186, 0.5);
        }
        
        .pulse-animation {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Load last visited section from localStorage
    const lastVisitedSection = localStorage.getItem('lastVisitedSection');
    if (lastVisitedSection && document.getElementById(lastVisitedSection)) {
        showSection(lastVisitedSection);
    } else if (window.location.hash) {
        // Set the initial active section from URL hash if present
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        }
    }
    
    // Restore sidebar scroll position if available
    const sidebar = document.querySelector('.sidebar');
    const savedScrollPosition = localStorage.getItem('sidebarScrollPosition');
    if (sidebar && savedScrollPosition) {
        sidebar.scrollTop = parseInt(savedScrollPosition);
    }
    
    // Update hash when changing sections for better navigation
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showSection(hash);
        }
    });
    
    // Quiz functionality
    const quizContainers = document.querySelectorAll('.quiz-container');
    
    quizContainers.forEach(container => {
        const checkButton = container.querySelector('.check-answers-btn');
        const questions = container.querySelectorAll('.quiz-question');
        
        if (checkButton) {
            checkButton.addEventListener('click', function() {
                let correctCount = 0;
                
                questions.forEach(question => {
                    const feedback = question.querySelector('.quiz-feedback');
                    const correct = feedback.getAttribute('data-correct');
                    const selectedOption = question.querySelector('input[type="radio"]:checked');
                    
                    if (selectedOption) {
                        const userAnswer = selectedOption.value;
                        
                        if (userAnswer === correct) {
                            feedback.textContent = 'Correct! Well done!';
                            feedback.className = 'quiz-feedback correct';
                            correctCount++;
                        } else {
                            feedback.textContent = 'Incorrect. Try again.';
                            feedback.className = 'quiz-feedback incorrect';
                        }
                    } else {
                        feedback.textContent = 'Please select an answer.';
                        feedback.className = 'quiz-feedback incorrect';
                    }
                });
                
                // Show overall result if all answers are correct
                if (correctCount === questions.length) {
                    checkButton.textContent = '🎉 All Correct!';
                    checkButton.style.backgroundColor = '#5cb85c';
                    
                    // Save quiz progress
                    const quizId = container.closest('section').id;
                    saveQuizProgress(quizId, true);
                } else {
                    checkButton.textContent = `${correctCount}/${questions.length} Correct - Try Again`;
                }
            });
        }
        
        // Load saved quiz state
        const quizId = container.closest('section').id;
        const quizCompleted = getQuizProgress(quizId);
        
        if (quizCompleted) {
            checkButton.textContent = '🎉 All Correct!';
            checkButton.style.backgroundColor = '#5cb85c';
        }
    });
    
    // Quiz progress functions
    function saveQuizProgress(quizId, completed) {
        // Get existing progress from localStorage
        const quizProgress = JSON.parse(localStorage.getItem('quizProgress') || '{}');
        
        // Update the progress for this quiz
        quizProgress[quizId] = completed;
        
        // Save back to localStorage
        localStorage.setItem('quizProgress', JSON.stringify(quizProgress));
    }
    
    function getQuizProgress(quizId) {
        const quizProgress = JSON.parse(localStorage.getItem('quizProgress') || '{}');
        return quizProgress[quizId] || false;
    }
    
    // Code Exercise functionality
    const codeEditors = document.querySelectorAll('.code-editor');
    
    codeEditors.forEach(editor => {
        const starterCode = editor.querySelector('.starter-code').textContent;
        const codeInput = editor.querySelector('.code-input');
        const runButton = editor.querySelector('.run-code-btn');
        const resetButton = editor.querySelector('.reset-code-btn');
        const submitButton = editor.querySelector('.submit-code-btn');
        const outputDisplay = editor.closest('.exercise-card').querySelector('.output-display');
        const exerciseCard = editor.closest('.exercise-card');
        const statusSpan = exerciseCard.querySelector('.status');
        const exerciseId = exerciseCard.getAttribute('data-exercise');
        
        // Initialize code editor with starter code
        if (codeInput) {
            // Check if we have saved code for this exercise
            const savedCode = getSavedCode(exerciseId);
            codeInput.value = savedCode || starterCode.trim(); // Use saved code or starter code
            
            // Ensure code is visible and properly formatted initially
            codeInput.style.height = `${Math.max(200, codeInput.scrollHeight)}px`;
            
            // Load saved exercise state
            const exerciseStatus = getExerciseStatus(exerciseId);
            if (exerciseStatus) {
                statusSpan.textContent = exerciseStatus;
                statusSpan.className = `status ${exerciseStatus.toLowerCase().replace(' ', '-')}`;
                
                // If exercise is completed, show the output
                if (exerciseStatus === 'Completed') {
                    const result = verifyCode(codeInput.value, exerciseId);
                    outputDisplay.textContent = result.output;
                }
            }
            
            // Run code button
            if (runButton) {
                runButton.addEventListener('click', function() {
                    // For a real implementation, this would send code to a server for execution
                    // For now, we'll simulate execution for the Hello World exercise
                    const code = codeInput.value;
                    simulateCodeExecution(code, outputDisplay);
                    
                    // Save the current code
                    saveCode(exerciseId, code);
                    
                    // Mark as in progress
                    if (statusSpan && statusSpan.textContent === 'Not Started') {
                        statusSpan.textContent = 'In Progress';
                        statusSpan.className = 'status in-progress';
                        saveExerciseStatus(exerciseId, 'In Progress');
                    }
                });
            }
            
            // Reset code button
            if (resetButton) {
                resetButton.addEventListener('click', function() {
                    codeInput.value = starterCode;
                    outputDisplay.textContent = 'Code not run yet...';
                    
                    // Clear saved code
                    saveCode(exerciseId, starterCode);
                });
            }
            
            // Submit code button
            if (submitButton) {
                submitButton.addEventListener('click', function() {
                    const code = codeInput.value;
                    const result = verifyCode(code, exerciseId);
                    
                    if (result.correct) {
                        outputDisplay.textContent = result.output;
                        statusSpan.textContent = 'Completed';
                        statusSpan.className = 'status completed';
                        
                        // Save status
                        saveExerciseStatus(exerciseId, 'Completed');
                        
                        // Unlock next exercise if this one is completed
                        const exerciseNumber = parseInt(exerciseId);
                        const nextExercise = document.querySelector(`.exercise-card[data-exercise="${exerciseNumber + 1}"]`);
                        
                        if (nextExercise && nextExercise.classList.contains('locked')) {
                            nextExercise.classList.remove('locked');
                            const nextStatus = nextExercise.querySelector('.status');
                            const nextContent = nextExercise.querySelector('.exercise-content');
                            const nextDescriptionDiv = nextContent.querySelector('.exercise-description');
                            const nextCodeEditor = nextContent.querySelector('.code-editor');
                            const nextCodeOutput = nextContent.querySelector('.code-output');
                            const nextHint = nextContent.querySelector('.exercise-hint');
                            
                            if (nextStatus) nextStatus.textContent = 'Not Started';
                            
                            // Clear any locked message and show the exercise content
                            if (nextContent) {
                                const lockedMessage = nextContent.querySelector('.locked-message');
                                if (lockedMessage) {
                                    lockedMessage.remove();
                                }
                                
                                if (nextDescriptionDiv) nextDescriptionDiv.style.display = 'block';
                                if (nextCodeEditor) nextCodeEditor.style.display = 'block';
                                if (nextCodeOutput) nextCodeOutput.style.display = 'block';
                                if (nextHint) nextHint.style.display = 'block';
                                
                                // Initialize the code input for the next exercise
                                const nextCodeInput = nextCodeEditor ? nextCodeEditor.querySelector('.code-input') : null;
                                const nextStarterCode = nextCodeEditor ? nextCodeEditor.querySelector('.starter-code').textContent : null;
                                
                                if (nextCodeInput && nextStarterCode) {
                                    nextCodeInput.value = nextStarterCode.trim();
                                    nextCodeInput.style.height = `${Math.max(200, nextCodeInput.scrollHeight)}px`;
                                }
                            }
                            
                            // Save status of next exercise
                            saveExerciseStatus((exerciseNumber + 1).toString(), 'Not Started');
                        }
                        
                        // Update progress
                        updateCourseProgress();
                    } else {
                        outputDisplay.textContent = result.output;
                    }
                });
            }
        }
    });
    
    // Exercise progress functions
    function saveExerciseStatus(exerciseId, status) {
        // Get existing progress from localStorage
        const exerciseProgress = JSON.parse(localStorage.getItem('exerciseProgress') || '{}');
        
        // Update the status for this exercise
        exerciseProgress[exerciseId] = status;
        
        // Save back to localStorage
        localStorage.setItem('exerciseProgress', JSON.stringify(exerciseProgress));
    }
    
    function getExerciseStatus(exerciseId) {
        const exerciseProgress = JSON.parse(localStorage.getItem('exerciseProgress') || '{}');
        return exerciseProgress[exerciseId] || null;
    }
    
    function saveCode(exerciseId, code) {
        // Get existing saved code from localStorage
        const savedCodes = JSON.parse(localStorage.getItem('savedCodes') || '{}');
        
        // Update the code for this exercise
        savedCodes[exerciseId] = code;
        
        // Save back to localStorage
        localStorage.setItem('savedCodes', JSON.stringify(savedCodes));
    }
    
    function getSavedCode(exerciseId) {
        const savedCodes = JSON.parse(localStorage.getItem('savedCodes') || '{}');
        return savedCodes[exerciseId] || null;
    }
    
    // Verify code solution (for demo purposes)
    function verifyCode(code, exerciseNumber) {
        // For exercise 1 (Hello World)
        if (exerciseNumber === '1') {
            // Check if Console.WriteLine is inside the Main method
            const mainMethodRegex = /static\s+void\s+Main\s*\([^)]*\)\s*{([^}]*)}/s;
            const mainMethodMatch = code.match(mainMethodRegex);
            
            if (!mainMethodMatch) {
                return {
                    correct: false,
                    output: 'Error: Could not find the Main method. Make sure you haven\'t removed or altered the Main method structure.'
                };
            }
            
            const mainMethodBody = mainMethodMatch[1];
            
            // Check if Console.WriteLine with appropriate string is in the Main method body
            const writeLineRegex = /Console\.WriteLine\s*\(\s*"(Hello,?\s*World!?)"\s*\)/i;
            const writeLineMatch = mainMethodBody.match(writeLineRegex);
            
            if (writeLineMatch) {
                return {
                    correct: true,
                    output: 'Hello, World!\n\n✅ Correct! You have successfully completed this exercise.'
                };
            } else if (mainMethodBody.includes('Console.WriteLine')) {
                return {
                    correct: false,
                    output: 'Your code includes Console.WriteLine, but you need to specifically print "Hello, World!" - check your spelling and punctuation.'
                };
            } else {
                return {
                    correct: false,
                    output: 'Your solution doesn\'t match the expected output. Remember, you need to add Console.WriteLine("Hello, World!") inside the Main method.'
                };
            }
        }
        
        // For exercise 2 (Variables and Output)
        else if (exerciseNumber === '2') {
            const mainMethodRegex = /static\s+void\s+Main\s*\([^)]*\)\s*{([^}]*)}/s;
            const mainMethodMatch = code.match(mainMethodRegex);
            
            if (!mainMethodMatch) {
                return {
                    correct: false,
                    output: 'Error: Could not find the Main method. Make sure you haven\'t removed or altered the Main method structure.'
                };
            }
            
            const mainMethodBody = mainMethodMatch[1];
            
            // Check for string variable declaration
            const stringVarRegex = /string\s+(\w+)\s*=\s*["'](.*)["']/;
            const stringVarMatch = mainMethodBody.match(stringVarRegex);
            
            // Check for int variable declaration
            const intVarRegex = /int\s+(\w+)\s*=\s*(\d+)/;
            const intVarMatch = mainMethodBody.match(intVarRegex);
            
            // Check for Console.WriteLine with both variables
            const outputRegex = /Console\.WriteLine\s*\(\s*\$"My name is \{(\w+)\} and I am \{(\w+)\} years old."\s*\)/;
            const outputMatch = mainMethodBody.match(outputRegex);
            
            if (!stringVarMatch) {
                return {
                    correct: false,
                    output: 'You need to declare a string variable for the name.'
                };
            }
            
            if (!intVarMatch) {
                return {
                    correct: false,
                    output: 'You need to declare an integer variable for the age.'
                };
            }
            
            if (!outputMatch) {
                return {
                    correct: false,
                    output: 'You need to complete the Console.WriteLine statement with both name and age variables.'
                };
            }
            
            // Check if the variables used in the output match the declared variables
            const nameVar = stringVarMatch[1];
            const ageVar = intVarMatch[1];
            const nameInOutput = outputMatch[1];
            const ageInOutput = outputMatch[2];
            
            if (nameVar !== nameInOutput || ageVar !== ageInOutput) {
                return {
                    correct: false,
                    output: 'The variable names in your Console.WriteLine statement don\'t match the variables you declared. Make sure to use the correct variable names.'
                };
            }
            
            // Extract variables to simulate output
            const name = stringVarMatch[2];
            const age = intVarMatch[2];
            
            return {
                correct: true,
                output: `My name is ${name} and I am ${age} years old.\n\n✅ Correct! You have successfully completed this exercise.`
            };
        }
        
        // For exercise 3 (Basic Math Operations)
        else if (exerciseNumber === '3') {
            const mainMethodRegex = /static\s+void\s+Main\s*\([^)]*\)\s*{([^}]*)}/s;
            const mainMethodMatch = code.match(mainMethodRegex);
            
            if (!mainMethodMatch) {
                return {
                    correct: false,
                    output: 'Error: Could not find the Main method. Make sure you haven\'t removed or altered the Main method structure.'
                };
            }
            
            const mainMethodBody = mainMethodMatch[1];
            
            // Check for all math operations
            const sumRegex = /int\s+sum\s*=\s*a\s*\+\s*b\s*;/;
            const differenceRegex = /int\s+difference\s*=\s*a\s*\-\s*b\s*;/;
            const productRegex = /int\s+product\s*=\s*a\s*\*\s*b\s*;/;
            const quotientRegex = /int\s+quotient\s*=\s*a\s*\/\s*b\s*;/;
            const remainderRegex = /int\s+remainder\s*=\s*a\s*%\s*b\s*;/;
            
            if (!sumRegex.test(mainMethodBody)) {
                return {
                    correct: false,
                    output: 'Error in TODO 1: You need to correctly calculate the sum as "a + b".'
                };
            }
            
            if (!differenceRegex.test(mainMethodBody)) {
                return {
                    correct: false,
                    output: 'Error in TODO 2: You need to correctly calculate the difference as "a - b".'
                };
            }
            
            if (!productRegex.test(mainMethodBody)) {
                return {
                    correct: false,
                    output: 'Error in TODO 3: You need to correctly calculate the product as "a * b".'
                };
            }
            
            if (!quotientRegex.test(mainMethodBody)) {
                return {
                    correct: false,
                    output: 'Error in TODO 4: You need to correctly calculate the quotient as "a / b".'
                };
            }
            
            if (!remainderRegex.test(mainMethodBody)) {
                return {
                    correct: false,
                    output: 'Error in TODO 5: You need to correctly calculate the remainder as "a % b".'
                };
            }
            
            // All operations are correct
            return {
                correct: true,
                output: `a = 10, b = 3
Sum: 13
Difference: 7
Product: 30
Quotient: 3
Remainder: 1

✅ Correct! You have successfully completed this exercise.`
            };
        }
        
        // Default case
        return {
            correct: false,
            output: 'Unable to verify this exercise yet.'
        };
    }
    
    // Simulate code execution (for demo purposes)
    function simulateCodeExecution(code, outputElement) {
        if (outputElement) {
            try {
                // First, check if the Main method exists
                const mainMethodRegex = /static\s+void\s+Main\s*\([^)]*\)\s*{([^}]*)}/s;
                const mainMethodMatch = code.match(mainMethodRegex);
                
                if (!mainMethodMatch) {
                    outputElement.textContent = 'Error: Could not find the Main method.';
                    return;
                }
                
                const mainMethodBody = mainMethodMatch[1];
                let output = '';
                
                // Simple variable tracking for simulation
                const variables = {};
                
                // Extract string variables
                const stringVarRegex = /string\s+(\w+)\s*=\s*["'](.*)["']/g;
                let stringMatch;
                while ((stringMatch = stringVarRegex.exec(mainMethodBody)) !== null) {
                    variables[stringMatch[1]] = stringMatch[2];
                }
                
                // Extract integer variables
                const intVarRegex = /int\s+(\w+)\s*=\s*(\d+)/g;
                let intMatch;
                while ((intMatch = intVarRegex.exec(mainMethodBody)) !== null) {
                    variables[intMatch[1]] = parseInt(intMatch[2]);
                }
                
                // Extract variable assignments 
                const assignmentRegex = /(\w+)\s*=\s*(.+?);/g;
                let assignMatch;
                while ((assignMatch = assignmentRegex.exec(mainMethodBody)) !== null) {
                    // Skip declarations we already handled
                    if (assignMatch[0].includes('string') || assignMatch[0].includes('int')) {
                        continue;
                    }
                    
                    const varName = assignMatch[1];
                    const expression = assignMatch[2];
                    
                    // Very simple expression evaluation (only for basic operations)
                    if (expression.includes('+') || expression.includes('-') || 
                        expression.includes('*') || expression.includes('/') || 
                        expression.includes('%')) {
                        
                        // Check if it's a math operation between two variables
                        const mathRegex = /(\w+)\s*([\+\-\*\/%])\s*(\w+)/;
                        const mathMatch = expression.match(mathRegex);
                        
                        if (mathMatch) {
                            const leftVar = mathMatch[1];
                            const operator = mathMatch[2];
                            const rightVar = mathMatch[3];
                            
                            if (variables[leftVar] !== undefined && variables[rightVar] !== undefined) {
                                switch(operator) {
                                    case '+':
                                        variables[varName] = variables[leftVar] + variables[rightVar];
                                        break;
                                    case '-':
                                        variables[varName] = variables[leftVar] - variables[rightVar];
                                        break;
                                    case '*':
                                        variables[varName] = variables[leftVar] * variables[rightVar];
                                        break;
                                    case '/':
                                        variables[varName] = variables[leftVar] / variables[rightVar];
                                        break;
                                    case '%':
                                        variables[varName] = variables[leftVar] % variables[rightVar];
                                        break;
                                }
                            }
                        }
                    }
                }
                
                // Look for Console.WriteLine statements in the Main method
                const writeLineRegex = /Console\.WriteLine\s*\(\s*(?:@||\$)?"([^"]*)"|([^)]*)\)/g;
                let writeLineMatch;
                
                // Reset regex lastIndex
                writeLineRegex.lastIndex = 0;
                
                // Find all Console.WriteLine statements
                while ((writeLineMatch = writeLineRegex.exec(mainMethodBody)) !== null) {
                    if (writeLineMatch[1]) {
                        // String literal output
                        let line = writeLineMatch[1];
                        
                        // Handle string interpolation with {varName}
                        const interpolationRegex = /\{(\w+)\}/g;
                        let interpolationMatch;
                        
                        while ((interpolationMatch = interpolationRegex.exec(line)) !== null) {
                            const varName = interpolationMatch[1];
                            if (variables[varName] !== undefined) {
                                line = line.replace(`{${varName}}`, variables[varName]);
                            }
                        }
                        
                        output += line + '\n';
                    } else if (writeLineMatch[2]) {
                        // Variable output
                        const varName = writeLineMatch[2].trim();
                        if (variables[varName] !== undefined) {
                            output += variables[varName] + '\n';
                        } else {
                            output += '[undefined variable]\n';
                        }
                    }
                }
                
                if (output) {
                    outputElement.textContent = output.trim();
                } else {
                    outputElement.textContent = 'No output. Did you forget to use Console.WriteLine()?';
                }
            } catch (e) {
                outputElement.textContent = 'Error in code simulation: ' + e.message;
            }
        }
    }
    
    // Update course progress
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
                progressFill.style.setProperty('--target-width', `${progressPercent}%`);
            }
            
            if (progressText) {
                progressText.textContent = `${progressPercent}% Complete (${completedExercises}/${totalExercises})`;
            }
            
            // Save progress percentage
            localStorage.setItem('courseProgress', progressPercent);
            localStorage.setItem('completedExercises', completedExercises);
        }
    }
    
    // Initialize course progress
    function initCourseProgress() {
        // Get saved progress or default to calculating it
        const savedProgress = localStorage.getItem('courseProgress');
        const savedCompleted = localStorage.getItem('completedExercises') || 0;
        const totalExercises = document.querySelectorAll('.exercise-card').length;
        
        if (savedProgress !== null) {
            const progressFill = document.querySelector('.progress-fill');
            const progressText = document.querySelector('.progress-text');
            
            if (progressFill) {
                progressFill.style.width = `${savedProgress}%`;
            }
            
            if (progressText) {
                progressText.textContent = `${savedProgress}% Complete (${savedCompleted}/${totalExercises})`;
            }
        } else {
            updateCourseProgress();
        }
        
        // Check for completed exercises and unlock next ones
        const exerciseCards = document.querySelectorAll('.exercise-card');
        exerciseCards.forEach(card => {
            const exerciseId = card.getAttribute('data-exercise');
            const status = getExerciseStatus(exerciseId);
            
            if (status) {
                const statusSpan = card.querySelector('.status');
                if (statusSpan) {
                    statusSpan.textContent = status;
                    statusSpan.className = `status ${status.toLowerCase().replace(' ', '-')}`;
                }
                
                // If this exercise is completed, make sure the next one is unlocked
                if (status === 'Completed') {
                    const nextExerciseId = (parseInt(exerciseId) + 1).toString();
                    const nextExercise = document.querySelector(`.exercise-card[data-exercise="${nextExerciseId}"]`);
                    
                    if (nextExercise && nextExercise.classList.contains('locked')) {
                        nextExercise.classList.remove('locked');
                        const nextStatus = nextExercise.querySelector('.status');
                        if (nextStatus) {
                            const nextSavedStatus = getExerciseStatus(nextExerciseId);
                            nextStatus.textContent = nextSavedStatus || 'Not Started';
                            nextStatus.className = `status ${(nextSavedStatus || 'not-started').toLowerCase().replace(' ', '-')}`;
                        }
                    }
                }
            }
            
            // Additional fix: Make sure all unlocked exercises don't show the locked message
            const lockedMessage = card.querySelector('.locked-message');
            if (lockedMessage) {
                lockedMessage.remove();
            }
            
            // Make sure content elements are visible
            const content = card.querySelector('.exercise-content');
            if (content) {
                const descriptionDiv = content.querySelector('.exercise-description');
                const codeEditor = content.querySelector('.code-editor');
                const codeOutput = content.querySelector('.code-output');
                const hint = content.querySelector('.exercise-hint');
                
                if (descriptionDiv) descriptionDiv.style.display = 'block';
                if (codeEditor) codeEditor.style.display = 'block';
                if (codeOutput) codeOutput.style.display = 'block';
                if (hint) hint.style.display = 'block';
            }
        });
    }
    
    // Initialize course progress
    initCourseProgress();
    
    // Fix for unlocked exercises still showing lock message
    function fixUnlockedExercises() {
        document.querySelectorAll('.exercise-card:not(.locked)').forEach(card => {
            const content = card.querySelector('.exercise-content');
            if (content) {
                // Remove locked message if it exists
                const lockedMessage = content.querySelector('.locked-message');
                if (lockedMessage) {
                    lockedMessage.remove();
                }
                
                // Make sure content elements are visible
                const descriptionDiv = content.querySelector('.exercise-description');
                const codeEditor = content.querySelector('.code-editor');
                const codeOutput = content.querySelector('.code-output');
                const hint = content.querySelector('.exercise-hint');
                
                if (descriptionDiv) descriptionDiv.style.display = 'block';
                if (codeEditor) codeEditor.style.display = 'block';
                if (codeOutput) codeOutput.style.display = 'block';
                if (hint) hint.style.display = 'block';
            }
        });
    }
    
    // Run the fix
    fixUnlockedExercises();
    
    // Code challenge functionality
    const challengeButtons = document.querySelectorAll('.start-challenge-btn');
    
    challengeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const challenge = this.getAttribute('data-challenge');
            const challengeCard = this.closest('.challenge-card');
            const challengeEditor = challengeCard.querySelector('.challenge-editor');
            
            if (challengeEditor) {
                // Toggle the editor visibility
                if (challengeEditor.style.display === 'none') {
                    challengeEditor.style.display = 'block';
                    this.textContent = 'Hide Editor';
                    
                    // Initialize the editor if needed
                    const codeInput = challengeEditor.querySelector('.code-input');
                    const starterCode = challengeEditor.querySelector('.starter-code').textContent;
                    
                    // Load saved code if available
                    const savedChallengeCode = localStorage.getItem(`challenge_${challenge}`);
                    if (savedChallengeCode) {
                        codeInput.value = savedChallengeCode;
                    } else {
                        codeInput.value = starterCode.trim();
                    }
                    
                    // Set proper height
                    codeInput.style.height = `${Math.max(200, codeInput.scrollHeight)}px`;
                } else {
                    challengeEditor.style.display = 'none';
                    this.textContent = 'Start Challenge';
                }
            } else {
                // For challenges without an editor yet
                alert(`This would load the ${challenge} challenge in a code editor.`);
            }
        });
    });
    
    // Run code button for challenges
    document.querySelectorAll('.challenge-card .run-code-btn').forEach(button => {
        button.addEventListener('click', function() {
            const challengeCard = this.closest('.challenge-card');
            const codeInput = challengeCard.querySelector('.code-input');
            const outputDisplay = challengeCard.querySelector('.output-display');
            const challenge = challengeCard.querySelector('.start-challenge-btn').getAttribute('data-challenge');
            
            // Save code to localStorage
            localStorage.setItem(`challenge_${challenge}`, codeInput.value);
            
            // Simulate code execution
            simulateChallengeExecution(codeInput.value, outputDisplay, challenge);
        });
    });
    
    // Reset code button for challenges
    document.querySelectorAll('.challenge-card .reset-code-btn').forEach(button => {
        button.addEventListener('click', function() {
            const challengeCard = this.closest('.challenge-card');
            const codeInput = challengeCard.querySelector('.code-input');
            const starterCode = challengeCard.querySelector('.starter-code').textContent;
            const outputDisplay = challengeCard.querySelector('.output-display');
            const challenge = challengeCard.querySelector('.start-challenge-btn').getAttribute('data-challenge');
            
            // Reset code and clear localStorage
            codeInput.value = starterCode.trim();
            localStorage.removeItem(`challenge_${challenge}`);
            outputDisplay.textContent = 'Code not run yet...';
        });
    });
    
    // Check solution button for challenges
    document.querySelectorAll('.check-challenge-btn').forEach(button => {
        button.addEventListener('click', function() {
            const challenge = this.getAttribute('data-challenge');
            const challengeCard = this.closest('.challenge-card');
            const codeInput = challengeCard.querySelector('.code-input');
            const outputDisplay = challengeCard.querySelector('.output-display');
            
            // Verify challenge solution
            const result = verifyChallenge(codeInput.value, challenge);
            outputDisplay.textContent = result.output;
            
            if (result.correct) {
                // Mark as completed
                challengeCard.classList.add('completed');
                this.textContent = '✅ Correct!';
                this.style.backgroundColor = '#5cb85c';
                
                // Save completion status
                localStorage.setItem(`challenge_${challenge}_completed`, 'true');
            }
        });
    });
    
    // Load challenge completion status
    document.querySelectorAll('.check-challenge-btn').forEach(button => {
        const challenge = button.getAttribute('data-challenge');
        const completed = localStorage.getItem(`challenge_${challenge}_completed`) === 'true';
        
        if (completed) {
            const challengeCard = button.closest('.challenge-card');
            challengeCard.classList.add('completed');
            button.textContent = '✅ Correct!';
            button.style.backgroundColor = '#5cb85c';
        }
    });
    
    // Simulate code execution for challenges
    function simulateChallengeExecution(code, outputElement, challenge) {
        if (challenge === 'fizzbuzz') {
            try {
                // First, check if the Main method exists
                const mainMethodRegex = /static\s+void\s+Main\s*\([^)]*\)\s*{([^}]*)}/s;
                const mainMethodMatch = code.match(mainMethodRegex);
                
                if (!mainMethodMatch) {
                    outputElement.textContent = 'Error: Could not find the Main method.';
                    return;
                }
                
                const mainMethodBody = mainMethodMatch[1];
                
                // Look for loops that might be implementing FizzBuzz
                const hasForLoop = /for\s*\([^)]*\)/.test(mainMethodBody);
                const hasWhileLoop = /while\s*\([^)]*\)/.test(mainMethodBody);
                
                if (!hasForLoop && !hasWhileLoop) {
                    outputElement.textContent = 'No loop detected. You need a loop to implement FizzBuzz.';
                    return;
                }
                
                // Check if Console.WriteLine is used
                if (!mainMethodBody.includes('Console.WriteLine')) {
                    outputElement.textContent = 'No output statements found. Use Console.WriteLine to output your results.';
                    return;
                }
                
                // Simulate limited FizzBuzz output (first 20 numbers)
                let output = '// Simulated output (first 20 numbers only):\n';
                for (let i = 1; i <= 20; i++) {
                    if (i % 3 === 0 && i % 5 === 0) {
                        output += 'FizzBuzz\n';
                    } else if (i % 3 === 0) {
                        output += 'Fizz\n';
                    } else if (i % 5 === 0) {
                        output += 'Buzz\n';
                    } else {
                        output += i + '\n';
                    }
                }
                
                output += '// ... more output truncated for display';
                outputElement.textContent = output;
            } catch (e) {
                outputElement.textContent = 'Error in code simulation: ' + e.message;
            }
        } else {
            outputElement.textContent = 'Simulation for this challenge is not implemented yet.';
        }
    }
    
    // Verify challenge solutions
    function verifyChallenge(code, challenge) {
        if (challenge === 'fizzbuzz') {
            // Check if the Main method exists
            const mainMethodRegex = /static\s+void\s+Main\s*\([^)]*\)\s*{([^}]*)}/s;
            const mainMethodMatch = code.match(mainMethodRegex);
            
            if (!mainMethodMatch) {
                return {
                    correct: false,
                    output: 'Error: Could not find the Main method.'
                };
            }
            
            const mainMethodBody = mainMethodMatch[1];
            
            // Check for required elements of a FizzBuzz solution
            const hasLoop = /for\s*\([^)]*\)|while\s*\([^)]*\)/.test(mainMethodBody);
            const hasFizzCheck = /(%\s*3\s*==\s*0)|(\s*3\s*==\s*[^%]*%\s*3)/.test(mainMethodBody);
            const hasBuzzCheck = /(%\s*5\s*==\s*0)|(\s*5\s*==\s*[^%]*%\s*5)/.test(mainMethodBody);
            const hasFizzBuzzOutput = /FizzBuzz/.test(mainMethodBody);
            const hasFizzOutput = /Fizz/.test(mainMethodBody);
            const hasBuzzOutput = /Buzz/.test(mainMethodBody);
            
            if (!hasLoop) {
                return {
                    correct: false,
                    output: 'Your solution needs a loop (for or while) to iterate through numbers 1 to 100.'
                };
            }
            
            if (!hasFizzCheck || !hasBuzzCheck) {
                return {
                    correct: false,
                    output: 'Your solution should check if numbers are divisible by 3 and 5 using the modulo operator (%).'
                };
            }
            
            if (!hasFizzBuzzOutput || !hasFizzOutput || !hasBuzzOutput) {
                return {
                    correct: false,
                    output: 'Your solution should output "Fizz" for multiples of 3, "Buzz" for multiples of 5, and "FizzBuzz" for multiples of both.'
                };
            }
            
            // If all checks pass, show a success message with sample output
            return {
                correct: true,
                output: `Correct FizzBuzz implementation! Here's a sample of the output:

1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
...

✅ Challenge completed successfully!`
            };
        }
        
        return {
            correct: false,
            output: 'Verification for this challenge is not implemented yet.'
        };
    }
    
    // Initialize syntax highlighting
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
    
    // Hide exercises on non-course pages on initial load
    const currentSection = localStorage.getItem('lastVisitedSection');
    const isCourse = currentSection && currentSection.includes('course');
    
    if (!isCourse) {
        const exerciseCards = document.querySelectorAll('.exercise-card');
        exerciseCards.forEach(card => {
            card.style.display = 'none';
        });
    }
});