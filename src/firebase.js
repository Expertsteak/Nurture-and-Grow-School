import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBX-OY6FVjQfhJw5kmtMrPuxZzF8iC3lY8",
  authDomain: "ngps-7ce2f.firebaseapp.com",
  projectId: "ngps-7ce2f",
  storageBucket: "ngps-7ce2f.firebasestorage.app",
  messagingSenderId: "264339725259",
  appId: "1:264339725259:web:a3bdd42f730617e6dbb44e"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);