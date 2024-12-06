// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyADDPe1KophxFRSUlNFX4PKtaZA9yRPaZQ",  //
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "farman-e-ali",   //
    storageBucket: "farman-e-ali.firebasestorage.app",  //
    messagingSenderId: "1039319825741",          
    appId: "1:1039319825741:android:10a79062bed384f65a4b04",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
