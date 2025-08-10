🌍 EcoTrack
A Sustainable Environment Monitoring and Awareness Platform

🚀 Hackathon Context
EcoTrack was conceived and built as part of a hackathon challenge focused on solving pressing environmental issues through innovative technology.
Our goal: Bridge the gap between environmental awareness and real-world action — creating a platform that not only informs but also empowers and motivates.
We’ve designed EcoTrack to be demo-ready for judges while being technically sound, secure, and scalable for real-world deployment.

🚀 The Problem
In an era of information overload, raw environmental data often fails to inspire action. People see charts and numbers about pollution but feel disconnected and powerless — leading to awareness without agency.
Problem Statement: How can we turn environmental awareness into measurable, personal action?

💡 Our Solution: EcoTrack
EcoTrack transforms passive environmental monitoring into an active, gamified, and personalized sustainability journey.
We guide users from Awareness → Education → Action, showing not only the data but also clear ways to make an impact — and rewarding them for it.

✨ Key Features
1. Real-Time Environmental Monitoring
Interactive AQI Map: Live Air Quality Index data from the WAQI API, displayed using Leaflet.js.

Actionable Popups: Links to Learn and Marketplace pages for immediate action.

City Search: Instant environmental status lookup for any city.

2. "What If" Impact Simulator
Visualize Impact: Simulates CO₂ reduction from tree planting, plastic reduction, and solar adoption.

Multi-City Data: Compare results for cities like Delhi, Mumbai, London, and Tokyo.

Dynamic Calculations: Uses stored city datasets and conversion factors.

3. Personalized "Eco-Type" Quiz & Gamification
Discover Your Footprint: Engaging lifestyle-based quiz.

Persistent Badge: Displays user rank (Eco Risk → Eco Hero) in the header.

Celebrations: Confetti animation for achieving Eco Hero.

JSON Ranking System: Quiz thresholds and ranks are stored in a JSON file; logic calculates and compares scores dynamically for maintainability.

4. Eco-Friendly Marketplace
Curated Products: Sustainable lifestyle items with persistent localStorage cart.

Revenue for a Cause: Commission-based model funds platform growth.

5. Educational Hub
Learn & Act: Guides, articles, and videos on sustainability topics.

Community Links: Connect to groups and local drives.

🛠️ How We Built It (Tech Stack & Security)
Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)

Mapping: Leaflet.js – open-source maps

Backend: Netlify Functions (Node.js) for API calls

Data Source: WAQI API – real-time air quality data

Animations: CSS transitions, Canvas-Confetti

Deployment: Netlify with CI/CD

Security:

WAQI API key stored in Netlify environment variables (never exposed to the client)

All API calls proxied through backend functions (getMapData.js, searchCity.js)

Prevents key theft and shields direct API abuse

📈 Business Model & Revenue
Actionable Commerce: Commission-based marketplace for eco-friendly products.

EcoTrack Pro (Future): Premium subscription with advanced analytics, hyper-local forecasts, and gamified challenges.

Virtuous Cycle: Awareness → Education → Action → Revenue → Reinvestment in platform growth.

👨‍💻 The Team
Aakshat Mukkawar (Future)
