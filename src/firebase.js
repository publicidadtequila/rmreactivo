import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDzGQOJhLy_xnszmPJGWcgfOgyGtGfAif8",
  authDomain: "rapidoymas-d96b3.firebaseapp.com",
  projectId: "rapidoymas-d96b3",
  storageBucket: "rapidoymas-d96b3.firebasestorage.app",
  messagingSenderId: "181757862393",
  appId: "1:181757862393:web:eaf22c2da5101d7e949d28",
  measurementId: "G-3FSYNR2LZ6"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "IbkJpg1bfdNtXhgEPxM_LHhdgeTZhjh7GaEszVVb9t-6O3oQq8q-TVsslaunwJ_mP6gN1SmyS07tq4echj5OQI",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
export const auth = getAuth(firebaseApp);
