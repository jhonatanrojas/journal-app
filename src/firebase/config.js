// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration AIzaSyCbXYgTwJ-UHvE3-OjoXTyEfpMggSoAN4M
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "react-cursos-c14bb.firebaseapp.com",
  projectId: "react-cursos-c14bb",
  storageBucket: "react-cursos-c14bb.firebasestorage.app",
  messagingSenderId: "719746747882",
  appId: "1:719746747882:web:2c31c178ac3aff31c9b693",
  measurementId: "G-4N312GZK1H"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
