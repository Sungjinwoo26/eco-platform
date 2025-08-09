document.addEventListener('DOMContentLoaded', () => {
    const bestCitiesGrid = document.getElementById('best-cities-grid');
    const worstCitiesGrid = document.getElementById('worst-cities-grid');
    const loader = document.getElementById('ranking-loader');

    const getAqiColorClass = (aqi) => {
        if (aqi <= 50) return 'good';
        if (aqi <= 100) return 'moderate';
        if (aqi <= 150) return 'unhealthy-sensitive';
        if (aqi <= 200) return 'unhealthy';
        if (aqi <= 300) return 'very-unhealthy';
        return 'hazardous';
    };

    const createCard = (city, rank, isWorst) => {
        const colorClass = getAqiColorClass(city.aqi);
        const mapLink = `index.html?city=${encodeURIComponent(city.name)}#map`;

        const mainContentHTML = `
            <div class="card-main-content">
                <div class="rank-number">#${rank}</div>
                <div class="city-info">
                    <h3>${city.name}</h3>
                    <p>${city.country}</p>
                </div>
                <div class="aqi-info">
                    <span class="aqi-label">AQI</span>
                    <span class="aqi-value">${city.aqi}</span>
                </div>
            </div>
        `;

        const actionButtonHTML = isWorst ? `
            <div class="card-actions">
                <a href="index.html?simulate=${city.key || encodeURIComponent(city.name)}" class="simulate-btn">Simulate Impact</a>
            </div>
        ` : '';
        
        const cardLinkWrapper = `
            <a href="${mapLink}" class="city-info-link">
                ${mainContentHTML}
            </a>
        `;

        return `
            <div class="rank-card ${colorClass}">
                ${cardLinkWrapper}
                ${actionButtonHTML}
            </div>
        `;
    };

    async function loadRankings() {
        loader.style.display = 'block'; // Show loader

        try {
            const response = await fetch('data/city_aqi_data.json');
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const allCities = await response.json();

            // Sort all cities by AQI, from best to worst
            allCities.sort((a, b) => a.aqi - b.aqi);

            // Get the top 10 best cities
            const bestCities = allCities.slice(0, 10);

            // Get the top 10 worst cities
            const worstCities = allCities.slice(-10).reverse();

            // Clear existing content
            bestCitiesGrid.innerHTML = '';
            worstCitiesGrid.innerHTML = '';

            // Populate the grids
            bestCities.forEach((city, index) => {
                bestCitiesGrid.innerHTML += createCard(city, index + 1, false);
            });

            worstCities.forEach((city, index) => {
                worstCitiesGrid.innerHTML += createCard(city, index + 1, true);
            });

        } catch (error) {
            console.error('Failed to load city rankings:', error);
            bestCitiesGrid.innerHTML = '<p>Could not load city rankings. Please try again later.</p>';
        } finally {
            loader.style.display = 'none'; // Hide loader
        }
    }

    loadRankings();
});
