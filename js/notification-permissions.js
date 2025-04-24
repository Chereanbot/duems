/**
 * Notification Permissions Handler
 * Manages browser notification permissions across all devices
 */
class NotificationPermissions {
    constructor() {
        this.permissionStatus = null;
        this.notificationCheckbox = document.getElementById('notificationPermission');
        this.init();
    }

    init() {
        // Check if browser supports notifications
        if (!('Notification' in window)) {
            console.log('This browser does not support desktop notifications');
            if (this.notificationCheckbox) {
                this.notificationCheckbox.disabled = true;
                this.notificationCheckbox.parentElement.classList.add('text-muted');
            }
            return;
        }

        // Check current permission status
        this.checkPermissionStatus();

        // Add event listener to checkbox if it exists
        if (this.notificationCheckbox) {
            this.notificationCheckbox.addEventListener('change', () => this.handleCheckboxChange());
        }
    }

    checkPermissionStatus() {
        // Get current permission status
        this.permissionStatus = Notification.permission;
        
        // Update UI based on current status
        this.updateUI();
        
        return this.permissionStatus;
    }

    updateUI() {
        if (!this.notificationCheckbox) return;
        
        // Update checkbox based on permission status
        switch (this.permissionStatus) {
            case 'granted':
                this.notificationCheckbox.checked = true;
                this.notificationCheckbox.disabled = false;
                break;
            case 'denied':
                this.notificationCheckbox.checked = false;
                this.notificationCheckbox.disabled = true;
                this.notificationCheckbox.parentElement.classList.add('text-muted');
                break;
            case 'default':
                this.notificationCheckbox.checked = false;
                this.notificationCheckbox.disabled = false;
                break;
        }
    }

    async requestPermission() {
        if (!('Notification' in window)) {
            return 'unsupported';
        }

        try {
            // Request permission
            const permission = await Notification.requestPermission();
            this.permissionStatus = permission;
            
            // Update UI
            this.updateUI();
            
            // Show appropriate toast message
            if (permission === 'granted') {
                this.showToast('Notifications enabled successfully!', 'success');
                this.sendTestNotification();
            } else if (permission === 'denied') {
                this.showToast('Notifications have been disabled. You can enable them in your browser settings.', 'warning');
            }
            
            return permission;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return 'error';
        }
    }

    handleCheckboxChange() {
        if (this.notificationCheckbox.checked) {
            // User wants to enable notifications
            this.requestPermission();
        } else {
            // User wants to disable notifications
            if (this.permissionStatus === 'granted') {
                this.showToast('Notifications have been disabled. You can enable them again in your browser settings.', 'info');
            }
        }
    }

    sendTestNotification() {
        if (this.permissionStatus === 'granted') {
            const notification = new Notification('Dilla University EMS', {
                body: 'Thank you for enabling notifications! You will now receive important updates.',
                icon: 'assets/images/du-logo.png'
            });
            
            notification.onclick = function() {
                window.focus();
                this.close();
            };
        }
    }

    showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        // Create toast element
        const toastId = 'toast-' + Date.now();
        const toastHtml = `
            <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header bg-${type} text-white">
                    <i class="bi bi-bell me-2"></i>
                    <strong class="me-auto">Notifications</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        `;
        
        toastContainer.insertAdjacentHTML('beforeend', toastHtml);
        
        // Initialize and show the toast
        const toastElement = document.getElementById(toastId);
        const toast = new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 5000
        });
        toast.show();
        
        // Remove toast after it's hidden
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
            if (toastContainer.children.length === 0) {
                toastContainer.remove();
            }
        });
    }
}

// Initialize notification permissions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.notificationPermissions = new NotificationPermissions();
}); 