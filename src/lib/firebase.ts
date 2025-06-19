// IMPORTANT: Replace with your actual Firebase project configuration
// You can find this in your Firebase project settings
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzzH3P1q5mX-hGHlF5IAldgblCt2JopwM",
  authDomain: "velocity-chaser.firebaseapp.com",
  projectId: "velocity-chaser",
  storageBucket: "velocity-chaser.firebasestorage.app",
  messagingSenderId: "847307623330",
  appId: "1:847307623330:web:ee5aef63ee76f3e1e200fb",
  measurementId: "G-1LSBVMPZXC"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  console.log('Initializing Firebase app...');
  app = initializeApp(firebaseConfig);
  console.log('Firebase app initialized.');
} else {
  console.log('Using existing Firebase app.');
  app = getApp();
}

const db = getFirestore(app);
console.log('Firestore instance created.');

export { db };
