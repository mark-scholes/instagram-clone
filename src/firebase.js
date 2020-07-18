import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAklhwrhFUOGNjlzsNBHgtgJ0EsF7dY4Bg",
  authDomain: "instagram-clone-a8dd8.firebaseapp.com",
  databaseURL: "https://instagram-clone-a8dd8.firebaseio.com",
  projectId: "instagram-clone-a8dd8",
  storageBucket: "instagram-clone-a8dd8.appspot.com",
  messagingSenderId: "426478421838",
  appId: "1:426478421838:web:a1200b7513f39727bec01f",
  measurementId: "G-DT6VVMNJJP",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
