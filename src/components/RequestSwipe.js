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
    diningHall: "Epicuria",
    period: "Breakfast",
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
                <option value="Epicuria">Epicuria/Covel</option>
                <option value="De Neve">De Neve</option>
                <option value="Bruin Plate">Bruin Plate</option>
                <option value="Feast">Feast</option>
                <option value="Rendevous">Rendezvous</option>
                <option value="The Study">The Study</option>
                <option value="Bruin Cafe">Bruin Cafe</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Meal Period:</label>
              <select className="form-select" value={requests.period} onChange={(e) => handlePeriodChange(e)}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
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