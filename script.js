// Set up the map centered on the Pacific Northwest
const map = L.map('map').setView([47.6062, -122.3321], 6); // Seattle-ish

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a sample photo marker (you’ll load from Firebase later)
const marker = L.marker([47.6062, -122.3321]).addTo(map);
marker.bindPopup('<strong>Seattle</strong><br><img src="images/spaceneedletest.jpg" alt="Seattle photo" width="150">');