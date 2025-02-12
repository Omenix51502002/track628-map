    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
    import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
    
    // Configuration Firebase (remplace avec tes propres clés)
    const firebaseConfig = {
        apiKey: "AIzaSyBDUPDtrF4IsEXdeorjEfR1R8Yi2-RJd7k",
        authDomain: "track628.firebaseapp.com",
        databaseURL: "https://track628-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "track628",
        storageBucket: "track628.firebasestorage.app",
        messagingSenderId: "115249938197",
        appId: "1:115249938197:web:35da7854d46d52b2bd731c",
    };
    
    // Initialiser Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    
    // Fonction pour récupérer les données de la base Firebase
    function fetchData() {
        const dbRef = ref(database, 'locationData'); // Référence à l'endroit où se trouvent les données
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const latitude = data.latitude;
                const longitude = data.longitude;
                const speed = data.speed;
    
                document.getElementById('latitude').textContent = latitude;
                document.getElementById('longitude').textContent = longitude;
                document.getElementById('speed').textContent = `${(speed).toFixed(2)} km/h`; // Conversion de m/s à km/h
    
                // Mettre à jour la carte avec la nouvelle position
                updateMap(latitude, longitude);
            }
        });
    }
    
    // Fonction pour afficher la carte et positionner un marqueur
    let map, marker;
    
    function updateMap(latitude, longitude) {
        if (!map) {
            // Créer une nouvelle carte si elle n'existe pas
            map = L.map('map').setView([latitude, longitude], 13); // Initialiser avec la position de départ
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
    
            marker = L.marker([latitude, longitude]).addTo(map);
        } else {
            // Mettre à jour le marqueur si la carte existe déjà
            marker.setLatLng([latitude, longitude]);
            map.setView([latitude, longitude]);
        }
    }
    
    // Initialiser la récupération de données
    fetchData();
    setInterval(fetchData, 1000); // Mettre à jour toutes les secondes
    