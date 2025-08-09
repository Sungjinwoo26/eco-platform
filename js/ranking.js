document.addEventListener('DOMContentLoaded', () => {
    // Static data for demo purposes
    const bestCities = [
        { name: 'Zurich', country: 'Switzerland', aqi: 12, key: 'zurich' },
        { name: 'Reykjavik', country: 'Iceland', aqi: 14, key: 'reykjavik' },
        { name: 'Wellington', country: 'New Zealand', aqi: 15, key: 'wellington' },
        { name: 'Helsinki', country: 'Finland', aqi: 18, key: 'helsinki' },
        { name: 'Canberra', country: 'Australia', aqi: 20, key: 'canberra' },
        { name: 'Ottawa', country: 'Canada', aqi: 22, key: 'ottawa' },
        { name: 'Stockholm', country: 'Sweden', aqi: 24, key: 'stockholm' },
        { name: 'Honolulu', country: 'USA', aqi: 25, key: 'honolulu' },
        { name: 'Oslo', country: 'Norway', aqi: 26, key: 'oslo' },
        { name: 'Tallinn', country: 'Estonia', aqi: 28, key: 'tallinn' },
    ];

    const worstCities = [
        { name: 'Ghaziabad', country: 'India', aqi: 288, key: 'ghaziabad' },
        { name: 'Hotan', country: 'China', aqi: 265, key: 'hotan' },
        { name: 'Lahore', country: 'Pakistan', aqi: 251, key: 'lahore' },
        { name: 'Delhi', country: 'India', aqi: 232, key: 'delhi' },
        { name: 'Baghdad', country: 'Iraq', aqi: 210, key: 'baghdad' },
        { name: 'Dhaka', country: 'Bangladesh', aqi: 198, key: 'dhaka' },
        { name: 'Bishkek', country: 'Kyrgyzstan', aqi: 185, key: 'bishkek' },
        { name: 'N\'Djamena', country: 'Chad', aqi: 182, key: 'ndjamena' },
        { name: 'Kolkata', country: 'India', aqi: 177, key: 'kolkata' },
        { name: 'Kathmandu', country: 'Nepal', aqi: 175, key: 'kathmandu' },
    ];

    const bestCitiesGrid = document.getElementById('best-cities-grid');
    const worstCitiesGrid = document.getElementById('worst-cities-grid');

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
        // MODIFIED: Added #map to the URL to enable auto-scrolling
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

        // For all cards, the main content area is now a link to the map
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

    bestCities.sort((a, b) => a.aqi - b.aqi).forEach((city, index) => {
        bestCitiesGrid.innerHTML += createCard(city, index + 1, false);
    });

    worstCities.sort((a, b) => b.aqi - a.aqi).forEach((city, index) => {
        worstCitiesGrid.innerHTML += createCard(city, index + 1, true);
    });
});
