import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc, getFirestore, deleteDoc, doc, setDoc} from 'firebase/firestore/lite';

import { getSignedInUser } from "../services/Firebase";

import Navbar from './Navbar';
import SwipeList from "./SwipeList";
import '../css/SearchSwipe.css';
import '../App.css';

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
        const querySnapshot = await getDocs(collection(db, "SellSwipe"));
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
      const ref = doc(db, "SellSwipe", swipeID);
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
      await deleteDoc(doc(db, "SellSwipe", swipeID));

      //refresh
      try {
        const querySnapshot = await getDocs(collection(db, "SellSwipe"));
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
      <Navbar />
      <div className="mainBackground higher">
        <div class = "row">
          <div class = "col-md-3"></div>
            <div class = "col-md-6">
            <div className="card">
              <div className="row searchContainer">
                <div className="sidebar">
                  <h3>Filter:</h3>
                  <form onSubmit={reload}>
                    <label className = "diningHall">
                      <h5>Dining Hall:</h5>
                      <select value={requests.diningHall} onChange={(e) => handleDiningChange(e)}>
                        <option value="all">All</option>
                        <option value="Epicuria">Epicuria/Covel</option>
                        <option value="De Neve">De Neve</option>
                        <option value="Bruin Plate">Bruin Plate</option>
                        <option value="Feast">Feast</option>
                        <option value="Rendezvous">Rendezvous</option>
                        <option value="The Study">The Study</option>
                        <option value="Bruin Cafe">Bruin Cafe</option>
                      </select>
                    </label>
                    <label className = "mealPeriod">
                      <h5>Meal Period:</h5>
                      <select value={requests.period} onChange={(e) => handlePeriodChange(e)}>
                        <option value="all">All</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                      </select>
                    </label>

                    <input type="submit" value="Submit" />
                  </form>
                </div>
                <div className="row swipeList">
                  <SwipeList swipes={display} takeSwipe={takeSwipe}/>
                </div>
              </div>
            </div>
          </div>
          <div class = "col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchSwipe;