document.addEventListener('DOMContentLoaded', function() {
    // Handle menu item clicks
    const menuItems = document.querySelectorAll('.menu-item');
    const sections = document.querySelectorAll('.settings-section');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items and sections
            menuItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked item and corresponding section
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Handle profile picture upload
    const profilePic = document.getElementById('profilePic');
    const uploadBtn = document.querySelector('.upload-btn');

    if (uploadBtn && profilePic) {
        uploadBtn.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        profilePic.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
    }

    // Handle form submissions
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Show success message
            alert('Profile updated successfully!');
        });
    }

    // Handle device actions
    const addDeviceBtn = document.querySelector('.add-device-btn');
    if (addDeviceBtn) {
        addDeviceBtn.addEventListener('click', function() {
            // Add device logic
            alert('Add device functionality will be implemented here');
        });
    }

    // Handle edit and delete device buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Edit device logic
            alert('Edit device functionality will be implemented here');
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this device?')) {
                // Delete device logic
                alert('Device deleted successfully');
            }
        });
    });

    // Handle theme toggle
    const themeToggle = document.querySelector('input[type="checkbox"]');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
        });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    changeTheme(savedTheme);

    // Load saved font size
    const savedFontSize = localStorage.getItem('fontSize') || '16';
    updateFontSize(savedFontSize);

    // Add event listeners
    document.getElementById('fontSizeSlider').addEventListener('input', (e) => {
        updateFontSize(e.target.value);
    });

    // Theme buttons
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            changeTheme(btn.dataset.theme);
        });
    });
});

// Theme & Appearance
function changeTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function updateFontSize(size) {
    document.documentElement.style.fontSize = size + 'px';
    localStorage.setItem('fontSize', size);
}

// Data & Storage
function exportData(format) {
    // Simulate export
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);

    setTimeout(() => {
        document.body.removeChild(loading);
        alert(`Data exported in ${format.toUpperCase()} format`);
    }, 1500);
}

// Security
function setup2FA() {
    // Simulate 2FA setup
    const steps = [
        'Generating QR code...',
        'Scan the QR code with your authenticator app',
        'Enter the 6-digit code to verify'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            alert(steps[currentStep]);
            currentStep++;
        } else {
            clearInterval(interval);
            alert('2FA setup complete!');
        }
    }, 2000);
}

function endSession(sessionId) {
    if (confirm('Are you sure you want to end this session?')) {
        const sessionElement = document.querySelector(`[data-session="${sessionId}"]`);
        if (sessionElement) {
            sessionElement.remove();
        }
    }
}

// Integrations
function connectService(service) {
    const button = event.target;
    button.disabled = true;
    button.innerHTML = '<i class="material-icons">hourglass_empty</i> Connecting...';

    setTimeout(() => {
        button.innerHTML = '<i class="material-icons">check_circle</i> Connected';
        button.classList.add('connected');
    }, 2000);
}

// Support
function openSupportTicket() {
    const ticketForm = `
        <div class="ticket-form">
            <h3>Create Support Ticket</h3>
            <form id="supportTicketForm">
                <input type="text" placeholder="Subject" required>
                <textarea placeholder="Describe your issue" required></textarea>
                <button type="submit">Submit Ticket</button>
            </form>
        </div>
    `;

    // Show form in modal
    showModal(ticketForm);
}

function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
} 