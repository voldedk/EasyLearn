// Redirect script for Advanced C# URLs
document.addEventListener('DOMContentLoaded', function() {
    // Map of old URLs to new URLs
    const redirectMap = {
        '/linq.html': '/csharp-linq.html',
        '/async.html': '/csharp-async.html',
        '/file-handling.html': '/csharp-file-handling.html',
        '/exceptions.html': '/csharp-exception-handling.html',
        '/collections.html': '/csharp-collections.html',
        '/generics.html': '/csharp-generics.html',
        '/events.html': '/csharp-events-delegates.html'
    };

    // Get current path
    const currentPath = window.location.pathname;
    
    // Check if current path needs redirection
    if (redirectMap[currentPath]) {
        window.location.href = redirectMap[currentPath];
    }
}); 