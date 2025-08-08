document.addEventListener('DOMContentLoaded', () => {
    // Start with a global view
    const map = L.map('map').setView([20, 0], 3); 
    const loader = document.getElementById('loader');

    // Add a stylish, dark map background
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    function getAqiColor(value) {
        if (value <= 50) return '#28a745';
        if (value <= 100) return '#ffc107';
        if (value <= 150) return '#fd7e14';
        if (value <= 200) return '#dc3545';
        if (value <= 300) return '#800080';
        return '#702963';
    }
    
    async function fetchAirQualityData() {
        loader.style.display = 'block';
        console.log("Fetching global air quality data from OpenAQ...");
        
        const originalApiUrl = 'https://api.openaq.org/v2/latest?limit=10000&page=1&offset=0&sort=desc&parameter=pm25&order_by=lastUpdated';
        const proxiedApiUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalApiUrl)}`;

        try {
            const response = await fetch(proxiedApiUrl);
            if (!response.ok) throw new Error(`API Request Failed: ${response.status}`);
            const data = JSON.parse(await response.text());
            
            if (!data.results || data.results.length === 0) {
                loader.textContent = 'No live data available.';
                return;
            }

            console.log(`Success! Found ${data.results.length} data points.`);
            const heatPoints = [];

            data.results.forEach(item => {
                if (item.coordinates && item.measurements) {
                    const { latitude, longitude } = item.coordinates;
                    const aqiValue = item.measurements[0].value;
                    heatPoints.push([latitude, longitude, aqiValue]); // Add to heatmap

                    L.circleMarker([latitude, longitude], {
                        radius: 5,
                        fillColor: getAqiColor(aqiValue),
                        color: "#fff", weight: 1, opacity: 1, fillOpacity: 0.9
                    }).bindPopup(
                        `<strong>${item.location || 'Unknown'}</strong><br>PM2.5: <strong>${aqiValue.toFixed(2)} µg/m³</strong>`
                    ).addTo(map);
                }
            });

            if (heatPoints.length > 0) {
                 L.heatLayer(heatPoints, {
                    radius: 25, blur: 20, max: 150,
                    gradient: {0.1: 'blue', 0.2: 'lime', 0.4: 'yellow', 0.6: 'orange', 0.8: 'red', 1.0: 'purple'}
                }).addTo(map);
            }
        } catch (error) {
            console.error("Critical Error:", error);
            loader.textContent = 'Failed to load map data.';
        } finally {
            loader.style.display = 'none';
        }
    }

    fetchAirQualityData();
});