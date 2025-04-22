// Set up the map centered on the Pacific Northwest
const map = L.map('map').setView([47.6062, -122.3321], 6); // Seattle-ish

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a sample photo marker (you’ll load from Firebase later)

// PNW Markers
const marker1 = L.marker([47.49761227227601, -121.79088692588667]).addTo(map);
marker1.bindPopup(`<div class="popup"><img src="images/northbend_1.jpg" alt="Snoqualmie River photo"><h3>North Bend, Snoqualmie River</h3></div>`);

const marker2 = L.marker([47.65295214807401, -122.30632969624457]).addTo(map);
marker2.bindPopup(`<div class="popup"><img src="images/udub_1.jpg" alt="UDub photo"><h3>University of Washington</h3></div>`);

const marker3 = L.marker([47.60950532509169, -122.34188204796665]).addTo(map);
marker3.bindPopup(`<div class="popup"><img src="images/seattle_pikeplace.jpg" alt="Pike Place"><h3>Pike Place Market</h3></div>`);

const marker4 = L.marker([48.43268624012554, -122.42132558121979]).addTo(map);
marker4.bindPopup(`<div class="popup"><img src="images/pnw_tuliptown.jpg" alt="Tulip Town"><h3>Tulip Town</h3></div>`);

const marker5 = L.marker([48.43268624012554, -122.42132558121979]).addTo(map);
marker5.bindPopup(`<div class="popup"><img src="images/pnw_tolmie_peak.jpg" alt="Tolmie Peak"><h3>Tolmie Peak</h3></div>`);

const marker6 = L.marker([47.59631112404612, -120.66210101464043]).addTo(map);
marker6.bindPopup(`<div class="popup"><img src="images/pnw_leavenworth2.jpg" alt="Leavenworth"><h3>Leavenworth Bavarian Village</h3></div>`);

const marker7 = L.marker([47.49271983570615, -120.83352756624156]).addTo(map);
marker7.bindPopup(`<div class="popup"><img src="images/pnw_colchuk.jpg" alt="Colchuk"><h3>Colchuk Lake</h3></div>`);

const marker8 = L.marker([47.880256441635, -123.93352786911548]).addTo(map);
marker8.bindPopup(`<div class="popup"><img src="images/olympic_npark1.jpg" alt="Olympic NP"><h3>Olympic National Park</h3></div>`);

const marker9 = L.marker([49.29015147062034, -123.11822217884786]).addTo(map);
marker9.bindPopup(`<div class="popup"><img src="images/can_vancouver.jpg" alt="Vancouver"><h3>Vancouver, CAN</h3></div>`);

// OTHER USA
const marker10 = L.marker([32.80032369447516, -117.25610630263012]).addTo(map);
marker10.bindPopup(`<div class="popup"><img src="images/sd_pb.jpg" alt="SD"><h3>Pacific Beach, San Diego, CA</h3></div>`);

const marker11 = L.marker([40.00715805081597, -83.02768966209459]).addTo(map);
marker11.bindPopup(`<div class="popup"><img src="images/OSU_campus1.jpg" alt="OSU"><h3>Ohio State University Campus</h3></div>`);

const marker12 = L.marker([40.38307038618128, -105.51900573296084]).addTo(map);
marker12.bindPopup(`<div class="popup"><img src="images/colorado_stanley.jpg" alt="Stanley"><h3>The Shining Hotel, CO</h3></div>`);

const marker13 = L.marker([39.665800923814686, -105.2052119663685]).addTo(map);
marker13.bindPopup(`<div class="popup"><img src="images/colorado_redrock.jpg" alt="redrock"><h3>Red Rock Ampitheatre, CO</h3></div>`);

const marker21 = L.marker([40.74866805447258, -73.98553565807656]).addTo(map);
marker21.bindPopup(`<div class="popup"><img src="images/nyc.jpg" alt="Manhattan"><h3>Manhattan, NYC</h3></div>`);

// Europe
const marker14 = L.marker([48.203609336908016, 16.36935360003761]).addTo(map);
marker14.bindPopup(`<div class="popup"><img src="images/vienna_opera1.jpg" alt="Vienna"><h3>Vienna Opera House, Austria</h3></div>`);

const marker15 = L.marker([47.50100614183397, 19.053902865607466]).addTo(map);
marker15.bindPopup(`<div class="popup"><img src="images/budapest_cathedral.jpg" alt="Budapest"><h3>St. Stephans Basilica, Hungary</h3></div>`);

// Asia
const marker16 = L.marker([16.403752861047433, 120.59564038031534]).addTo(map);
marker16.bindPopup(`<div class="popup"><img src="images/ph_baguio.jpg" alt="Baguio"><h3>Baguio, Philippines</h3></div>`);

const marker17 = L.marker([16.632316208160123, 120.7697748320402]).addTo(map);
marker17.bindPopup(`<div class="popup"><img src="images/ph_atok.jpg" alt="Atok"><h3>Atok, Philippines</h3></div>`);

const marker18 = L.marker([35.0169856207258, 135.6717411778646]).addTo(map);
marker18.bindPopup(`<div class="popup"><img src="images/jpn_arashiyama.jpg" alt="Bamboo"><h3>Arashiyama Bamboo Forest, Japan</h3></div>`);

const marker19 = L.marker([34.967940648910876, 135.7791875956183]).addTo(map);
marker19.bindPopup(`<div class="popup"><img src="images/jpn_kyoto_inari.jpg" alt="Kyoto"><h3>Fushimi Inari, Kyoto, Japan</h3></div>`);

const marker20 = L.marker([35.46690954941151, 138.81366674535056]).addTo(map);
marker20.bindPopup(`<div class="popup"><img src="images/jpn_fujiyoshida.jpg" alt="Fujiyoshida"><h3>Onsen Hotel, Fujiyoshida, Japan</h3></div>`);
