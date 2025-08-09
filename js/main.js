document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DEFINE ALL CONSTANTS AND VARIABLES ---

    // DOM Element References
    const loader = document.getElementById('loader');
    const citySearchInput = document.getElementById('citySearch');
    const searchBtn = document.getElementById('searchBtn');
    
    // Simulator DOM Elements
    const simulatorPanel = document.getElementById('simulator-panel');
    const closeSimBtn = document.getElementById('simulator-toggle-btn');
    const launchSimBtn = document.getElementById('mobile-launch-sim-btn');
    const applyChangesBtn = document.getElementById('apply-changes-btn');
    const simulationResults = document.getElementById('simulation-results');
    const citySelect = document.getElementById('city-select');
    const simCityName = document.getElementById('sim-city-name');

    // Simulator Controls
    const treeSlider = document.getElementById('tree-slider');
    const treeSliderValue = document.getElementById('tree-slider-value');
    const plasticSlider = document.getElementById('plastic-slider');
    const plasticSliderValue = document.getElementById('plastic-slider-value');
    const solarSlider = document.getElementById('solar-slider');
    const solarSliderValue = document.getElementById('solar-slider-value');

    // City Data Library for Simulator
    const cityData = {
        mumbai: { name: 'Mumbai', annualPlasticTons: 438000, households: 4500000, avgKwhPerHouseholdYear: 3500, co2KgPerKwhGrid: 0.75 },
        delhi: { name: 'Delhi', annualPlasticTons: 250000, households: 4200000, avgKwhPerHouseholdYear: 4000, co2KgPerKwhGrid: 0.75 },
        pune: { name: 'Pune', annualPlasticTons: 150000, households: 1500000, avgKwhPerHouseholdYear: 3200, co2KgPerKwhGrid: 0.75 },
        hyderabad: { name: 'Hyderabad', annualPlasticTons: 180000, households: 2000000, avgKwhPerHouseholdYear: 3800, co2KgPerKwhGrid: 0.75 },
        bengaluru: { name: 'Bengaluru', annualPlasticTons: 200000, households: 2500000, avgKwhPerHouseholdYear: 4100, co2KgPerKwhGrid: 0.75 },
        london: { name: 'London', annualPlasticTons: 1100000, households: 3600000, avgKwhPerHouseholdYear: 3300, co2KgPerKwhGrid: 0.23 },
        newYork: { name: 'New York', annualPlasticTons: 1700000, households: 3100000, avgKwhPerHouseholdYear: 6500, co2KgPerKwhGrid: 0.29 },
        tokyo: { name: 'Tokyo', annualPlasticTons: 780000, households: 7200000, avgKwhPerHouseholdYear: 4500, co2KgPerKwhGrid: 0.45 },
        kolkata: { name: 'Kolkata', annualPlasticTons: 280000, households: 2200000, avgKwhPerHouseholdYear: 3400, co2KgPerKwhGrid: 0.75 },
        ghaziabad: { name: 'Ghaziabad', annualPlasticTons: 200000, households: 500000, avgKwhPerHouseholdYear: 3800, co2KgPerKwhGrid: 0.75 },
        lahore: { name: 'Lahore', annualPlasticTons: 300000, households: 1800000, avgKwhPerHouseholdYear: 3900, co2KgPerKwhGrid: 0.55 },
        dhaka: { name: 'Dhaka', annualPlasticTons: 400000, households: 3500000, avgKwhPerHouseholdYear: 3200, co2KgPerKwhGrid: 0.48 },
        baghdad: { name: 'Baghdad', annualPlasticTons: 220000, households: 1500000, avgKwhPerHouseholdYear: 4100, co2KgPerKwhGrid: 0.60 },
        kathmandu: { name: 'Kathmandu', annualPlasticTons: 120000, households: 400000, avgKwhPerHouseholdYear: 3100, co2KgPerKwhGrid: 0.52 },
        bishkek: { name: 'Bishkek', annualPlasticTons: 80000, households: 300000, avgKwhPerHouseholdYear: 3500, co2KgPerKwhGrid: 0.70 },
        hotan: { name: 'Hotan', annualPlasticTons: 100000, households: 200000, avgKwhPerHouseholdYear: 4200, co2KgPerKwhGrid: 0.65 },
        ndjamena: { name: 'N\'Djamena', annualPlasticTons: 50000, households: 200000, avgKwhPerHouseholdYear: 2800, co2KgPerKwhGrid: 0.50 }
    };

    // --- 2. INITIALIZE THE MAP ---
    const map = L.map('map', { zoomAnimation: false }).setView([28.6139, 77.2090], 11);
    let stationsLayer = L.layerGroup().addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // --- 3. DEFINE ALL FUNCTIONS ---
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
        // MODIFIED: URL points to our new serverless function
        const url = `/.netlify/functions/getMapData?lat1=${bounds.getSouth()}&lng1=${bounds.getWest()}&lat2=${bounds.getNorth()}&lng2=${bounds.getEast()}`;
        
        loader.style.display = 'block';

        fetch(url)
            .then(response => { 
                if (!response.ok) throw new Error('Network response was not ok.');
                return response.json(); 
            })
            .then(data => {
                if (data.status === "ok") {
                    const newStationsLayer = L.layerGroup();
                    data.data.forEach(station => {
                        const aqi = parseInt(station.aqi, 10);
                        if (!isNaN(aqi) && station.lat && station.lon) {
                            const { color, status } = getAqiColor(aqi);
                            const popupContent = `<div class="popup-content"><h4>${station.station.name}</h4><p class="aqi-value" style="background-color: ${color};">AQI: ${aqi} (${status})</p><p class="timestamp">Last updated: ${new Date(station.station.time).toLocaleString()}</p><div class="popup-actions"><a href="education.html" class="popup-btn">Learn</a><a href="marketplace.html" class="popup-btn shop">Shop Solutions</a></div></div>`;
                            const circleMarker = L.circleMarker([station.lat, station.lon], { radius: 8, fillColor: color, color: '#fff', weight: 1.5, opacity: 1, fillOpacity: 0.8 }).bindPopup(popupContent, { autoPan: false });
                            newStationsLayer.addLayer(circleMarker);
                        }
                    });
                    if (map.hasLayer(stationsLayer)) {
                        map.removeLayer(stationsLayer);
                    }
                    newStationsLayer.addTo(map);
                    stationsLayer = newStationsLayer;
                } else {
                    console.error('API Error:', data.data);
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

    const searchForCity = (city) => {
        const keyword = city || citySearchInput.value.trim();
        if (!keyword) { alert('Please enter a city name.'); return; }
        // MODIFIED: URL points to our new serverless function
        const url = `/.netlify/functions/searchCity?keyword=${encodeURIComponent(keyword)}`;
        
        loader.style.display = 'block';
        fetch(url)
            .then(response => response.json())
            .then(data => { if (data.status === 'ok' && data.data.length > 0) { const firstResult = data.data[0]; if (firstResult.station && firstResult.station.geo) { map.setView(firstResult.station.geo, 11); } else { alert('Location data not found for this city.'); } } else { alert('City not found. Please try another name.'); } })
            .catch(error => { console.error('Search Error:', error); alert('Could not perform search.'); })
            .finally(() => { loader.style.display = 'none'; });
    };

    const toggleSimulator = () => simulatorPanel.classList.toggle('is-open');

    // --- 4. ATTACH ALL EVENT LISTENERS & INITIALIZE PAGE ---
    
    let moveEndTimeout;
    map.on('moveend', () => {
        clearTimeout(moveEndTimeout);
        moveEndTimeout = setTimeout(() => {
            fetchMapData();
        }, 250);
    });

    searchBtn.addEventListener('click', () => searchForCity());
    citySearchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') searchForCity(); });

    launchSimBtn.addEventListener('click', toggleSimulator);
    closeSimBtn.addEventListener('click', toggleSimulator);
    
    treeSlider.addEventListener('input', () => { treeSliderValue.textContent = `${parseInt(treeSlider.value).toLocaleString()} trees`; });
    plasticSlider.addEventListener('input', () => { plasticSliderValue.textContent = `${plasticSlider.value}%`; });
    solarSlider.addEventListener('input', () => { solarSliderValue.textContent = `${solarSlider.value}%`; });

    citySelect.addEventListener('change', (e) => {
        const selectedCityKey = e.target.value;
        const selectedCity = cityData[selectedCityKey];
        if (selectedCity) {
            simCityName.textContent = selectedCity.name;
            simulationResults.innerHTML = `<p>Adjust the sliders for ${selectedCity.name} to see the projected impact.</p>`;
        }
    });

    applyChangesBtn.addEventListener('click', () => {
        const treesPlanted = parseInt(treeSlider.value);
        const plasticReductionPercent = parseInt(plasticSlider.value);
        const solarAdoptionPercent = parseInt(solarSlider.value);
        const selectedCityKey = citySelect.value;
        const currentCityData = cityData[selectedCityKey];
        if (!currentCityData) {
            alert('Please select a valid city.');
            return;
        }
        const CO2_ABSORPTION_PER_TREE_KG_YEAR = 21;
        const CO2_PER_TON_PLASTIC_TONS = 2.5;
        const co2FromTrees = (treesPlanted * CO2_ABSORPTION_PER_TREE_KG_YEAR) / 1000;
        const co2FromPlastic = (currentCityData.annualPlasticTons * (plasticReductionPercent / 100)) * CO2_PER_TON_PLASTIC_TONS;
        const co2FromSolar = (currentCityData.households * (solarAdoptionPercent / 100) * currentCityData.avgKwhPerHouseholdYear * currentCityData.co2KgPerKwhGrid) / 1000;
        const totalCo2Reduced = co2FromTrees + co2FromPlastic + co2FromSolar;
        simulationResults.innerHTML = `<ul><li>🌳 Trees: <strong>-${co2FromTrees.toFixed(2)}</strong> tonnes CO₂/year</li><li>♻️ Plastic: <strong>-${co2FromPlastic.toFixed(2)}</strong> tonnes CO₂/year</li><li>☀️ Solar: <strong>-${co2FromSolar.toFixed(2)}</strong> tonnes CO₂/year</li><li class="total-impact">Combined: <strong>-${totalCo2Reduced.toFixed(2)}</strong> tonnes CO₂/year</li></ul>`;
    });

    // --- 5. INITIALIZE THE PAGE ---
    function handlePageLoadActions() {
        const urlParams = new URLSearchParams(window.location.search);
        const cityToSearch = urlParams.get('city');
        const cityToSimulate = urlParams.get('simulate');

        if (cityToSimulate && cityData[cityToSimulate]) {
            searchForCity(cityData[cityToSimulate].name);
            citySelect.value = cityToSimulate;
            simCityName.textContent = cityData[cityToSimulate].name;
            if (!simulatorPanel.classList.contains('is-open')) {
                toggleSimulator();
            }
        } else if (cityToSearch) {
            searchForCity(cityToSearch);
        } else {
            fetchMapData();
        }
    }

    handlePageLoadActions();
});
