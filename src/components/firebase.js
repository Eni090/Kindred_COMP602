import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiQVO7eHPBPN-76t-kpbBF933zmFEve5A",
  authDomain: "kindred-comp602.firebaseapp.com",
  projectId: "kindred-comp602",
  storageBucket: "kindred-comp602.appspot.com",
  messagingSenderId: "519699364094",
  appId: "1:519699364094:web:c79cd6ff358ce565bd4daf",
  measurementId: "G-ETPHW3SMV8",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);

export default app;
