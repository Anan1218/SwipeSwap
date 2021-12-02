import React, { useState } from 'react';
import { db } from '../services/Firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import googleSignInImage from '../images/googleSignIn.png';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
function SignIn() {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    function googleAuth() {
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            initUser(user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
    async function initUser(user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            navigate("/main");
        } else {
            await addUser(user);
            navigate("/main");
        }
    }
    async function addUser(user) {
        const data = user.providerData[0];
        console.log(data);
        const userData = {
            "id": user.uid,
            "email": data.email,
            "displayName": data.displayName,
            "phoneNumber": data.phoneNumber,
            "photoUrl": data.photoURL,
            "swipeListings": [],
            "swipeRequests": [],
        };
        const ref = doc(db, "Users", user.uid);
        setDoc(ref, { ...userData });
    }
    return (
        <div>
            <button onClick={googleAuth} className="btn btn-success" type="button">
                <p>Sign in</p>
            </button>

        </div>
    );
}
export default SignIn;