import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

class SustainabilityPredictor:
    def __init__(self, sequence_length=10):
        self.sequence_length = sequence_length
        self.model = self._build_model()
        self.scaler = MinMaxScaler()
        
    def _build_model(self):
        model = Sequential([
            LSTM(50, return_sequences=True, input_shape=(self.sequence_length, 5)),
            Dropout(0.2),
            LSTM(50, return_sequences=False),
            Dropout(0.2),
            Dense(25),
            Dense(5)  # Predict temperature, humidity, pressure, CO2, and light
        ])
        
        model.compile(optimizer='adam', loss='mse')
        return model
    
    def prepare_data(self, data):
        # Scale the data
        scaled_data = self.scaler.fit_transform(data)
        
        # Create sequences
        X, y = [], []
        for i in range(len(scaled_data) - self.sequence_length):
            X.append(scaled_data[i:(i + self.sequence_length)])
            y.append(scaled_data[i + self.sequence_length])
            
        return np.array(X), np.array(y)
    
    def train(self, X, y, epochs=50, batch_size=32):
        self.model.fit(X, y, epochs=epochs, batch_size=batch_size, validation_split=0.2)
    
    def predict(self, sequence):
        scaled_sequence = self.scaler.transform(sequence)
        prediction = self.model.predict(scaled_sequence.reshape(1, self.sequence_length, 5))
        return self.scaler.inverse_transform(prediction) 