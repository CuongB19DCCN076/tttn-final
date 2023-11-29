import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1sJBf_o_j076MBGYsI-BK9Ka-8rgQu1A",
  authDomain: "ecommerce-mern-2d22f.firebaseapp.com",
  projectId: "ecommerce-mern-2d22f",
  storageBucket: "ecommerce-mern-2d22f.appspot.com",
  messagingSenderId: "1092547851439",
  appId: "1:1092547851439:web:62b3933b5dd80d536a105a",
  measurementId: "G-3G673Z0J2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);