import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';

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
const storage = getStorage(app);
const db = getFirestore(app);

// Map setup
const map = L.map('map').setView([47.6062, -122.3321], 7);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

// Upload photo and metadata
window.uploadFile = async function() {
  try {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const label = document.getElementById("labelInput").value;
    const lat = parseFloat(document.getElementById("latInput").value);
    const lng = parseFloat(document.getElementById("lngInput").value);

    console.log("Upload attempted with:", { file, label, lat, lng });

    if (!file) {
      return alert("Please select a file to upload");
    }
    
    if (!label || label.trim() === "") {
      return alert("Please provide a label for the photo");
    }
    
    if (isNaN(lat) || isNaN(lng)) {
      return alert("Please provide valid coordinates");
    }

    // Show upload is happening
    alert("Uploading... please wait");
    
    // Upload file to Storage
    const fileRef = storageRef(storage, 'photos/' + file.name);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    
    console.log("File uploaded successfully, URL:", url);

    // Save metadata to Firestore
    const photoData = {
      coords: [lat, lng],
      label,
      filename: file.name,
      uploadedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, "photos"), photoData);
    console.log("Document written with ID: ", docRef.id);

    // Add the new marker to the map immediately without reload
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<strong>${label}</strong><br><img src="${url}" alt="${label}" width="150">`);
    
    // Clear form
    fileInput.value = "";
    document.getElementById("labelInput").value = "";
    document.getElementById("latInput").value = "";
    document.getElementById("lngInput").value = "";
    
    alert("Photo uploaded successfully!");
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Upload failed: " + error.message);
  }
};

// Load markers from Firestore "photos"
async function loadMarkers() {
  try {
    const snapshot = await getDocs(collection(db, 'photos'));
    console.log(`Loading ${snapshot.size} markers from Firestore`);
    
    snapshot.forEach(async (doc) => {
      const data = doc.data();
      const { coords, label, filename } = data;
      
      if (!coords || !Array.isArray(coords) || coords.length !== 2) {
        console.error("Invalid coordinates for document:", doc.id);
        return;
      }
      
      if (!filename || !label) {
        console.error("Missing filename or label for document:", doc.id);
        return;
      }

      try {
        const url = await getDownloadURL(storageRef(storage, 'photos/' + filename));
        const marker = L.marker(coords).addTo(map);
        marker.bindPopup(`<strong>${label}</strong><br><img src="${url}" alt="${label}" width="150">`);
      } catch (error) {
        console.error("Could not load image for:", filename, error);
      }
    });
  } catch (error) {
    console.error("Error loading markers:", error);
  }
}

// Load markers when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadMarkers();
});