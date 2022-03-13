// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtZgdPQEwWiVogUCycbyHyC28gbTO4TyE",
  authDomain: "facebook-clone-84f8a.firebaseapp.com",
  projectId: "facebook-clone-84f8a",
  storageBucket: "facebook-clone-84f8a.appspot.com",
  messagingSenderId: "922296101153",
  appId: "1:922296101153:web:6326ebf0ca67d42360b660",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
