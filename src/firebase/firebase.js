// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTi-kq36rzQ0kNIInMwtf-_7MXZ4sWzuw",
  authDomain: "purr-rescue.firebaseapp.com",
  projectId: "purr-rescue",
  storageBucket: "purr-rescue.appspot.com",
  messagingSenderId: "744943837051",
  appId: "1:744943837051:web:ed6981096298d590ac27de",
  measurementId: "G-NSMWEBKX3Z"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();

export {app, firestore}
