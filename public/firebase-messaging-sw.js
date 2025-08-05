importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDzGQOJhLy_xnszmPJGWcgfOgyGtGfAif8",
  authDomain: "rapidoymas-d96b3.firebaseapp.com",
  projectId: "rapidoymas-d96b3",
  storageBucket: "rapidoymas-d96b3.firebasestorage.app",
  messagingSenderId: "181757862393",
  appId: "1:181757862393:web:eaf22c2da5101d7e949d28",
  measurementId: "G-3FSYNR2LZ6"
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
