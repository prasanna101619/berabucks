
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyC3EPopzoobbwyYlKkq71lQmuouYPjeLVg",
  authDomain: "berabucks-71ead.firebaseapp.com",
  projectId: "berabucks-71ead",
  storageBucket: "berabucks-71ead.appspot.com",
  messagingSenderId: "626628372457",
  appId: "1:626628372457:web:4c0cfbecdc7423aede8d78",
  measurementId: "G-60CTPT9GY0"
};


const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)
