document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            // Validate form
            let isValid = true;
            
            if (username === '') {
                document.getElementById('username-error').textContent = 'Username is required';
                isValid = false;
            }
            
            if (password === '') {
                document.getElementById('password-error').textContent = 'Password is required';
                isValid = false;
            }
            
            if (isValid) {
                // In a real app, this would send the data to the server for authentication
                console.log('Form submitted:', {
                    username,
                    password,
                    rememberMe
                });
                
                // Show success message
                window.showToast('Success!', 'Login successful!', 'success');
                
                // In a real app, this would redirect to the dashboard or home page
                setTimeout(function() {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }
});