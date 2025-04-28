// Inisialisasi Firebase versi compat (karena pakai firebase-app-compat.js dan firebase-database-compat.js di HTML)

// Konfigurasi Firebase (samain dengan data project kamu di Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBuxgx9kY13NG7q0jDkUbbyDUTlkF3Ntu4",
  authDomain: "monitoringair-fe6cb.firebaseapp.com",
  databaseURL: "https://console.firebase.google.com/project/web-air/database/web-air-default-rtdb/data/~2F",
  projectId: "web-air",
  storageBucket: "monitoringair-fe6cb.appspot.com",
  messagingSenderId: "50022411066",
  appId: "1:50022411066:web:b4db3eae5863f1b9447e03"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Export database untuk bisa dipakai di script.js
const db = firebase.database();
