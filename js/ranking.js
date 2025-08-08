document.addEventListener('DOMContentLoaded', () => {
    // Static data for demo purposes
    const bestCities = [
        { name: 'Zurich', country: 'Switzerland', aqi: 12 },
        { name: 'Reykjavik', country: 'Iceland', aqi: 14 },
        { name: 'Wellington', country: 'New Zealand', aqi: 15 },
        { name: 'Helsinki', country: 'Finland', aqi: 18 },
        { name: 'Canberra', country: 'Australia', aqi: 20 },
        { name: 'Ottawa', country: 'Canada', aqi: 22 },
        { name: 'Stockholm', country: 'Sweden', aqi: 24 },
        { name: 'Honolulu', country: 'USA', aqi: 25 },
        { name: 'Oslo', country: 'Norway', aqi: 26 },
        { name: 'Tallinn', country: 'Estonia', aqi: 28 },
    ];

    const worstCities = [
        { name: 'Ghaziabad', country: 'India', aqi: 288 },
        { name: 'Hotan', country: 'China', aqi: 265 },
        { name: 'Lahore', country: 'Pakistan', aqi: 251 },
        { name: 'Delhi', country: 'India', aqi: 232 },
        { name: 'Baghdad', country: 'Iraq', aqi: 210 },
        { name: 'Dhaka', country: 'Bangladesh', aqi: 198 },
        { name: 'Bishkek', country: 'Kyrgyzstan', aqi: 185 },
        { name: 'N\'Djamena', country: 'Chad', aqi: 182 },
        { name: 'Kolkata', country: 'India', aqi: 177 },
        { name: 'Kathmandu', country: 'Nepal', aqi: 175 },
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

    const createCard = (city, rank) => {
        const colorClass = getAqiColorClass(city.aqi);
        return `
            <div class="rank-card ${colorClass}">
                <span class="rank-number">#${rank}</span>
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
    };

    bestCities.sort((a, b) => a.aqi - b.aqi).forEach((city, index) => {
        bestCitiesGrid.innerHTML += createCard(city, index + 1);
    });

    worstCities.sort((a, b) => b.aqi - a.aqi).forEach((city, index) => {
        worstCitiesGrid.innerHTML += createCard(city, index + 1);
    });
});