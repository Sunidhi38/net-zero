# NetZero Sustainability Monitoring System

A real-time monitoring system for tracking sustainability metrics using ESP32 sensors, Firebase, and AI-powered predictions.

## Features

- Real-time sensor data collection using ESP32
- Firebase integration for data storage
- LSTM model for predicting future values
- Interactive dashboard with live updates
- Monitoring of temperature, humidity, pressure, CO2, and light levels

## Hardware Requirements

- ESP32 development board
- DHT22 temperature and humidity sensor
- BMP280 pressure sensor
- CO2 sensor (analog)
- Light sensor (analog)
- Jumper wires and breadboard

## Software Requirements

- Python 3.8+
- Arduino IDE with ESP32 board support
- Firebase account and project
- Required Python packages (listed in requirements.txt)

## Setup Instructions

1. **ESP32 Setup**
   - Install the required libraries in Arduino IDE:
     - Firebase ESP32 Client
     - DHT sensor library
     - Adafruit BMP280 Library
   - Update WiFi credentials and Firebase configuration in `esp32_sensor.ino`
   - Upload the code to your ESP32

2. **Firebase Setup**
   - Create a new Firebase project
   - Enable Realtime Database
   - Download your service account key and update the path in `dashboard.py`
   - Update the database URL in `dashboard.py`

3. **Python Environment Setup**
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate

   # Install dependencies
   pip install -r requirements.txt
   ```

4. **Running the Dashboard**
   ```bash
   python dashboard.py
   ```
   The dashboard will be available at `http://localhost:8050`

## Project Structure

- `esp32_sensor.ino`: ESP32 code for sensor data collection
- `model.py`: LSTM model for predictions
- `dashboard.py`: Dash application for visualization
- `requirements.txt`: Python dependencies

## Usage

1. Power up your ESP32 with connected sensors
2. The ESP32 will automatically connect to WiFi and start sending data to Firebase
3. Run the dashboard application
4. View real-time data and predictions in the dashboard

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details. 