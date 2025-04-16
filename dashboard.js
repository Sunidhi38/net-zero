import { realTimeData, authStateObserver } from './firebase-service.js';

class Dashboard {
    constructor() {
        this.charts = {};
        this.currentUser = null;
        this.initializeDashboard();
    }

    initializeDashboard() {
        // Initialize authentication observer
        authStateObserver((user) => {
            if (user) {
                this.currentUser = user;
                this.showDashboard();
                this.initializeRealTimeData();
            } else {
                this.currentUser = null;
                this.hideDashboard();
            }
        });

        // Initialize charts
        this.initializeCharts();
    }

    initializeRealTimeData() {
        realTimeData.subscribeSensorData((data) => {
            if (data) {
                this.updateDashboard(data);
            }
        });
    }

    updateDashboard(data) {
        // Update sensor values
        this.updateSensorValues(data);
        // Update charts
        this.updateCharts(data);
        // Save to local storage for offline support
        localStorage.setItem('lastSensorData', JSON.stringify(data));
    }

    updateSensorValues(data) {
        const elements = {
            temperature: document.querySelector('.temperature .value'),
            humidity: document.querySelector('.humidity .value'),
            co2: document.querySelector('.co2 .value')
        };

        if (elements.temperature) elements.temperature.textContent = `${data.temperature}°C`;
        if (elements.humidity) elements.humidity.textContent = `${data.humidity}%`;
        if (elements.co2) elements.co2.textContent = `${data.co2} ppm`;
    }

    initializeCharts() {
        // Initialize real-time chart
        const ctx = document.getElementById('realTimeChart');
        if (ctx) {
            this.charts.realTime = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: [],
                        borderColor: '#2196f3'
                    }, {
                        label: 'Humidity (%)',
                        data: [],
                        borderColor: '#4caf50'
                    }, {
                        label: 'CO2 (ppm)',
                        data: [],
                        borderColor: '#f44336'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }

    updateCharts(data) {
        if (this.charts.realTime) {
            const chart = this.charts.realTime;
            const now = new Date().toLocaleTimeString();

            chart.data.labels.push(now);
            chart.data.datasets[0].data.push(data.temperature);
            chart.data.datasets[1].data.push(data.humidity);
            chart.data.datasets[2].data.push(data.co2);

            // Keep only last 10 data points
            if (chart.data.labels.length > 10) {
                chart.data.labels.shift();
                chart.data.datasets.forEach(dataset => dataset.data.shift());
            }

            chart.update();
        }
    }

    showDashboard() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        this.updateUserInfo();
    }

    hideDashboard() {
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    }

    updateUserInfo() {
        const userElement = document.getElementById('userInfo');
        if (userElement && this.currentUser) {
            userElement.textContent = `Welcome, ${this.currentUser.email}`;
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});

function goToHome() {
    window.location.href = 'index.html';
}

// Add event listener for the back to home button
document.addEventListener('DOMContentLoaded', function() {
    const backHomeButton = document.querySelector('.back-home');
    if (backHomeButton) {
        backHomeButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            goToHome(); // Call the function to navigate home
        });
    }
}); 