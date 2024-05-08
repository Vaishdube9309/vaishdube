import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPI5Ur_Mfz-mOHEkkNYGpHAUqHaBPjNyc",
    authDomain: "first-firebase-project-e9587.firebaseapp.com",
    projectId: "first-firebase-project-e9587",
    storageBucket: "first-firebase-project-e9587.appspot.com",
    messagingSenderId: "699548796696",
    appId: "1:699548796696:web:48ea9a854ac36c9c0b406d"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const database = getFirestore(app)