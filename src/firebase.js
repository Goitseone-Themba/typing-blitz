// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeN9QfAl9mcAKktByJ2f627A6LOQrw5qs",
  authDomain: "typing-blitz-v0.firebaseapp.com",
  projectId: "typing-blitz-v0",
  storageBucket: "typing-blitz-v0.appspot.com",
  messagingSenderId: "482329369592",
  appId: "1:482329369592:web:822fb47d1f80281beb140d",
  measurementId: "G-GX6C5BP9X0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);