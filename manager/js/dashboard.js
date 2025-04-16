document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'bi bi-moon' : 'bi bi-sun';
    }

    // Mobile Sidebar Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const sidebar = document.querySelector('.sidebar');

    mobileToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });

    // Role-based Navigation
    function showNavigation(role) {
        // Hide all navigation sections
        document.querySelectorAll('.nav-section').forEach(section => {
            section.style.display = 'none';
        });

        // Show relevant sections based on role
        document.getElementById('employeeNav').style.display = 'block';
        
        if (role === 'coordinator' || role === 'manager' || role === 'admin') {
            document.getElementById('coordinatorNav').style.display = 'block';
        }
        
        if (role === 'manager' || role === 'admin') {
            document.getElementById('managerNav').style.display = 'block';
        }
        
        if (role === 'admin') {
            document.getElementById('adminNav').style.display = 'block';
        }

        // Update role display
        document.getElementById('userRole').textContent = role.charAt(0).toUpperCase() + role.slice(1);
    }

    // Simulate role assignment (replace with actual role check)
    const userRole = 'employee'; // Can be 'employee', 'coordinator', 'manager', or 'admin'
    showNavigation(userRole);

    // Handle Navigation Active States
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Notifications Dropdown (prevent close on click inside)
    const notificationDropdown = document.querySelector('.dropdown-menu');
    notificationDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}); 