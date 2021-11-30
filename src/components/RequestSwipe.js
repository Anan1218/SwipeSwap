import React, { useEffect, useState } from "react";
// import RequestsService from 'src/services/RequestsService.js'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { firebase } from "../services/Firebase";
import { getFirestore, collection, addDoc, setDoc, doc} from 'firebase/firestore/lite';

const db = getFirestore(firebase);

function RequestSwipe() {
  const [requests, setRequests] = useState({
    diningHall: "epic",
    period: "breakfast",
  });

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {

  }, []);


  const submitRequest = async (event) => {
    event.preventDefault();
    // console.log(requests);
    // console.log(startDate);
    let data = {
      date: startDate,
      id: "",
      diningHallLocation: requests.diningHall,
      mealPeriod: requests.period,
      requestCreated: new Date(),
      userId: "", 
    };

    try {
      const docRef = doc(collection(db, "BuySwipe"))
      data.id = docRef.id
      await setDoc(docRef, {...data})
      // await addDoc(collection(db, "buySwipe"), data);
    } catch (e) {
      console.log(e)
      console.log("error");
    }
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