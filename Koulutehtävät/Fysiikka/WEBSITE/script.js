const yourTotalDistance = 0.219; // in km
const yourAverageSpeed = 6.1; // in km/h
const yourStepCountMethod1 = 470; // steps
const yourStepCountMethod2 = 378; // steps

// Function to update the UI with calculated values
function updateUI() {
    // Update total distance
    document.getElementById("total-distance").textContent = `Total distance: ${yourTotalDistance} km`;

    // Update average speed
    document.getElementById("avg-speed").textContent = `Average speed: ${yourAverageSpeed} km/h`;

    // Update step count using two methods
    document.getElementById("steps-method1").textContent = `Step count (Method 1): ${yourStepCountMethod1}`;
    document.getElementById("steps-method2").textContent = `Step count (Method 2): ${yourStepCountMethod2}`;
}

// Function to show code for calculating each metric
function showCode(metric) {
    let code = "";
    switch(metric) {
        case 'route':
            code = `import folium
m = folium.Map(location=[location_df1['latitude'].iloc[0], location_df1['longitude'].iloc[0]], zoom_start=15)
coordinates1 = location_df1[['latitude', 'longitude']].values.tolist()
folium.PolyLine(coordinates1, color="red", weight=2.5, opacity=1).add_to(m)
coordinates2 = location_df2[['latitude', 'longitude']].values.tolist()
folium.PolyLine(coordinates2, color="blue", weight=2.5, opacity=1).add_to(m)`;
            break;
        case 'distance':
            code = `from math import radians, sin, cos, sqrt, atan2
def haversine_distance(coord1, coord2):
    R = 6371.0  // Earth radius in kilometers
    lat1, lon1 = radians(coord1[0]), radians(coord1[1])
    lat2, lon2 = radians(coord2[0]), radians(coord2[1])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c
    return distance`;
            break;
        case 'speed':
            code = `// Calculate elapsed time in seconds for both measurements
time_elapsed1 = location_df1['seconds_elapsed'].iloc[-1] - location_df1['seconds_elapsed'].iloc[0]
// Calculate average speed in m/s
average_speed1 = total_distance1 / time_elapsed1
average_speed1_kmh = average_speed1 * 3.6
print(f"Average speed for Measurement 1: {average_speed1_kmh} km/h")`;
            break;
        case 'steps':
            code = `import scipy.signal
// Find peaks in accelerometer data for Measurement 1 (using y-axis data as an example)
peaks1, _ = scipy.signal.find_peaks(accelerometer_df1['y'], height=0.5)
steps1 = len(peaks1)
print(f"Number of steps for Measurement 1: {steps1}")`;
            break;
    }
    window.alert(code);
}

// Add event listeners for 'Show Code' buttons
document.getElementById("show-route-code").addEventListener("click", () => showCode('route'));
document.getElementById("show-distance-code").addEventListener("click", () => showCode('distance'));
document.getElementById("show-speed-code").addEventListener("click", () => showCode('speed'));
document.getElementById("show-steps-code").addEventListener("click", () => showCode('steps'));

// Update the UI with actual data
updateUI();
