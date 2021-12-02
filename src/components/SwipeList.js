import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
function SwipeList(props) {
  const [swipes, setSwipes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(props.swipes);
    setSwipes(props.swipes);
  }, [props]);

  const handleClick = (swipe) => {
    console.log(swipe);
    // console.log(event.target.value);
    props.takeSwipe(swipe.id);
    console.log(swipe.userId);
    navigate(`/userProfile/${swipe.userId}`);
  };
  return (
    <div className="col">
      <h3>Swipe List:</h3>
      {swipes.map((swipe, i) => (
        <div key={i}>
          <div class="card w-100">
            <div class="card-body">
              <h5 class="card-title">{swipe.diningHallLocation}</h5>
              <p class="card-text">{swipe.mealPeriod}</p>
              <button value={swipe.id} className="btn btn-primary" onClick={() => handleClick(swipe)}>Take Swipe</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwipeList;