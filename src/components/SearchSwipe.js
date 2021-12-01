import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc, getFirestore, where, deleteDoc, doc, setDoc} from 'firebase/firestore/lite';

import { getSignedInUser } from "../services/Firebase";

import SwipeList from "./SwipeList";
import '../css/SearchSwipe.css';

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
        setDisplay(swipes);
      } catch (e) {
        console.log(e);
      } 
    }
    fetchSwipes();
  }, []);


  const takeSwipe = async (swipeID) => {
    console.log(swipeID);
    try {
      const user =  getSignedInUser();

      //find the swipe in BuySwipe
      const ref = doc(db, "BuySwipe", swipeID);
      const docSnap = await getDoc(ref);
      const swipe = docSnap.data();
      console.log(docSnap.data())
      //add the swipe to TakenSwipes

      let data = {
        date: swipe.date,
        id: "",
        diningHallLocation: swipe.diningHallLocation,
        mealPeriod: swipe.mealPeriod,
        requestCreated: swipe.requestCreated,
        userId: "",
      };

      var docRef = doc(collection(db, "TakenSwipes"));
      data.userId = user.uid;
      data.id = docRef.id;

      await setDoc(docRef, { ...data });

      //remove the swipe in BuySwipe
      await deleteDoc(doc(db, "BuySwipe", swipeID));

      //refresh
      try {
        const querySnapshot = await getDocs(collection(db, "BuySwipe"));
        querySnapshot.forEach((doc) => {
          setSwipes(swipes => [...swipes, doc.data()]);
        });
      } catch (e) {
        console.log(e);
      }
      setDisplay(display => display.filter((item,index) => item.id !== swipeID));
    } catch (e) {
      console.log(e);
    } 

  }

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
        <SwipeList swipes={display} takeSwipe={takeSwipe} className="row"/>
      </div>
      
    </div>
    
  );
};

export default SearchSwipe;