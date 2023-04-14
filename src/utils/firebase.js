import { initializeApp } from "firebase/app";
import {
    getFirestore, 
    getDocs, 
    getDoc,
    doc, 
    setDoc, 
    updateDoc, 
    deleteDoc, 
    collection,
    onSnapshot 
} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
    measurementId: import.meta.env.PUBLIC_FIREBASE_MESUREMENT_ID
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Firestore
export const createDocRef = (collectionId, docPath, converter = null) => {
    const ref = doc(firestore, collectionId, docPath);
    if (!converter) return ref;
    return ref.withConverter(converter);
}
export const firestore = getFirestore(app);
export const getCollection = async (collectionId) => {
    const snapshot = await getDocs(getCollectionRef(collectionId));
    return snapshot;
}

export const getCollectionRef = (collectionId) => collection(firestore, collectionId);
 
export const getDocument = async (collectionId, docPath, converter) => {
    const docInfo = createDocRef(collectionId, docPath, converter);
    const docSnap = await getDoc(docInfo);
    if (docSnap.exists())
        return docSnap.data();
    return null;
}
export const setDocument = async (collectionId, docPath, docData, converter = null, options = {}) => {
    let docInfo = createDocRef(collectionId, docPath, converter);
    return await setDoc(docInfo, docData, options);
}
export const addDocument = async (collectionPath, docData, converter = null) => {
    const collectionRef = collection(firestore, collectionPath);
    const docRef = converter ? doc(collectionRef).withConverter(converter) : doc(collectionRef);
    return await setDoc(docRef, docData).then(() => docRef);
}
export const updateDocument = async (collectionId, docPath, docFieldUpdate, converter = null) => {
    let docInfo = createDocRef(collectionId, docPath, converter);
    return await updateDoc(docInfo, docFieldUpdate);
}
export const deleteDocument = async (collectionId, docPath) => {
    let docInfo = createDocRef(collectionId, docPath);
    return await deleteDoc(docInfo);
}
export const onDocumentUpdate = (collectionId, docPath, callback, converter = null) => {
    let docInfo = createDocRef(collectionId, docPath, converter);
    return onSnapshot(docInfo, callback);
}

// Auth
export const auth = getAuth(app);
export const getCurrentUser = () => auth.currentUser;
export const googleProvider = new GoogleAuthProvider();
auth.useDeviceLanguage();