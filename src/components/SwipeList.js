import React, { useEffect, useState } from "react";

import { db } from "../services/Firebase";
import { getFirestore, collection, getDocs} from 'firebase/firestore/lite';

function SwipeList(props) {
  const [swipes, setSwipes] = useState([]);

  useEffect(() => {
    // console.log(props.swipes);
    setSwipes(props.swipes);
  }, [props]);

  return (
    <div>
      {swipes.map((swipe) => (
        <div>
          <p>{swipe.diningHallLocation}</p>
          {/* <p>{swipe.date}</p> */}
          <p>{swipe.mealPeriod}</p>
          {/* <p>{swipe.requestCreated}</p> */}
        </div>
      ))}
    </div>
  );
};

export default SwipeList;