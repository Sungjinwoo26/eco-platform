document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([20, 0], 2); // Center of the world, zoomed out
    const loader = document.getElementById('loader');

    // Add a tile layer from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Function to determine color based on AQI value (PM2.5)
    function getAqiColor(value) {
        if (value <= 50) return '#28a745';   // Good (Green)
        if (value <= 100) return '#ffc107'; // Moderate (Yellow)
        if (value <= 150) return '#fd7e14'; // Unhealthy for Sensitive (Orange)
        if (value <= 200) return '#dc3545'; // Unhealthy (Red)
        if (value <= 300) return '#800080'; // Very Unhealthy (Purple)
        return '#702963';                   // Hazardous (Maroon)
    }
    
    // Fetch data from OpenAQ API
    async function fetchAirQualityData() {
        try {
            // We fetch the latest PM2.5 data, limited to 2000 points for performance
            const response = await fetch('https://api.openaq.org/v2/latest?limit=2000&page=1&offset=0&sort=desc&parameter=pm25&radius=1000&order_by=lastUpdated');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Hide loader once data is fetched
            loader.style.display = 'none';

            // Process and plot data on the map
            data.results.forEach(item => {
                if (item.coordinates) {
                    const { latitude, longitude } = item.coordinates;
                    const aqiValue = item.measurements[0].value;
                    const locationName = item.location;

                    const circle = L.circleMarker([latitude, longitude], {
                        radius: 6 + (aqiValue / 20), // Radius scales with pollution
                        fillColor: getAqiColor(aqiValue),
                        color: '#fff',
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    }).addTo(map);

                    // Add a popup with info
                    circle.bindPopup(`
                        <strong>${locationName}</strong><br>
                        Country: ${item.country}<br>
                        PM2.5 AQI: <strong>${aqiValue.toFixed(2)} µg/m³</strong>
                    `);
                }
            });

        } catch (error) {
            console.error("Failed to fetch air quality data:", error);
            loader.textContent = 'Failed to load map data. Please try again later.';
        }
    }

    fetchAirQualityData();
});