import React from "react";
import pic from "./../images/Ee36c0VUEAU-_sZ.jpeg"


function Home() {
  return (
	
    <div className="home">
		  
      <div class="container">
        <div class="row align-items-center my-5" >
          <div class="col-lg-7">
		  <img src={pic}/>
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Swipe Swap</h1>
			<div class="homepara">
				<p>
			  Gain access to UCLA’s diverse dining options in a few clicks. Swipe swap is an easy way to share meal swipes between on & off campus students.
				</p>
			</div>
          </div>
        </div>
      </div>
		  <div class="after">
				
		  </div>
		  <div class="bottom">
				
		  </div>
    </div>
	
  );
}

export default Home;
