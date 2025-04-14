// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Toast notification function
    window.showToast = function(title, message, type = 'success') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        const toastIcon = toast.querySelector('.toast-icon');
        const toastTitle = toast.querySelector('.toast-title');
        const toastDescription = toast.querySelector('.toast-description');
        
        // Set icon based on type
        if (toastIcon) {
            toastIcon.className = 'toast-icon fas';
            if (type === 'success') {
                toastIcon.classList.add('fa-check-circle');
                toastIcon.style.color = 'var(--success-color)';
            } else if (type === 'error') {
                toastIcon.classList.add('fa-exclamation-circle');
                toastIcon.style.color = 'var(--danger-color)';
            } else if (type === 'warning') {
                toastIcon.classList.add('fa-exclamation-triangle');
                toastIcon.style.color = 'var(--warning-color)';
            } else if (type === 'info') {
                toastIcon.classList.add('fa-info-circle');
                toastIcon.style.color = 'var(--info-color)';
            }
        }
        
        // Set title and message
        if (toastTitle) toastTitle.textContent = title;
        if (toastDescription) toastDescription.textContent = message;
        
        // Show toast
        toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
    };
});