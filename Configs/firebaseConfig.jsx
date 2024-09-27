// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkgYaOUl3DGLuYJHcxXLBaZW2vwu5dg0M",
  authDomain: "dummy-ea6a3.firebaseapp.com",
  databaseURL: "https://dummy-ea6a3-default-rtdb.firebaseio.com",
  projectId: "dummy-ea6a3",
  storageBucket: "dummy-ea6a3.appspot.com",
  messagingSenderId: "492204332902",
  appId: "1:492204332902:web:4b8f64ca73ae2b44ff5aa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage=getStorage(app)