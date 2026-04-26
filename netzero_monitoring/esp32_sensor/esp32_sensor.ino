#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>
#include <Wire.h>
#include <Adafruit_BMP280.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Firebase configuration
const char* FIREBASE_HOST = "YOUR_FIREBASE_HOST";
const char* FIREBASE_AUTH = "YOUR_FIREBASE_AUTH";

// Sensor pins
#define DHTPIN 4
#define DHTTYPE DHT22
#define CO2_PIN 34
#define LIGHT_PIN 35

// Initialize sensors
DHT dht(DHTPIN, DHTTYPE);
Adafruit_BMP280 bmp;

// Firebase data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);
  
  // Initialize sensors
  dht.begin();
  if (!bmp.begin(0x76)) {
    Serial.println("Could not find BMP280 sensor!");
    while (1);
  }
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected");
  
  // Initialize Firebase
  config.host = FIREBASE_HOST;
  config.api_key = FIREBASE_AUTH;
  Firebase.begin(&config, &auth);
}

void loop() {
  // Read sensor data
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  float pressure = bmp.readPressure() / 100.0F; // Convert to hPa
  int co2Level = analogRead(CO2_PIN);
  int lightLevel = analogRead(LIGHT_PIN);
  
  // Create JSON data
  String jsonData = "{\"temperature\":" + String(temperature) + 
                    ",\"humidity\":" + String(humidity) + 
                    ",\"pressure\":" + String(pressure) + 
                    ",\"co2\":" + String(co2Level) + 
                    ",\"light\":" + String(lightLevel) + 
                    ",\"timestamp\":" + String(millis()) + "}";
  
  // Send data to Firebase
  if (Firebase.ready()) {
    Firebase.RTDB.setJSON(&fbdo, "/sensor_data", jsonData);
  }
  
  delay(5000); // Send data every 5 seconds
} 