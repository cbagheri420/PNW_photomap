// Set up the map centered on the Pacific Northwest
const map = L.map('map').setView([47.6062, -122.3321], 6); // Seattle-ish

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add a sample photo marker (you’ll load from Firebase later)

// PNW Markers
const marker1 = L.marker([47.49761227227601, -121.79088692588667]).addTo(map);
marker1.bindPopup('<strong>North Bend, Snoqualmie River</strong><br><img src="images/northbend_1.jpg" alt="Snoqualmie River photo" width="150">');

const marker2 = L.marker([47.65295214807401, -122.30632969624457]).addTo(map);
marker2.bindPopup('<strong>University of Washington</strong><br><img src="images/udub_1.jpg" alt="UDub photo" width="150">');

const marker3 = L.marker([47.60950532509169, -122.34188204796665]).addTo(map);
marker3.bindPopup('<strong>Pike Place Market</strong><br><img src="images/seattle_pikeplace.jpg" alt="Pike Place" width="150">');

const marker4 = L.marker([48.43268624012554, -122.42132558121979]).addTo(map);
marker4.bindPopup('<strong>Tulip Town</strong><br><img src="images/pnw_tuliptown.jpg" alt="Tulip Town" width="150">');

const marker5 = L.marker([48.43268624012554, -122.42132558121979]).addTo(map);
marker5.bindPopup('<strong>Tolmie Peak</strong><br><img src="images/pnw_tolmie_peak.jpg" alt="Tolmie Peak" width="150">');

const marker6 = L.marker([47.59631112404612, -120.66210101464043]).addTo(map);
marker6.bindPopup('<strong>Leavenworth Bavarian Village</strong><br><img src="images/pnw_leavenworth2.jpg" alt="Leavenworth" width="150">');

const marker7 = L.marker([47.49271983570615, -120.83352756624156]).addTo(map);
marker7.bindPopup('<strong>Colchuk Lake</strong><br><img src="images/pnw_colchuk.jpg" alt="Colchuk" width="150">');

const marker8 = L.marker([47.880256441635, -123.93352786911548]).addTo(map);
marker8.bindPopup('<strong>Olympic National Park</strong><br><img src="images/olympic_npark1.jpg" alt="Olympic NP" width="150">');

const marker9 = L.marker([49.29015147062034, -123.11822217884786]).addTo(map);
marker9.bindPopup('<strong>Vancouver, CAN</strong><br><img src="images/can_vancouver.jpg" alt="Vancouver" width="150">');

// Other USA
const marker10 = L.marker([32.80032369447516, -117.25610630263012]).addTo(map);
marker10.bindPopup('<strong>Pacific Beach, San Diego, CA</strong><br><img src="images/sd_pb.jpg" alt="SD" width="150">');

const marker11 = L.marker([40.00715805081597, -83.02768966209459]).addTo(map);
marker11.bindPopup('<strong>Ohio State University Campus</strong><br><img src="images/OSU_campus1.jpg" alt="OSU" width="150">');

const marker12 = L.marker([40.38307038618128, -105.51900573296084]).addTo(map);
marker12.bindPopup('<strong>The Shining Hotel, CO</strong><br><img src="images/colorado_stanley.jpg" alt="Stanley" width="150">');

const marker13 = L.marker([39.665800923814686, -105.2052119663685]).addTo(map);
marker13.bindPopup('<strong>Red Rock Ampitheatre, CO</strong><br><img src="images/colorado_redrock.jpg" alt="redrock" width="150">');

// Europe
const marker14 = L.marker([48.203609336908016, 16.36935360003761]).addTo(map);
marker14.bindPopup('<strong>Vienna Opera House, Austria</strong><br><img src="images/vienna_opera1.jpg" alt="Vienna" width="150">');

const marker15 = L.marker([47.50100614183397, 19.053902865607466]).addTo(map);
marker15.bindPopup('<strong>St. Stephans Basilica, Hungary</strong><br><img src="images/budapest_cathedral.jpg" alt="Budapest" width="150">');

// Asia
const marker16 = L.marker([16.403752861047433, 120.59564038031534]).addTo(map);
marker16.bindPopup('<strong>Baguio, Philippines</strong><br><img src="images/ph_baguio.jpg" alt="Baguio" width="150">');

const marker17 = L.marker([16.632316208160123, 120.7697748320402]).addTo(map);
marker17.bindPopup('<strong>Atok, Philippines</strong><br><img src="images/ph_atok.jpg" alt="Atok" width="150">');

const marker18 = L.marker([35.0169856207258, 135.6717411778646]).addTo(map);
marker18.bindPopup('<strong>Arashiyama Bamboo Forest, Japan</strong><br><img src="images/jpn_arashiyama.jpg" alt="Bamboo" width="150">');

const marker19 = L.marker([34.967940648910876, 135.7791875956183]).addTo(map);
marker19.bindPopup('<strong>Fushimi Inari, Kyoto, Japan</strong><br><img src="images/jpn_kyoto_inari.jpg" alt="Kyoto" width="150">');

const marker20 = L.marker([35.46690954941151, 138.81366674535056]).addTo(map);
marker20.bindPopup('<strong>Onsen Hotel, Fujiyoshida, Japan</strong><br><img src="images/jpn_fujiyoshida.jpg" alt="Fujiyoshida" width="150">');