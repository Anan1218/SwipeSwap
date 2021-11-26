import React, { useEffect, useState } from "react";
// import RequestsService from 'src/services/RequestsService.js'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjXYqwNdwAb3Z-4yHuozlRB30sKvFc4b0",
  authDomain: "swipeswap-ec1f0.firebaseapp.com",
  projectId: "swipeswap-ec1f0",
  storageBucket: "swipeswap-ec1f0.appspot.com",
  messagingSenderId: "594857878325",
  appId: "1:594857878325:web:7705ac4eee924e73cce27c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addRequest() {

}

function RequestSwipe() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <p>Request Swipe</p>
    </div>
  );
};

export default RequestSwipe;