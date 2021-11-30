// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjXYqwNdwAb3Z-4yHuozlRB30sKvFc4b0",
    authDomain: "swipeswap-ec1f0.firebaseapp.com",
    projectId: "swipeswap-ec1f0",
    storageBucket: "swipeswap-ec1f0.appspot.com",
    messagingSenderId: "594857878325",
    appId: "1:594857878325:web:7705ac4eee924e73cce27c"
};
const firebaseApp = initializeApp(firebaseConfig);
export function getSignedInUser() {
    const auth = getAuth();
    const user = auth.currentUser;
    return user;
}
export function isAuthenticated() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        return true;
    } else {
        return false;
    }
}
// Initialize Firebase
export const db = getFirestore();
