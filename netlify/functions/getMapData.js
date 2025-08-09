const fetch = require('node-fetch');

exports.handler = async function (event) {
  const { lat1, lng1, lat2, lng2 } = event.queryStringParameters;
  const API_KEY = process.env.WAQI_API_KEY; // Securely read from Netlify settings
  const url = `https://api.waqi.info/map/bounds/?latlng=${lat1},${lng1},${lat2},${lng2}&token=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch map data' }) };
  }
};