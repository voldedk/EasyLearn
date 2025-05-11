// This script ensures the sidebar is properly visible on all pages
document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing sidebar-fix.js");
    
    const sidebarToggle = document.querySelectorAll('.sidebar-toggle');
    const pageContainer = document.querySelector('.page-container');
    const sidebar = document.querySelector('.sidebar');
    
    console.log("Found sidebar toggle buttons:", sidebarToggle.length);
    
    // Initialize sidebar visibility - make sure it's visible on desktop by default
    function initSidebar() {
        if (window.innerWidth > 992) {
            // On desktop, ensure sidebar is visible
            pageContainer.classList.remove('sidebar-collapsed');
            console.log("Desktop mode: Sidebar visible");
        } else {
            // On mobile, sidebar should be collapsed by default
            pageContainer.classList.add('sidebar-collapsed');
            console.log("Mobile mode: Sidebar collapsed");
        }
        
        // Restore sidebar scroll position from localStorage
        restoreSidebarScroll();
    }
    
    // Function to restore sidebar scroll position
    function restoreSidebarScroll() {
        if (sidebar) {
            const savedScrollPosition = localStorage.getItem('sidebarScrollPosition');
            if (savedScrollPosition) {
                sidebar.scrollTop = parseInt(savedScrollPosition);
                console.log("Restored sidebar scroll position:", savedScrollPosition);
            }
        }
    }
    
    // Initialize sidebar
    initSidebar();
    
    // Add event listeners to all sidebar toggle buttons
    sidebarToggle.forEach(button => {
        button.addEventListener('click', function() {
            console.log("Sidebar toggle clicked");
            
            // Save scroll position before toggling
            if (sidebar) {
                localStorage.setItem('sidebarScrollPosition', sidebar.scrollTop);
            }
            
            pageContainer.classList.toggle('sidebar-collapsed');
            console.log("Sidebar collapsed:", pageContainer.classList.contains('sidebar-collapsed'));
            
            // Restore scroll position after toggling
            setTimeout(restoreSidebarScroll, 50);
        });
    });
    
    // Also handle window resize events
    window.addEventListener('resize', function() {
        console.log("Window resized, reinitializing sidebar");
        
        // Save scroll position before resize logic
        if (sidebar) {
            localStorage.setItem('sidebarScrollPosition', sidebar.scrollTop);
        }
        
        initSidebar();
    });
}); 