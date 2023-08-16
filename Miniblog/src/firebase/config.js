import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
 
const firebaseConfig = {
  apiKey: "AIzaSyAfp2FAQUCz4jAfbxJyyZsBPTkRQmnzauI",
  authDomain: "miniblog-a0dce.firebaseapp.com",
  projectId: "miniblog-a0dce",
  storageBucket: "miniblog-a0dce.appspot.com",
  messagingSenderId: "968001035020",
  appId: "1:968001035020:web:1f37a7321f72b68ac18729",
  measurementId: "G-B46JDVFVP1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)

export { db }