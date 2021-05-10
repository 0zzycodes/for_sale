import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcyvzENTQ4ivHN44v1BfC-YE8HniT0Sag",
  authDomain: "store-test2021.firebaseapp.com",
  projectId: "store-test2021",
  storageBucket: "store-test2021.appspot.com",
  messagingSenderId: "28238260207",
  appId: "1:28238260207:web:0e452fd601905021a0f81a",
  measurementId: "G-H2P79HRSX9",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
