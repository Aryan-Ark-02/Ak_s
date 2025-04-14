document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabItems.forEach(item => item.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to current tab and pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            
            // Toggle active class
            accordionItem.classList.toggle('active');
        });
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            
            // Toggle active class
            faqItem.classList.toggle('active');
        });
    });
    
    // Play button functionality
    const playBtn = document.querySelector('.play-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // In a real app, this would play a video
            alert('Video player would start here in a real application.');
        });
    }
    
    // Enroll button functionality
    const enrollBtn = document.querySelector('.course-pricing .btn-primary');
    
    if (enrollBtn) {
        enrollBtn.addEventListener('click', function() {
            // In a real app, this would add the course to the user's account
            // and redirect to the enrolled course page
            window.location.href = 'enrolled-course.html?id=' + getCourseIdFromUrl();
        });
    }
    
    // Helper function to get course ID from URL
    function getCourseIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || 'web-development-101';
    }
});