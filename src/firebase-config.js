// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIoH__5b7o_0K1RVG_t8YDqfGCKb0VuRw",
  authDomain: "pingyapp5.firebaseapp.com",
  projectId: "pingyapp5",
  storageBucket: "pingyapp5.appspot.com",
  messagingSenderId: "655366887244",
  appId: "1:655366887244:web:e72a176851fe7f533b61e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();