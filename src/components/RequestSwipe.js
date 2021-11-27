import React, { useEffect, useState } from "react";
// import RequestsService from 'src/services/RequestsService.js'

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

function RequestSwipe() {
  const [requests, setRequests] = useState({
    diningHall: "",
    period: "",
  });

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    
  }, []);


  const submitRequest = (event) => {
    event.preventDefault();

    console.log(requests);
    console.log(startDate);
  };

  const handleDiningChange = (event) => {
    setRequests((requests) => ({
      ...requests,
      diningHall: event.target.value,
    }));
  };

  const handlePeriodChange = (event) => {
    setRequests((requests) => ({
      ...requests,
      period: event.target.value,
    }));
  };

  return (
    <div>
      <p>Request Swipe</p>
    
      <form onSubmit={submitRequest}>
        <label>
          Dining Hall:
          <select value={requests.diningHall} onChange={(e) => handleDiningChange(e)}>
            <option value="epic">Epicuria/Covel</option>
            <option value="deneve">De Neve</option>
            <option value="bplate">Bruin Plate</option>
            <option value="feast">Feast</option>
            <option value="rende">Rendezvous</option>
            <option value="study">The Study</option>
            <option value="cafe">Bruin Cafe</option>
          </select>
        </label>
        <label>
          Meal Period:
          <select value={requests.period} onChange={(e) => handlePeriodChange(e)}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </label>

        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default RequestSwipe;