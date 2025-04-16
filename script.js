// Set up the map centered on the Pacific Northwest
const map = L.map('map').setView([47.6062, -122.3321], 6); // Seattle-ish

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a sample photo marker (you’ll load from Firebase later)
const marker1 = L.marker([47.49761227227601, -121.79088692588667]).addTo(map);
marker1.bindPopup('<strong>North Bend, Snoqualmie River</strong><br><img src="images/northbend_1.jpg" alt="Snoqualmie River photo" width="150">');

const marker2 = L.marker([47.65295214807401, -122.30632969624457]).addTo(map);
marker2.bindPopup('<strong>University of Washington, Cherry Blossoms</strong><br><img src="images/udub_1.jpg" alt="UDub photo" width="150">');