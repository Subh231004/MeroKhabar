// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVIlhj9yJ1P4c-N0eBb1_wBvw2n0euZFc",
  authDomain: "merokhabar-479d2.firebaseapp.com",
  projectId: "merokhabar-479d2",
  storageBucket: "merokhabar-479d2.firebasestorage.app",
  messagingSenderId: "938732297559",
  appId: "1:938732297559:web:b5e9f12185faaea8483212",
  measurementId: "G-CCHLNLJX2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const analytics = getAnalytics(app);

export { db };