import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: "crwn-clothing-db-b59a0.firebaseapp.com",
  projectId: "crwn-clothing-db-b59a0",
  storageBucket: "crwn-clothing-db-b59a0.appspot.com",
  messagingSenderId: "711358791340",
  appId: "1:711358791340:web:6f182776a64d44ca9ca909",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Initialize Profvider
const googleProvider = new GoogleAuthProvider();

//!mengunakan new karena itu kelas yang di mana nanti nya banyak dan akan berbeda

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additonalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "user", userAuth.uid);
  console.log(userAuth);
  //* userSnapshot untuk cek apa ada cek apakah ada instance yang ada
  //* dan membebuat kita bisa akses data

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());
  //* untuk membuat/mengambil user document

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additonalInformation,
      });
    } catch (error) {
      console.log("error create the user", error.message);
    }
  }

  //* if user data does not exist
  //* create / set the document with the data from userAuth in my collection

  //* if user data exist
  //* just return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  //*jika tidak ada email dan password jangan run function
  if (!email || !password) return;
  //*jika ada
  return await createUserWithEmailAndPassword(auth, email, password);
};
