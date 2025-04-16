document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and content
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Function to handle tab switching
    function showTab(tabId) {
        // Get all tab buttons and content panes
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');

        // Remove active class from all buttons and panes
        tabButtons.forEach(button => button.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to selected button and pane
        const selectedButton = document.querySelector(`.tab-btn[onclick="showTab('${tabId}')"]`);
        const selectedPane = document.getElementById(tabId);

        if (selectedButton && selectedPane) {
            selectedButton.classList.add('active');
            
            // Add fade-out class to current active pane
            const currentActive = document.querySelector('.tab-pane.active');
            if (currentActive) {
                currentActive.style.opacity = '0';
            }

            // Show new pane with animation
            setTimeout(() => {
                selectedPane.classList.add('active');
                selectedPane.style.opacity = '1';
            }, 300);
        }
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Add loading state
            button.classList.add('loading');
            
            // Switch tab with slight delay for animation
            setTimeout(() => {
                showTab(tabId);
                button.classList.remove('loading');
            }, 200);
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });

        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });

    // Initialize the first tab when the page loads
    showTab('vision');

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add animation class to form fields when focused
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.closest('.input-with-icon').classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.closest('.input-with-icon').classList.remove('focused');
                }
            });
        });

        // Form submission handling
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state to submit button
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="material-icons">hourglass_empty</i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with your actual form submission logic)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="material-icons">check_circle</i> Message Sent!';
                submitBtn.style.backgroundColor = '#4CAF50';
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = '<i class="material-icons">send</i> Send Message';
                    submitBtn.style.backgroundColor = '#2196F3';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.highlight-item, .approach-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// Add loading animation to buttons
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
}); 