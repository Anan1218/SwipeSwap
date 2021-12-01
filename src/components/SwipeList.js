import React, { useEffect, useState } from "react";

function SwipeList(props) {
  const [swipes, setSwipes] = useState([]);

  useEffect(() => {
    // console.log(props.swipes);
    setSwipes(props.swipes);
  }, [props]);

  return (
    <div>
      <p>Swipe List:</p>
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