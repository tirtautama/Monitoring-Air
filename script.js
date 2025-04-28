// Ambil fungsi dari firebase-config.js
const db = firebase.database();
console.log(db)

// Fungsi untuk ambil data dari database dan isi ke elemen HTML
function updateValue(sensorPath, elementId, unit = '') {
  const ref = db.ref(sensorPath);
  ref.on('value', (snapshot) => {
    const data = snapshot.val();
    document.getElementById(elementId).innerText = data + ' ' + unit;
  });
}

// Update semua sensor
updateValue('sensor/ultrasonik', 'ultrasonik', 'cm');
updateValue('sensor/ph', 'ph');
updateValue('sensor/tds', 'tds', 'ppm');
updateValue('sensor/oksigen', 'oksigen', 'mg/L');
updateValue('sensor/suhu', 'suhu', '°C');
updateValue('sensor/turbidity', 'turbidity', 'NTU');

// Timestamp
const timestampRef = db.ref('sensor/timestamp');
timestampRef.on('value', (snapshot) => {
  const timestamp = snapshot.val();
  document.getElementById('timestamp').innerText = 'Waktu: ' + timestamp;
});

function updateUI(data) {
  document.getElementById("ultrasonik").textContent = data.ultrasonik ?? "--";
  document.getElementById("ph").textContent = data.ph ?? "--";
  document.getElementById("tds").textContent = data.tds ?? "--";
  document.getElementById("oksigen").textContent = data.oksigen ?? "--";
  document.getElementById("suhu").textContent = data.suhu ?? "--";
  document.getElementById("turbidity").textContent = data.turbidity ?? "--";

  const timestamp = new Date().toLocaleString();
  document.getElementById("timestamp").textContent = `Terakhir diperbarui: ${timestamp}`;
}

// Ganti path ini sesuai dengan struktur datamu di Realtime Database
const sensorRef = db.ref("monitoring_air");

sensorRef.on("value", (snapshot) => {
  const data = snapshot.val();
  if (data) {
    updateUI(data);
  } else {
    console.warn("Data tidak tersedia.");
  }
});
