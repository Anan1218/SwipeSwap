import React, { useEffect, useState } from "react";

import { collection, getDocs, getFirestore} from 'firebase/firestore/lite';

import SwipeList from "./SwipeList";

const db = getFirestore();

function SearchSwipe() {
  const [swipes, setSwipes] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "BuySwipe"));
        querySnapshot.forEach((doc) => {
          setSwipes(swipes => [...swipes, doc.data()]);
        });
      } catch (e) {
        console.log(e);
      } 
    }
    fetchRequests();
  }, []);
  return (
    <div>
      <SwipeList swipes={swipes}/>
    </div>
  );
};

export default SearchSwipe;