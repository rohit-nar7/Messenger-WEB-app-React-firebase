import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyCf0AvpDnIogWUJI3SfFZpnGPwEk8yqQEA",
    authDomain: "messenger-b7fb8.firebaseapp.com",
    projectId: "messenger-b7fb8",
    storageBucket: "messenger-b7fb8.appspot.com",
    messagingSenderId: "27631398901",
    appId: "1:27631398901:web:350f7531c3a48713e1babc"
  }).auth();