
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyANN7xo7bfGxV-vE-oxwj4Q5oc6cz4aWM4",
  authDomain: "clone-2025-681b7.firebaseapp.com",
  projectId: "clone-2025-681b7",
  storageBucket: "clone-2025-681b7.appspot.com",
  messagingSenderId: "113018515232",
  appId: "1:113018515232:web:e4a261a06fb48442f2b145",
  measurementId: "G-2ZMX11V6VL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
export const auth=getAuth(app)
export const db = getFirestore(app);