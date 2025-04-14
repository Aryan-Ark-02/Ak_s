document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const age = document.getElementById('age').value.trim();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            // Validate form
            let isValid = true;
            
            if (firstName.length < 2) {
                document.getElementById('firstName-error').textContent = 'First name must be at least 2 characters';
                isValid = false;
            }
            
            if (lastName.length < 2) {
                document.getElementById('lastName-error').textContent = 'Last name must be at least 2 characters';
                isValid = false;
            }
            
            const ageNum = parseInt(age);
            if (isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
                document.getElementById('age-error').textContent = 'Age must be between 18 and 120';
                isValid = false;
            }
            
            if (username.length < 4) {
                document.getElementById('username-error').textContent = 'Username must be at least 4 characters';
                isValid = false;
            }
            
            if (password.length < 8) {
                document.getElementById('password-error').textContent = 'Password must be at least 8 characters';
                isValid = false;
            }
            
            if (password !== confirmPassword) {
                document.getElementById('confirmPassword-error').textContent = 'Passwords do not match';
                isValid = false;
            }
            
            if (isValid) {
                // In a real app, this would send the data to the server
                console.log('Form submitted:', {
                    firstName,
                    lastName,
                    age,
                    username,
                    password
                });
                
                // Show success message
                window.showToast('Success!', 'Account created successfully.', 'success');
                
                // Reset form
                signupForm.reset();
            }
        });
    }
});