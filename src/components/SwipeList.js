import React, { useEffect, useState } from "react";

function SwipeList(props) {
  const [swipes, setSwipes] = useState([]);

  useEffect(() => {
    // console.log(props.swipes);
    setSwipes(props.swipes);
  }, [props]);

  const handleClick = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    props.takeSwipe(event.target.value);
  };
  return (
    <div className="col">
      <p>Swipe List:</p>
      {swipes.map((swipe, i) => (
        <div key={i}>
          <div class="card w-75">
            <div class="card-body">
              <h5 class="card-title">{swipe.diningHallLocation}</h5>
              <p class="card-text">{swipe.mealPeriod}</p>
              <button value={swipe.id} className="btn btn-primary" onClick={handleClick}>Take Swipe</button>
            </div>
          </div>
          {/* <p>{swipe.diningHallLocation}</p> */}
          {/* <p>{swipe.date}</p> */}
          {/* <p>{swipe.mealPeriod}</p> */}
          {/* <p>{swipe.requestCreated}</p> */}
        </div>
      ))}
    </div>
  );
};

export default SwipeList;