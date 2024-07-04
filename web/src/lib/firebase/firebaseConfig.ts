// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUuUPUUadgr7KshYPNCZu1oZQp4_NYPkQ",
  authDomain: "expb-4e9bc.firebaseapp.com",
  databaseURL: "https://expb-4e9bc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expb-4e9bc",
  storageBucket: "expb-4e9bc.appspot.com",
  messagingSenderId: "565082489230",
  appId: "1:565082489230:web:2af8be7f7335b7284aa4df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const database = getDatabase(app);

export { database };
export const initializeFirebaseApp = () =>
  !getApps().length ? initializeApp(firebaseConfig) : getApp()