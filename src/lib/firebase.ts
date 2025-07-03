console.log('firebase.ts: Starting module load.');

// IMPORTANT: Replace with your actual Firebase project configuration
// You can find this in your Firebase project settings
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

console.log('firebase.ts: Imports complete.');

const firebaseConfig = {
  apiKey: "AIzaSyAzzH3P1q5mX-hGHlF5IAldgblCt2JopwM",
  authDomain: "velocity-chaser.firebaseapp.com",
  projectId: "velocity-chaser",
  storageBucket: "velocity-chaser.firebasestorage.app",
  messagingSenderId: "847307623330",
  appId: "1:847307623330:web:ee5aef63ee76f3e1e200fb",
  measurementId: "G-1LSBVMPZXC"
};

console.log('firebase.ts: firebaseConfig defined.');

// Initialize Firebase
let app;
console.log('firebase.ts: Checking existing Firebase apps. getApps().length:', getApps().length);
if (!getApps().length) {
  console.log('firebase.ts: No existing app found. Initializing new app...');
  app = initializeApp(firebaseConfig);
  console.log('firebase.ts: Firebase app initialized.');
} else {
  console.log('firebase.ts: Existing app found. Using getApp()...');
  app = getApp();
  console.log('firebase.ts: Using existing Firebase app.');
}

console.log('firebase.ts: Attempting to get Firestore instance.');
const db = getFirestore(app);
console.log('firebase.ts: Firestore instance created. db object:', db ? 'defined' : 'undefined');

console.log('firebase.ts: Exporting db.');
export { db };
