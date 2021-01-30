import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAwuoyUKfLh3Nj_3ESEtYb56yGxDXTg0So",
    authDomain: "dotslash-4-project.firebaseapp.com",
    projectId: "dotslash-4-project",
    storageBucket: "dotslash-4-project.appspot.com",
    messagingSenderId: "620325030691",
    appId: "1:620325030691:web:1493915082f41250909a96",
    measurementId: "G-LCC636M96N"
});

export const auth = app.auth();
export const db = app.firestore();
export default app;
