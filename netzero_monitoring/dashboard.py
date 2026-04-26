import dash
from dash import html, dcc
import plotly.graph_objects as go
import firebase_admin
from firebase_admin import credentials, db
import pandas as pd
from datetime import datetime, timedelta
from model import SustainabilityPredictor

# Initialize Firebase
cred = credentials.Certificate('path/to/your/serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'YOUR_FIREBASE_DATABASE_URL'
})

# Initialize the Dash app
app = dash.Dash(__name__)

# Initialize the predictor
predictor = SustainabilityPredictor()

def get_sensor_data():
    ref = db.reference('/sensor_data')
    data = ref.get()
    if data:
        df = pd.DataFrame.from_dict(data, orient='index')
        df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
        return df
    return pd.DataFrame()

def create_figure(df, column, title):
    fig = go.Figure()
    
    # Add actual data
    fig.add_trace(go.Scatter(
        x=df['timestamp'],
        y=df[column],
        name='Actual',
        line=dict(color='blue')
    ))
    
    # Add predictions if available
    if len(df) >= predictor.sequence_length:
        sequence = df[['temperature', 'humidity', 'pressure', 'co2', 'light']].values[-predictor.sequence_length:]
        prediction = predictor.predict(sequence)
        
        future_time = df['timestamp'].iloc[-1] + timedelta(minutes=5)
        fig.add_trace(go.Scatter(
            x=[future_time],
            y=prediction[0],
            name='Prediction',
            mode='markers',
            marker=dict(color='red', size=10)
        ))
    
    fig.update_layout(
        title=title,
        xaxis_title='Time',
        yaxis_title=column.capitalize(),
        template='plotly_dark'
    )
    return fig

app.layout = html.Div([
    html.H1('NetZero Sustainability Dashboard', 
            style={'textAlign': 'center', 'color': '#2ecc71', 'marginBottom': 30}),
    
    html.Div([
        html.Div([
            dcc.Graph(id='temperature-graph'),
            dcc.Graph(id='humidity-graph')
        ], style={'width': '50%', 'display': 'inline-block'}),
        
        html.Div([
            dcc.Graph(id='pressure-graph'),
            dcc.Graph(id='co2-graph')
        ], style={'width': '50%', 'display': 'inline-block'})
    ]),
    
    dcc.Graph(id='light-graph', style={'width': '100%'}),
    
    dcc.Interval(
        id='interval-component',
        interval=5*1000,  # in milliseconds
        n_intervals=0
    )
])

@app.callback(
    [dash.Output('temperature-graph', 'figure'),
     dash.Output('humidity-graph', 'figure'),
     dash.Output('pressure-graph', 'figure'),
     dash.Output('co2-graph', 'figure'),
     dash.Output('light-graph', 'figure')],
    [dash.Input('interval-component', 'n_intervals')]
)
def update_graphs(n):
    df = get_sensor_data()
    
    if df.empty:
        return {}, {}, {}, {}, {}
    
    return (
        create_figure(df, 'temperature', 'Temperature Trends'),
        create_figure(df, 'humidity', 'Humidity Trends'),
        create_figure(df, 'pressure', 'Pressure Trends'),
        create_figure(df, 'co2', 'CO2 Levels'),
        create_figure(df, 'light', 'Light Levels')
    )

if __name__ == '__main__':
    app.run_server(debug=True) 