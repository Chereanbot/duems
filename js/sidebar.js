// Sidebar navigation handling
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Function to set active state
    function setActiveLink(clickedLink) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        clickedLink.classList.add('active');
        
        // Store the active page in sessionStorage
        const activePage = clickedLink.getAttribute('data-page');
        if (activePage) {
            sessionStorage.setItem('activePage', activePage);
        }
    }
    
    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle links that aren't the logout link
            if (!this.getAttribute('href').includes('login.html')) {
                setActiveLink(this);
            }
        });
    });
    
    // Check for stored active page on page load
    const storedActivePage = sessionStorage.getItem('activePage');
    if (storedActivePage) {
        const activeLink = document.querySelector(`[data-page="${storedActivePage}"]`);
        if (activeLink) {
            setActiveLink(activeLink);
        }
    }
    
    // Set active state based on current page URL
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage) {
        const currentLink = document.querySelector(`[href="${currentPage}"]`);
        if (currentLink) {
            setActiveLink(currentLink);
        } else {
            // If no exact match, try to find a link that contains the current page
            const partialMatch = Array.from(navLinks).find(link => 
                link.getAttribute('href') && currentPage.includes(link.getAttribute('href'))
            );
            if (partialMatch) {
                setActiveLink(partialMatch);
            }
        }
    }
    
    // Debug: Log active link for troubleshooting
    console.log('Active link:', document.querySelector('.nav-link.active'));
}); 