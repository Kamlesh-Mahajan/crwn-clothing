import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCs01wwVacn12BLSyCdQcmwPGGKS2fEM9U",
  authDomain: "crwn-clothing-db-739ee.firebaseapp.com",
  projectId: "crwn-clothing-db-739ee",
  storageBucket: "crwn-clothing-db-739ee.appspot.com",
  messagingSenderId: "779332703329",
  appId: "1:779332703329:web:37d2ce42bdffc375f68620"
};

const firebaseApp = initializeApp(firebaseConfig);

//* This function is used to get the google authentication provider
const googleProvider = new GoogleAuthProvider();

//* This function is used to set the custom parameters for the google provider
googleProvider.setCustomParameters({
  prompt: "select_account"
});

//* This function is used to get the authentication object
export const auth = getAuth();

//* This function is used to sign in with google popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//* This function is used to get the firestore database object
export const db = getFirestore();

//* This function is used to add collections and documents to the firestore database
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const bacth = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    bacth.set(docRef, object);
  });

  await bacth.commit();
  console.log("Collection added successfully");
};

//* This function is used to get the collections from the firestore database
export const getCategoriesAndDocuments = async () => {
  const categoriesRef = collection(db, "categories");
  const q = query(categoriesRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

//* This function is used to convert the snapshot object to an array
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userDocRef;
};

//* This function is used to create a new user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

//* This function is used to sign in an existing user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//* This function is used to sign out a user
export const signOutUser = async () => await signOut(auth);

//* This function is used to listen to the authentication state of the user
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
