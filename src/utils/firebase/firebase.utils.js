import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCs01wwVacn12BLSyCdQcmwPGGKS2fEM9U",
  authDomain: "crwn-clothing-db-739ee.firebaseapp.com",
  projectId: "crwn-clothing-db-739ee",
  storageBucket: "crwn-clothing-db-739ee.appspot.com",
  messagingSenderId: "779332703329",
  appId: "1:779332703329:web:37d2ce42bdffc375f68620"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userDocRef;
};
