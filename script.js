// 🔥 Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBDUPDtrF4IsEXdeorjEfR1R8Yi2-RJd7k",
  authDomain: "track628.firebaseapp.com",
  databaseURL: "https://track628-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "track628",
  storageBucket: "track628.firebasestorage.app",
  messagingSenderId: "115249938197",
  appId: "1:115249938197:web:35da7854d46d52b2bd731c",
  measurementId: "G-Q7P5GTP9JT"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 🗺️ Initialisation de Leaflet
const map = L.map('map').setView([48.8566, 2.3522], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 📍 Création du marqueur
const marker = L.marker([48.8566, 2.3522]).addTo(map);

// 🎯 Mise à jour des données en temps réel
database.ref("locationData").on("value", (snapshot) => {
    const data = snapshot.val();
    if (data) {
        const { latitude, longitude, speed } = data;
        
        // 🏎️ Conversion de la vitesse en km/h
        const speedKmh = (speed * 3.6).toFixed(1);
        
        // 📌 Mise à jour du marqueur
        marker.setLatLng([latitude, longitude]);
        map.setView([latitude, longitude]);

        // 🚀 Mise à jour de l'affichage de la vitesse
        document.getElementById("speed-display").innerText = `Vitesse : ${speedKmh} km/h`;
    }
});
