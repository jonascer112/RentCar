// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database'; // Import getDatabase


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrd708sZgHeOT1DidSyBWamId3mZZXEtw",
  authDomain: "test-5a851.firebaseapp.com",
  projectId: "test-5a851",
  storageBucket: "test-5a851.appspot.com",
  messagingSenderId: "298262566656",
  appId: "1:298262566656:web:d85521571acfdabf2b45e5",
  databaseURL: "https://test-5a851-default-rtdb.europe-west1.firebasedatabase.app"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Use the database
const db = getDatabase(app);

export { app, auth, db };

