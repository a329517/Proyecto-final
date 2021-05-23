import firebase from 'firebase/app'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBeO9x6NfDg9ElgqiR7Tb5F-L8sLP86-yo",
    authDomain: "vue-todo-2021-504cf.firebaseapp.com",
    projectId: "vue-todo-2021-504cf",
    storageBucket: "vue-todo-2021-504cf.appspot.com",
    messagingSenderId: "884430668321",
    appId: "1:884430668321:web:75fb5f7d4d73e05fa21960"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()