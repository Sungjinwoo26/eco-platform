document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const citySearchInput = document.getElementById('citySearch');
    const searchBtn = document.getElementById('searchBtn');

    // --- Configuration ---
    const WAQI_TOKEN = "c3a5fb06cf8a7723dc386ef31a857c35c8de2f8e"; 
    const WAQI_MAP_URL = `https://api.waqi.info/map/bounds/?latlng={lat1},{lng1},{lat2},{lng2}&token=${WAQI_TOKEN}`;
    const WAQI_SEARCH_URL = `https://api.waqi.info/search/?keyword={keyword}&token=${WAQI_TOKEN}`;

    // --- Map Initialization ---
    // UPDATED: Set the default view to Mumbai's coordinates with a closer zoom level.
    const map = L.map('map').setView([19.0760, 72.8777], 11); 

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    let stationsLayer = L.layerGroup().addTo(map);

    // --- Core Functions ---
    const getAqiColor = (aqi) => {
        if (aqi <= 50) return { color: '#28a745', status: 'Good' };
        if (aqi <= 100) return { color: '#ffc107', status: 'Moderate' };
        if (aqi <= 150) return { color: '#fd7e14', status: 'Unhealthy for Sensitive' };
        if (aqi <= 200) return { color: '#dc3545', status: 'Unhealthy' };
        if (aqi <= 300) return { color: '#6f42c1', status: 'Very Unhealthy' };
        return { color: '#781c45', status: 'Hazardous' };
    };

    const fetchMapData = () => {
        const bounds = map.getBounds();
        const latlng = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
        const url = WAQI_MAP_URL.replace('{lat1},{lng1},{lat2},{lng2}', latlng);

        loader.style.display = 'block';

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok.');
                return response.json();
            })
            .then(data => {
                if (data.status === "ok") {
                    updateMapMarkers(data.data);
                } else {
                    console.error('API Error:', data.data);
                    alert(`API Error: ${data.data}`);
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                alert('Could not fetch map data. Please check connection or API token.');
            })
            .finally(() => {
                 loader.style.display = 'none';
            });
    };

    const updateMapMarkers = (stations) => {
        stationsLayer.clearLayers();
        stations.forEach(station => {
            const aqi = parseInt(station.aqi, 10);
            if (!isNaN(aqi) && station.lat && station.lon) {
                const { color, status } = getAqiColor(aqi);
                const circleMarker = L.circleMarker([station.lat, station.lon], {
                    radius: 8,
                    fillColor: color,
                    color: '#fff',
                    weight: 1.5,
                    opacity: 1,
                    fillOpacity: 0.8
                }).bindPopup(`
                    <div class="popup-content">
                        <h4>${station.station.name}</h4>
                        <p class="aqi-value" style="background-color: ${color};">AQI: ${aqi} (${status})</p>
                        <p class="timestamp">Last updated: ${new Date(station.station.time).toLocaleString()}</p>
                    </div>
                `);
                stationsLayer.addLayer(circleMarker);
            }
        });
    };
    
    const searchForCity = () => {
        const city = citySearchInput.value.trim();
        if (!city) {
            alert('Please enter a city name.');
            return;
        }

        const url = WAQI_SEARCH_URL.replace('{keyword}', encodeURIComponent(city));
        loader.style.display = 'block';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok' && data.data.length > 0) {
                    const firstResult = data.data[0];
                    if (firstResult.station && firstResult.station.geo) {
                         map.setView(firstResult.station.geo, 11);
                    } else {
                        alert('Location data not found for this city.');
                    }
                } else {
                    alert('City not found. Please try another name.');
                }
            })
            .catch(error => {
                console.error('Search Error:', error);
                alert('Could not perform search.');
            })
            .finally(() => {
                 loader.style.display = 'none';
            });
    };

    // --- Event Listeners ---
    map.on('moveend', fetchMapData);
    searchBtn.addEventListener('click', searchForCity);
    citySearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchForCity();
        }
    });

    // --- Initial Load ---
    fetchMapData();
});