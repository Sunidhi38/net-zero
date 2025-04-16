class VisualizationHandler {
    constructor() {
        this.charts = {};
        this.initializeCharts();
    }

    initializeCharts() {
        this.initializeRealTimeChart();
        this.initializeHistoricalChart();
        this.initializePredictionChart();
        this.initializeGauges();
    }

    initializeRealTimeChart() {
        const ctx = document.getElementById('realTimeChart').getContext('2d');
        this.charts.realTime = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Temperature (°C)',
                    data: [],
                    borderColor: '#2196f3',
                    tension: 0.4
                }, {
                    label: 'Humidity (%)',
                    data: [],
                    borderColor: '#4caf50',
                    tension: 0.4
                }, {
                    label: 'CO2 (ppm)',
                    data: [],
                    borderColor: '#f44336',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    zoom: {
                        zoom: {
                            wheel: { enabled: true },
                            pinch: { enabled: true },
                            mode: 'xy'
                        }
                    }
                }
            }
        });
    }

    initializeGauges() {
        // Create circular gauges for each metric
        const gaugeOptions = {
            angle: 0.15,
            lineWidth: 0.44,
            radiusScale: 1,
            pointer: {
                length: 0.6,
                strokeWidth: 0.035,
                color: '#000000'
            }
        };

        this.gauges = {
            temperature: new Gauge(document.getElementById('tempGauge')).setOptions(gaugeOptions),
            humidity: new Gauge(document.getElementById('humidityGauge')).setOptions(gaugeOptions),
            co2: new Gauge(document.getElementById('co2Gauge')).setOptions(gaugeOptions)
        };
    }

    updateVisualizations(data) {
        this.updateCharts(data);
        this.updateGauges(data);
        this.updateStats(data);
    }

    updateCharts(data) {
        // Update real-time chart
        const chart = this.charts.realTime;
        chart.data.labels.push(new Date().toLocaleTimeString());
        chart.data.datasets[0].data.push(data.temperature);
        chart.data.datasets[1].data.push(data.humidity);
        chart.data.datasets[2].data.push(data.co2);

        if (chart.data.labels.length > 20) {
            chart.data.labels.shift();
            chart.data.datasets.forEach(dataset => dataset.data.shift());
        }

        chart.update();
    }

    updateGauges(data) {
        this.gauges.temperature.set(data.temperature);
        this.gauges.humidity.set(data.humidity);
        this.gauges.co2.set(data.co2);
    }

    updateStats(data) {
        // Update statistical information
        const stats = this.calculateStats(data);
        document.getElementById('avgTemp').textContent = stats.avgTemp.toFixed(1);
        document.getElementById('maxCO2').textContent = stats.maxCO2.toFixed(0);
        document.getElementById('efficiency').textContent = stats.efficiency.toFixed(1) + '%';
    }

    calculateStats(data) {
        // Calculate various statistics from the data
        return {
            avgTemp: data.temperature,
            maxCO2: data.co2,
            efficiency: 95.5 // Example calculation
        };
    }
}

export const visualizationHandler = new VisualizationHandler(); 