import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore} from 'firebase/firestore/lite';

import SwipeList from "./SwipeList";
import '../css/SearchSwipe.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const db = getFirestore();

function SearchSwipe() {
  const [swipes, setSwipes] = useState([]);
  const [display, setDisplay] = useState([]);

  const [requests, setRequests] = useState({
    diningHallLocation: "all",
    period: "all",
  });

  useEffect(() => {
    const fetchSwipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "BuySwipe"));
        querySnapshot.forEach((doc) => {
          setSwipes(swipes => [...swipes, doc.data()]);
        });
        setDisplay([...swipes]);
      } catch (e) {
        console.log(e);
      } 
    }
    fetchSwipes();
  }, []);

  const reload = (event) => {
    event.preventDefault();

    let newDisplay = swipes;
    if (requests.diningHallLocation === "all" && requests.period === "all") {

    }
    else if (requests.diningHallLocation !== "all" && requests.period !== "all") {
      newDisplay = swipes.filter(item => {
        return (
          item.diningHallLocation === requests.diningHallLocation &&
          item.mealPeriod === requests.period
        )
      });
    } else if (requests.diningHallLocation !== "all") {
      newDisplay = swipes.filter(item => {
        return (
          item.diningHallLocation === requests.diningHallLocation
        )
      });
    } else if (requests.mealPeriod !== "all"){
      newDisplay = swipes.filter(item => {
        return (
          item.mealPeriod === requests.period
        )
      });
    }
    setDisplay(newDisplay);
  };

  const handleDiningChange = (event) => {
    // event.preventDefault();
    setRequests((requests) => ({
      ...requests,
      diningHallLocation: event.target.value,
    }));
  };

  const handlePeriodChange = (event) => {
    // event.preventDefault();
    setRequests((requests) => ({
      ...requests,
      period: event.target.value,
    }));
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-2 sidebar">
          <p>Sort By:</p>
          <form onSubmit={reload}>
            <label>
              Dining Hall:
              <select value={requests.diningHall} onChange={(e) => handleDiningChange(e)}>
                <option value="all">All</option>
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
                <option value="all">All</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </label>

            <input type="submit" value="Submit" />
          </form>
        </div>
        <SwipeList swipes={display} className="row"/>
      </div>
      
    </div>
    
  );
};

export default SearchSwipe;