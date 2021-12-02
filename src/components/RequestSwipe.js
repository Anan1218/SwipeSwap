import React, { useEffect, useState } from "react";
// import RequestsService from 'src/services/RequestsService.js'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from '../images/logo.png';
import { getSignedInUser } from "../services/Firebase";
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore/lite';
function RequestSwipe() {
  const db = getFirestore();
  const [requests, setRequests] = useState({
    diningHall: "epic",
    period: "breakfast",
  });

  const [date, setDate] = useState(null);

  useEffect(() => {

  }, []);

  const submitRequest = async () => {
    if (!date) {
      alert("Please enter a date");
      return;
    }
    // console.log(requests);
    // console.log(startDate);
    let data = {
      date: date,
      id: "",
      diningHallLocation: requests.diningHall,
      mealPeriod: requests.period,
      requestCreated: new Date(),
      userId: "",
    };
    console.log(data);
    const user = getSignedInUser();
    var docRef = doc(collection(db, "SellSwipe"));;
    if (user) {
      data.userId = user.uid;
      data.id = docRef.id;
      await setDoc(docRef, { ...data });
    }
  };

  const handleTypeChange = (event) => {
    setRequests((requests) => ({
      ...requests,
      type: event.target.value
    }));
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
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="row mainBackground">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        <div className="d-flex justify-content-center" style={{ padding: "10px" }}>
          <img src={logo} height="50"></img>
        </div>
        <div className="card cardshadow">
          <div class="card-header">Sell Swipes!</div>
          <div style={{ padding: "20px" }}>
            <div className="mb-3">
              <label className="form-label">Dining Hall:</label>
              <select className="form-select" value={requests.diningHall} onChange={(e) => handleDiningChange(e)}>
                <option value="epic">Epicuria/Covel</option>
                <option value="deneve">De Neve</option>
                <option value="bplate">Bruin Plate</option>
                <option value="feast">Feast</option>
                <option value="rende">Rendezvous</option>
                <option value="study">The Study</option>
                <option value="cafe">Bruin Cafe</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Meal Period:</label>
              <select className="form-select" value={requests.period} onChange={(e) => handlePeriodChange(e)}>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            <div className="mb-3">
              <label name="form-label">Date:</label>
              <input type="date" className="form-control" onChange={(e) => handleDateChange(e)}></input>
            </div>
            <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-primary" onClick={() => submitRequest()}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div >
  );
};

export default RequestSwipe;