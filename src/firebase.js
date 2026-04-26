// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJnDFIYHZTFBrAVxLHbOBkcD22hfVSxD4",
  authDomain: "japaneseverb-conjugation-66af8.firebaseapp.com",
  projectId: "japaneseverb-conjugation-66af8",
  storageBucket: "japaneseverb-conjugation-66af8.firebasestorage.app",
  messagingSenderId: "631857388019",
  appId: "1:631857388019:web:e4f3f2f68e19567a0b1a86",
  measurementId: "G-9NZNXJ281Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);