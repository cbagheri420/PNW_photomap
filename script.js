import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { 
  getStorage, 
  ref as storageRef, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  serverTimestamp, 
  deleteDoc, 
  doc 
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

// Global marker tracking
const markers = {};

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDOiM0cE_ZMNyaMWKN2qLUFNOKBzckX4lQ",
  authDomain: "photomap-126d9.firebaseapp.com",
  projectId: "photomap-126d9",
  storageBucket: "photomap-126d9.appspot.com",
  messagingSenderId: "1050413195252",
  appId: "1:1050413195252:web:871484345b1fe9d310a3a1"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://photomap-126d9.firebasestorage.app");
const db = getFirestore(app);

// Map setup with circular view optimizations
const map = L.map('map', {
  maxBounds: [
    [-90, -180],  // Southwest corner of the world
    [90, 180]     // Northeast corner of the world
  ],
  maxBoundsViscosity: 1.0,  // Makes the bounds "sticky"
  worldCopyJump: true,      // Better panning across the date line
  minZoom: 1.5,             // Allow seeing most of the world
  maxZoom: 19,
  zoomControl: false        // We'll add this in a custom position
}).setView([20, 0], 2);     // Center on the equator

// Add zoom control in a better position for the circular map
L.control.zoom({
  position: 'bottomright'
}).addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19,
  noWrap: true  // Prevents the tile layer from repeating horizontally
}).addTo(map);

// Click on map to set coordinates
let clickMarker = null;
map.on('click', function(e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  
  // Update form fields
  document.getElementById("latInput").value = lat.toFixed(6);
  document.getElementById("lngInput").value = lng.toFixed(6);
  
  // Add or move temporary marker
  if (clickMarker) {
    clickMarker.setLatLng([lat, lng]);
  } else {
    clickMarker = L.marker([lat, lng], {
      opacity: 0.7,
      draggable: true
    }).addTo(map);
    
    // Update coordinates when marker is dragged
    clickMarker.on('dragend', function() {
      const position = clickMarker.getLatLng();
      document.getElementById("latInput").value = position.lat.toFixed(6);
      document.getElementById("lngInput").value = position.lng.toFixed(6);
    });
  }
  
  clickMarker.bindPopup("Upload location").openPopup();
});

// Geolocation support
window.useCurrentLocation = function() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }
  
  const locationBtn = document.getElementById("locationBtn");
  locationBtn.disabled = true;
  locationBtn.textContent = "Getting location...";
  
  navigator.geolocation.getCurrentPosition(position => {
    document.getElementById("latInput").value = position.coords.latitude.toFixed(6);
    document.getElementById("lngInput").value = position.coords.longitude.toFixed(6);
    
    // Center map on user's location
    map.setView([position.coords.latitude, position.coords.longitude], 12);
    
    // Add a temporary marker to show the location
    if (clickMarker) {
      clickMarker.setLatLng([position.coords.latitude, position.coords.longitude]);
    } else {
      clickMarker = L.marker([position.coords.latitude, position.coords.longitude], {
        opacity: 0.7,
        draggable: true
      }).addTo(map);
      
      // Update coordinates when marker is dragged
      clickMarker.on('dragend', function() {
        const position = clickMarker.getLatLng();
        document.getElementById("latInput").value = position.lat.toFixed(6);
        document.getElementById("lngInput").value = position.lng.toFixed(6);
      });
    }
    
    clickMarker.bindPopup("Your location").openPopup();
    
    locationBtn.disabled = false;
    locationBtn.textContent = "📍 Use My Location";
  }, error => {
    console.error("Error getting location:", error);
    alert(`Couldn't get your location: ${error.message}`);
    locationBtn.disabled = false;
    locationBtn.textContent = "📍 Use My Location";
  });
};

// Upload photo and metadata with duplicate check
window.uploadFile = async function() {
  try {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const label = document.getElementById("labelInput").value;
    const lat = parseFloat(document.getElementById("latInput").value);
    const lng = parseFloat(document.getElementById("lngInput").value);

    if (!file) {
      return alert("Please select a file to upload");
    }
    
    if (!label || label.trim() === "") {
      return alert("Please provide a label for the photo");
    }
    
    if (isNaN(lat) || isNaN(lng)) {
      return alert("Please provide valid coordinates");
    }

    // Check for existing photos at the same coordinates
    const photosCollection = collection(db, "photos");
    const snapshot = await getDocs(photosCollection);
    let isDuplicate = false;
    
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.coords && 
          Math.abs(data.coords[0] - lat) < 0.000001 && 
          Math.abs(data.coords[1] - lng) < 0.000001) {
        isDuplicate = true;
      }
    });
    
    if (isDuplicate) {
      if (!confirm("A photo already exists at these coordinates. Do you want to add another?")) {
        return;
      }
    }

    // Show upload is happening
    const uploadBtn = document.querySelector(".upload-btn");
    uploadBtn.disabled = true;
    uploadBtn.textContent = "Uploading...";
    
    // Upload file to Storage
    const fileRef = storageRef(storage, 'photos/' + file.name);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    // Save metadata to Firestore
    const photoData = {
      coords: [lat, lng],
      label,
      filename: file.name,
      uploadedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, "photos"), photoData);

    // Add the new marker to the map immediately without reload
    const marker = L.marker([lat, lng]).addTo(map);
    markers[docRef.id] = marker;
    marker.bindPopup(
      `<div class="popup-content">
        <strong>${label}</strong>
        <img src="${url}" alt="${label}" width="150">
        <button class="delete-btn" onclick="deletePhoto('${docRef.id}', '${file.name}', this)">
          🗑️ Remove
        </button>
      </div>`
    );
    
    // Clear form
    fileInput.value = "";
    document.getElementById("labelInput").value = "";
    document.getElementById("latInput").value = "";
    document.getElementById("lngInput").value = "";
    
    // Clear the temporary marker after successful upload
    if (clickMarker) {
      map.removeLayer(clickMarker);
      clickMarker = null;
    }
    
    uploadBtn.disabled = false;
    uploadBtn.textContent = "Upload Photo";
    
    alert("Photo uploaded successfully!");
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Upload failed: " + error.message);
    document.querySelector(".upload-btn").disabled = false;
    document.querySelector(".upload-btn").textContent = "Upload Photo";
  }
};

// Improved delete function using marker references
window.deletePhoto = async function(docId, filename, buttonElement) {
  try {
    // Confirm before deleting
    if (!confirm("Are you sure you want to delete this photo?")) {
      return;
    }
    
    buttonElement.textContent = "Deleting...";
    buttonElement.disabled = true;
    
    // Delete from Firestore
    await deleteDoc(doc(db, "photos", docId));
    
    // Delete from Storage
    const fileRef = storageRef(storage, 'photos/' + filename);
    await deleteObject(fileRef);
    
    // Remove the marker using our stored reference
    if (markers[docId]) {
      map.removeLayer(markers[docId]);
      delete markers[docId]; // Clean up the reference
    }
    
    // Close any open popup
    map.closePopup();
    
    alert("Photo deleted successfully!");
  } catch (error) {
    console.error("Error deleting photo:", error);
    alert("Failed to delete photo: " + error.message);
  }
};

// Improved loadMarkers function with coordinate tracking to prevent duplicates
async function loadMarkers() {
  try {
    // Clear all existing markers first
    Object.values(markers).forEach(marker => {
      map.removeLayer(marker);
    });
    // Reset the markers object
    Object.keys(markers).forEach(key => delete markers[key]);
    
    const snapshot = await getDocs(collection(db, 'photos'));
    
    // Set to track coordinates we've already placed markers at
    const coordinatesSet = new Set();
    
    snapshot.forEach(async (doc) => {
      const data = doc.data();
      const { coords, label, filename } = data;
      const docId = doc.id;
      
      if (!coords || !Array.isArray(coords) || coords.length !== 2) {
        console.error("Invalid coordinates for document:", docId);
        return;
      }
      
      if (!filename || !label) {
        console.error("Missing filename or label for document:", docId);
        return;
      }
      
      // Create a string key for the coordinates
      const coordKey = `${coords[0].toFixed(6)},${coords[1].toFixed(6)}`;
      
      // Skip if we've already added a marker at these coordinates
      if (coordinatesSet.has(coordKey)) {
        return;
      }
      
      coordinatesSet.add(coordKey);

      try {
        const url = await getDownloadURL(storageRef(storage, 'photos/' + filename));
        const marker = L.marker(coords).addTo(map);
        
        // Store marker reference with document ID
        markers[docId] = marker;
        
        marker.bindPopup(
          `<div class="popup-content">
            <strong>${label}</strong>
            <img src="${url}" alt="${label}" width="150">
            <button class="delete-btn" onclick="deletePhoto('${docId}', '${filename}', this)">
              🗑️ Remove
            </button>
          </div>`
        );
      } catch (error) {
        console.error(`Could not load image for "${label}" (${filename}):`, error.code || error.message || error);
      }
    });
  } catch (error) {
    console.error("Error loading markers:", error);
  }
}

// Function to set the background image from Firebase Storage
async function setBackgroundImage() {
  try {
    const bgImageRef = storageRef(storage, 'bckgrnd/space.webp');
    const backgroundUrl = await getDownloadURL(bgImageRef);
    
    // Set the background image of the map container
    const mapContainer = document.querySelector('.map-container');
    mapContainer.style.backgroundImage = `url(${backgroundUrl})`;
    mapContainer.style.backgroundSize = 'cover';
    mapContainer.style.backgroundPosition = 'center';
  } catch (error) {
    console.error("Could not load background image:", error.code || error.message || error);
  }
}

// Load markers and set background when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadMarkers();
  setBackgroundImage();
});