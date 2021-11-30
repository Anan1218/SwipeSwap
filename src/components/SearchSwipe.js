import React, { useEffect, useState } from "react";

import { db } from "../services/Firebase";
import { getFirestore, collection, getDocs} from 'firebase/firestore/lite';

import SwipeList from "./SwipeList";

function SearchSwipe() {
  const [swipes, setSwipes] = useState([]);

  useEffect(() => {
    const fetchSwipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "BuySwipe"));
        querySnapshot.forEach((doc) => {
          setSwipes(requests => [...requests, doc.data()]);
        });
        // console.log(swipes);
      } catch (e) {
        console.log(e);
      } 
    }
    fetchSwipes();
  }, []);
  return (
    <div>
      <SwipeList swipes={swipes}/>
    </div>
  );
};

export default SearchSwipe;