// Sidebar content as a JavaScript string
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing sidebar - Starting to load sidebar content");
    
    // Check if we're on the index page
    const isIndexPage = (window.location.pathname.endsWith('index.html') || 
                         window.location.pathname.endsWith('/') ||
                         window.location.pathname.split('/').pop() === '');
    
    console.log("IsIndexPage:", isIndexPage);
    
    // Define the sidebar HTML content - with different links for index.html
    let sidebarHTML = '';
    
    if (isIndexPage) {
        // Index page sidebar with data-section attributes
        sidebarHTML = `
        <div class="sidebar-content">
            <div class="home-button">
                <a href="#home" data-section="home" class="home-link">
                    <i class="fas fa-home"></i> Home
                </a>
            </div>
            
            <h3>Courses & Practice</h3>
            <ul>
                <li><a href="#beginner-course" data-section="beginner-course"><i class="fas fa-code"></i> Beginner C# Course</a></li>
            </ul>
            
            <h3>Getting Started</h3>
            <ul>
                <li><a href="#intro" data-section="intro">Introduction to C#</a></li>
                <li><a href="#environment" data-section="environment">Setting Up Environment</a></li>
                <li><a href="#syntax" data-section="syntax">C# Syntax</a></li>
                <li><a href="#output" data-section="output">C# Output</a></li>
                <li><a href="terminology.html">C# Terminology</a></li>
            </ul>

            <h3>Basic C#</h3>
            <ul>
                <li><a href="#variables" data-section="variables">Variables</a></li>
                <li><a href="#data-types" data-section="data-types">Data Types</a></li>
                <li><a href="type-casting.html">Type Casting</a></li>
                <li><a href="operators.html">Operators</a></li>
                <li><a href="math.html">Math Functions</a></li>
                <li><a href="#strings" data-section="strings">Strings</a></li>
                <li><a href="#booleans" data-section="booleans">Booleans</a></li>
                <li><a href="#if-else" data-section="if-else">If...Else</a></li>
                <li><a href="#switch" data-section="switch">Switch Statements</a></li>
                <li><a href="#loops" data-section="loops">Loops</a></li>
                <li><a href="#arrays" data-section="arrays">Arrays</a></li>
            </ul>

            <h3>Methods</h3>
            <ul>
                <li><a href="#methods-intro" data-section="methods-intro">Methods Overview</a></li>
                <li><a href="#method-parameters" data-section="method-parameters">Method Parameters</a></li>
                <li><a href="#method-overloading" data-section="method-overloading">Method Overloading</a></li>
            </ul>

            <h3>Classes & OOP</h3>
            <ul>
                <li><a href="#oop-intro" data-section="oop-intro">OOP Concepts</a></li>
                <li><a href="#classes" data-section="classes">Classes & Objects</a></li>
                <li><a href="#constructors" data-section="constructors">Constructors</a></li>
                <li><a href="#properties" data-section="properties">Properties</a></li>
                <li><a href="#inheritance" data-section="inheritance">Inheritance</a></li>
                <li><a href="#polymorphism" data-section="polymorphism">Polymorphism</a></li>
                <li><a href="#interfaces" data-section="interfaces">Interfaces</a></li>
                <li><a href="#abstraction" data-section="abstraction">Abstraction</a></li>
                <li><a href="#enums" data-section="enums">Enums</a></li>
            </ul>

            <h3>Unity Game Development C#</h3>
            <ul>
                <li><a href="#unity-intro" data-section="unity-intro"><i class="fas fa-gamepad"></i> Unity Introduction</a></li>
                <li><a href="#unity-setup" data-section="unity-setup"><i class="fas fa-cogs"></i> Setting Up Unity</a></li>
                <li><a href="csharp-scripting-unity.html" data-section="unity-scripting"><i class="fas fa-file-code"></i> C# Scripting in Unity</a></li>
                <li><a href="working-with-gameobjects.html" data-section="unity-gameobjects"><i class="fas fa-cube"></i> Working with GameObjects</a></li>
                <li><a href="unity-component-system.html" data-section="unity-components"><i class="fas fa-puzzle-piece"></i> Unity Component System</a></li>
                <li><a href="#unity-movement" data-section="unity-movement"><i class="fas fa-running"></i> Character Movement</a></li>
                <li><a href="jump-mechanics.html" data-section="unity-jump"><i class="fas fa-arrow-up"></i> Jump Mechanics</a></li>
                <li><a href="#unity-input" data-section="unity-input"><i class="fas fa-keyboard"></i> Input Systems</a></li>
                <li><a href="#unity-collision" data-section="unity-collision"><i class="fas fa-car-crash"></i> Collisions & Triggers</a></li>
                <li><a href="#unity-animations" data-section="unity-animations"><i class="fas fa-film"></i> Animation Systems</a></li>
                <li><a href="#unity-physics" data-section="unity-physics"><i class="fas fa-atom"></i> Unity Physics</a></li>
                <li><a href="#unity-ui" data-section="unity-ui"><i class="fas fa-desktop"></i> Unity UI Development</a></li>
                <li><a href="#unity-audio" data-section="unity-audio"><i class="fas fa-volume-up"></i> Unity Audio</a></li>
                <li><a href="#unity-networking" data-section="unity-networking"><i class="fas fa-network-wired"></i> Multiplayer & Networking</a></li>
                <li><a href="#unity-ai" data-section="unity-ai"><i class="fas fa-robot"></i> Enemy AI & Behavior</a></li>
                <li><a href="#unity-saving" data-section="unity-saving"><i class="fas fa-save"></i> Save Systems</a></li>
                <li><a href="#unity-optimization" data-section="unity-optimization"><i class="fas fa-tachometer-alt"></i> Game Optimization</a></li>
                <li><a href="#unity-publishing" data-section="unity-publishing"><i class="fas fa-upload"></i> Publishing Your Game</a></li>
            </ul>

            <h3>Unity Game Types</h3>
            <ul>
                <li><a href="#unity-2d-platformer" data-section="unity-2d-platformer"><i class="fas fa-street-view"></i> 2D Platformer Development</a></li>
                <li><a href="#unity-fps" data-section="unity-fps"><i class="fas fa-crosshairs"></i> FPS Game Development</a></li>
                <li><a href="#unity-rpg" data-section="unity-rpg"><i class="fas fa-dungeon"></i> RPG Systems</a></li>
                <li><a href="#unity-mobile" data-section="unity-mobile"><i class="fas fa-mobile-alt"></i> Mobile Game Development</a></li>
                <li><a href="#unity-vr" data-section="unity-vr"><i class="fas fa-vr-cardboard"></i> VR/AR Development</a></li>
            </ul>
            
            <h3>Unity Advanced Features</h3>
            <ul>
                <li><a href="#unity-shaders" data-section="unity-shaders"><i class="fas fa-paint-brush"></i> Shader Programming</a></li>
                <li><a href="#unity-scriptable-objects" data-section="unity-scriptable-objects"><i class="fas fa-database"></i> Scriptable Objects</a></li>
                <li><a href="#unity-procedural" data-section="unity-procedural"><i class="fas fa-project-diagram"></i> Procedural Generation</a></li>
                <li><a href="#unity-asset-management" data-section="unity-asset-management"><i class="fas fa-boxes"></i> Asset Management</a></li>
                <li><a href="#unity-cameras" data-section="unity-cameras"><i class="fas fa-video"></i> Camera Systems</a></li>
                <li><a href="#unity-custom-editor" data-section="unity-custom-editor"><i class="fas fa-tools"></i> Custom Inspector Development</a></li>
            </ul>
            
            <h3>Unity Game Systems</h3>
            <ul>
                <li><a href="#unity-inventory" data-section="unity-inventory"><i class="fas fa-box-open"></i> Inventory Systems</a></li>
                <li><a href="#unity-dialogue" data-section="unity-dialogue"><i class="fas fa-comments"></i> Dialogue Systems</a></li>
                <li><a href="#unity-quests" data-section="unity-quests"><i class="fas fa-scroll"></i> Quest Systems</a></li>
                <li><a href="#unity-weapons" data-section="unity-weapons"><i class="fas fa-sword"></i> Weapon Systems</a></li>
                <li><a href="#unity-level-design" data-section="unity-level-design"><i class="fas fa-map"></i> Level Design Principles</a></li>
                <li><a href="#unity-character-customization" data-section="unity-character-customization"><i class="fas fa-user-edit"></i> Character Customization</a></li>
                <li><a href="#unity-monetization" data-section="unity-monetization"><i class="fas fa-coins"></i> Game Monetization</a></li>
                <li><a href="#unity-analytics" data-section="unity-analytics"><i class="fas fa-chart-line"></i> Analytics Implementation</a></li>
                <li><a href="#unity-particles" data-section="unity-particles"><i class="fas fa-fire"></i> Particle Systems</a></li>
                <li><a href="#unity-cinemachine" data-section="unity-cinemachine"><i class="fas fa-film"></i> Cinemachine</a></li>
                <li><a href="#unity-timeline" data-section="unity-timeline"><i class="fas fa-clock"></i> Timeline & Cutscenes</a></li>
                <li><a href="#unity-navmesh" data-section="unity-navmesh"><i class="fas fa-route"></i> Navigation & Pathfinding</a></li>
            </ul>

            <h3>Advanced C#</h3>
            <ul>
                <li><a href="csharp-linq.html">LINQ</a></li>
                <li><a href="csharp-async.html">Asynchronous Programming</a></li>
                <li><a href="csharp-file-handling.html">File Handling</a></li>
                <li><a href="csharp-exception-handling.html">Exception Handling</a></li>
                <li><a href="csharp-collections.html">Collections</a></li>
                <li><a href="csharp-generics.html">Generics</a></li>
                <li><a href="csharp-events-delegates.html">Events & Delegates</a></li>
            </ul>
        </div>
        `;
    } else {
        // Regular page sidebar with direct links
        sidebarHTML = `
        <div class="sidebar-content">
            <div class="home-button">
                <a href="index.html" class="home-link">
                    <i class="fas fa-home"></i> Home
                </a>
            </div>
            
            <h3>Courses & Practice</h3>
            <ul>
                <li><a href="beginner-course.html"><i class="fas fa-code"></i> Beginner C# Course</a></li>
            </ul>
            
            <h3>Getting Started</h3>
            <ul>
                <li><a href="intro.html">Introduction to C#</a></li>
                <li><a href="environment.html">Setting Up Environment</a></li>
                <li><a href="syntax.html">C# Syntax</a></li>
                <li><a href="output.html">C# Output</a></li>
                <li><a href="terminology.html">C# Terminology</a></li>
            </ul>

            <h3>Basic C#</h3>
            <ul>
                <li><a href="variables.html">Variables</a></li>
                <li><a href="data-types.html">Data Types</a></li>
                <li><a href="type-casting.html">Type Casting</a></li>
                <li><a href="operators.html">Operators</a></li>
                <li><a href="math.html">Math Functions</a></li>
                <li><a href="strings.html">Strings</a></li>
                <li><a href="booleans.html">Booleans</a></li>
                <li><a href="if-else.html">If...Else</a></li>
                <li><a href="switch.html">Switch Statements</a></li>
                <li><a href="loops.html">Loops</a></li>
                <li><a href="arrays.html">Arrays</a></li>
            </ul>

            <h3>Methods</h3>
            <ul>
                <li><a href="methods-intro.html">Methods Overview</a></li>
                <li><a href="method-parameters.html">Method Parameters</a></li>
                <li><a href="method-overloading.html">Method Overloading</a></li>
            </ul>

            <h3>Classes & OOP</h3>
            <ul>
                <li><a href="oop-concepts.html">OOP Concepts</a></li>
                <li><a href="classes-objects.html">Classes & Objects</a></li>
                <li><a href="constructors.html">Constructors</a></li>
                <li><a href="properties.html">Properties</a></li>
                <li><a href="inheritance.html">Inheritance</a></li>
                <li><a href="polymorphism.html">Polymorphism</a></li>
                <li><a href="interfaces.html">Interfaces</a></li>
                <li><a href="abstraction.html">Abstraction</a></li>
                <li><a href="enums.html">Enums</a></li>
            </ul>

            <h3>Unity Game Development C#</h3>
            <ul>
                <li><a href="unity-intro.html"><i class="fas fa-gamepad"></i> Unity Introduction</a></li>
                <li><a href="unity-setup.html"><i class="fas fa-cogs"></i> Setting Up Unity</a></li>
                <li><a href="csharp-scripting-unity.html"><i class="fas fa-file-code"></i> C# Scripting in Unity</a></li>
                <li><a href="working-with-gameobjects.html"><i class="fas fa-cube"></i> Working with GameObjects</a></li>
                <li><a href="unity-component-system.html"><i class="fas fa-puzzle-piece"></i> Unity Component System</a></li>
                <li><a href="unity-movement.html"><i class="fas fa-running"></i> Character Movement</a></li>
                <li><a href="jump-mechanics.html"><i class="fas fa-arrow-up"></i> Jump Mechanics</a></li>
                <li><a href="unity-input.html"><i class="fas fa-keyboard"></i> Input Systems</a></li>
                <li><a href="unity-collision.html"><i class="fas fa-car-crash"></i> Collisions & Triggers</a></li>
                <li><a href="unity-animations.html"><i class="fas fa-film"></i> Animation Systems</a></li>
                <li><a href="unity-physics.html"><i class="fas fa-atom"></i> Unity Physics</a></li>
                <li><a href="unity-ui.html"><i class="fas fa-desktop"></i> Unity UI Development</a></li>
                <li><a href="unity-audio.html"><i class="fas fa-volume-up"></i> Unity Audio</a></li>
                <li><a href="unity-networking.html"><i class="fas fa-network-wired"></i> Multiplayer & Networking</a></li>
                <li><a href="unity-ai.html"><i class="fas fa-robot"></i> Enemy AI & Behavior</a></li>
                <li><a href="unity-saving.html"><i class="fas fa-save"></i> Save Systems</a></li>
                <li><a href="unity-optimization.html"><i class="fas fa-tachometer-alt"></i> Game Optimization</a></li>
                <li><a href="unity-publishing.html"><i class="fas fa-upload"></i> Publishing Your Game</a></li>
            </ul>

            <h3>Unity Game Types</h3>
            <ul>
                <li><a href="unity-2d-platformer.html"><i class="fas fa-street-view"></i> 2D Platformer Development</a></li>
                <li><a href="unity-fps.html"><i class="fas fa-crosshairs"></i> FPS Game Development</a></li>
                <li><a href="unity-rpg.html"><i class="fas fa-dungeon"></i> RPG Systems</a></li>
                <li><a href="unity-mobile.html"><i class="fas fa-mobile-alt"></i> Mobile Game Development</a></li>
                <li><a href="unity-vr.html"><i class="fas fa-vr-cardboard"></i> VR/AR Development</a></li>
            </ul>
            
            <h3>Unity Advanced Features</h3>
            <ul>
                <li><a href="unity-shaders.html"><i class="fas fa-paint-brush"></i> Shader Programming</a></li>
                <li><a href="unity-scriptable-objects.html"><i class="fas fa-database"></i> Scriptable Objects</a></li>
                <li><a href="unity-procedural.html"><i class="fas fa-project-diagram"></i> Procedural Generation</a></li>
                <li><a href="unity-asset-management.html"><i class="fas fa-boxes"></i> Asset Management</a></li>
                <li><a href="unity-cameras.html"><i class="fas fa-video"></i> Camera Systems</a></li>
                <li><a href="unity-custom-editor.html"><i class="fas fa-tools"></i> Custom Inspector Development</a></li>
            </ul>
            
            <h3>Unity Game Systems</h3>
            <ul>
                <li><a href="unity-inventory.html"><i class="fas fa-box-open"></i> Inventory Systems</a></li>
                <li><a href="unity-dialogue.html"><i class="fas fa-comments"></i> Dialogue Systems</a></li>
                <li><a href="unity-quests.html"><i class="fas fa-scroll"></i> Quest Systems</a></li>
                <li><a href="unity-weapons.html"><i class="fas fa-sword"></i> Weapon Systems</a></li>
                <li><a href="unity-level-design.html"><i class="fas fa-map"></i> Level Design Principles</a></li>
                <li><a href="unity-character-customization.html"><i class="fas fa-user-edit"></i> Character Customization</a></li>
                <li><a href="unity-monetization.html"><i class="fas fa-coins"></i> Game Monetization</a></li>
                <li><a href="unity-analytics.html"><i class="fas fa-chart-line"></i> Analytics Implementation</a></li>
                <li><a href="unity-particles.html"><i class="fas fa-fire"></i> Particle Systems</a></li>
                <li><a href="unity-cinemachine.html"><i class="fas fa-film"></i> Cinemachine</a></li>
                <li><a href="unity-timeline.html"><i class="fas fa-clock"></i> Timeline & Cutscenes</a></li>
                <li><a href="unity-navmesh.html"><i class="fas fa-route"></i> Navigation & Pathfinding</a></li>
            </ul>

            <h3>Advanced C#</h3>
            <ul>
                <li><a href="csharp-linq.html">LINQ</a></li>
                <li><a href="csharp-async.html">Asynchronous Programming</a></li>
                <li><a href="csharp-file-handling.html">File Handling</a></li>
                <li><a href="csharp-exception-handling.html">Exception Handling</a></li>
                <li><a href="csharp-collections.html">Collections</a></li>
                <li><a href="csharp-generics.html">Generics</a></li>
                <li><a href="csharp-events-delegates.html">Events & Delegates</a></li>
            </ul>
        </div>
        `;
    }

    // Find the sidebar container
    const sidebarContainer = document.querySelector('.sidebar');
    
    if (sidebarContainer) {
        console.log("Found sidebar container, inserting HTML");
        
        // Store current scroll position before updating content
        let sidebarScrollPosition = 0;
        if (sidebarContainer.scrollTop) {
            sidebarScrollPosition = sidebarContainer.scrollTop;
        }
        
        // Insert the sidebar HTML
        sidebarContainer.innerHTML = sidebarHTML;
        
        // Call markCurrentPageActive only on non-index pages
        if (!isIndexPage) {
            markCurrentPageActive();
        }
        
        // Restore sidebar scroll position
        sidebarContainer.scrollTop = sidebarScrollPosition;
        
        // Add event listeners to preserve scroll position
        const sidebarLinks = sidebarContainer.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Store sidebar scroll position before navigation
                localStorage.setItem('sidebarScrollPosition', sidebarContainer.scrollTop);
            });
        });
        
        // Restore saved scroll position if available
        const savedScrollPosition = localStorage.getItem('sidebarScrollPosition');
        if (savedScrollPosition) {
            sidebarContainer.scrollTop = parseInt(savedScrollPosition);
        }
        
        // Dispatch an event to signal the sidebar is loaded
        const sidebarLoadedEvent = new Event('sidebar-loaded');
        document.dispatchEvent(sidebarLoadedEvent);
        console.log("Sidebar loaded and event dispatched");
    } else {
        console.error("Error: Sidebar container not found in the document!");
    }
    
    // Function to mark the current page as active in the sidebar
    function markCurrentPageActive() {
        // Get the current page's filename
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Find the corresponding link in the sidebar
        const sidebarLinks = document.querySelectorAll('.sidebar a');
        
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (isIndexPage) {
                // For index page, try to get the active section from URL hash
                const activeSection = window.location.hash.replace('#', '') || 'home';
                const linkSection = link.getAttribute('data-section');
                
                if (linkSection === activeSection) {
                    link.classList.add('active');
                    link.parentElement.classList.add('active-item');
                }
            } else {
                // For other pages, match against the current filename
                if (href === currentPage) {
                    link.classList.add('active');
                    link.parentElement.classList.add('active-item');
                }
            }
        });
    }
}); 