const fetch = require('node-fetch');

exports.handler = async function (event) {
  const { keyword } = event.queryStringParameters;
  const API_KEY = process.env.WAQI_API_KEY; // Securely read from Netlify settings
  const url = `https://api.waqi.info/search/?keyword=${keyword}&token=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch search data' }) };
  }
};