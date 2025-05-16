// Import the functions you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuxgx9kY13NG7q0jDkUbbyDUTlkF3Ntu4",
  authDomain: "web-air.firebaseapp.com",
  databaseURL: "https://web-air-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-air",
  storageBucket: "web-air.firebasestorage.app",
  messagingSenderId: "804232357690",
  appId: "1:804232357690:web:bc2412af947322ea639203"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log(db);

// Fungsi untuk update data ke elemen HTML
function updateValue(sensorPath, elementId, unit = '') {
  const sensorRef = ref(db, sensorPath);
  onValue(sensorRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data.value)
    // document.getElementById(elementId).innerText = (data !== null ? data.value : "--") + ' ' + unit;
    document.getElementById(elementId).innerHTML = `${(data !== null ? data.value : "--")} <span class="unit">${unit}</span>`
  });
}

// Update semua sensor (jika pakai path per sensor)
updateValue('Sensor/Distance', 'ultrasonik', 'cm');
updateValue('Sensor/pH', 'ph', '');
updateValue('Sensor/TDS', 'tds', 'ppm');
updateValue('Sensor/DO', 'oksigen', 'mg/L');
updateValue('Sensor/Suhu', 'suhu', '°C');


// Timestamp sensor
const timestampRef = ref(db, 'Sensor/timestamp');
onValue(timestampRef, (snapshot) => {
  const timestamp = snapshot.val();
  document.getElementById('timestamp').innerText = (timestamp ?? "--");
});

// Fungsi untuk update seluruh UI sekaligus
function updateUI(data) {
  document.getElementById("ultrasonik").textContent = (data.ultrasonik ?? "--") + " cm";
  document.getElementById("ph").textContent = data.ph ?? "--";
  document.getElementById("tds").textContent = (data.tds ?? "--") + " ppm";
  document.getElementById("oksigen").textContent = (data.oksigen ?? "--") + " mg/L";
  document.getElementById("suhu").textContent = (data.suhu ?? "--") + " °C";
  document.getElementById("turbidity").textContent = (data.turbidity ?? "--") + " NTU";

  const timestamp = new Date().toLocaleString();
  document.getElementById("timestamp").textContent = `Terakhir diperbarui: ${timestamp}`;
}

// Update seluruh data sekaligus (jika pakai path 'monitoring_air')
const monitoringRef = ref(db, "monitoring_air");
onValue(monitoringRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    updateUI(data);
  } else {
    console.warn("Data tidak tersedia.");
  }
});
