
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBm4doekL9W3Jr9jpblTacyzBm35aJMC4g",
    authDomain: "nitropay-f1182.firebaseapp.com",
    projectId: "nitropay-f1182",
    storageBucket: "nitropay-f1182.appspot.com",
    messagingSenderId: "549275767693",
    appId: "1:549275767693:web:4b344eb7432c728e8363c4",
    measurementId: "G-ZNW4K9JETN"
};


const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)