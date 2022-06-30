import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider();

//!mengunakan new karena itu kelas yang di mana nanti nya banyak dan akan berbeda

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "user", userAuth.uid);
  console.log(userAuth);
  //! userSnapshot untuk cek apa ada cek apakah ada instance yang ada
  //!dan membebuat kita bisa akses data
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());
  //!untuk membuat/mengambil user document

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error create the user", error.message);
    }
  }

  return userDocRef;
  //* if user data does not exist
  //* create / set the document with the data from userAuth in my collection

  //* if user data exist
  //* just return userDocRef
};
