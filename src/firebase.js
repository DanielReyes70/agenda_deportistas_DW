
import firebase from "firebase/app";
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBezjROjDHaJkIKGOxhglnHGJJdSKWLPK4",
  authDomain: "agenda-deportistas-dw.firebaseapp.com",
  projectId: "agenda-deportistas-dw",
  storageBucket: "agenda-deportistas-dw.appspot.com",
  messagingSenderId: "503222898379",
  appId: "1:503222898379:web:ec6106badeaf48b5a3554e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export{firebase}