import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCXqt0MUelbT7OhFBIgOMvBU3xxk9J-zwE",
    authDomain: "prodwiz-123.firebaseapp.com",
    projectId: "prodwiz-123",
    storageBucket: "prodwiz-123.firebasestorage.app",
    messagingSenderId: "761389419820",
    appId: "1:761389419820:web:3141962962425717e1f089",
    measurementId: "G-GNKCMMR9B3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);