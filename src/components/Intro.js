import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./Intro.css";
const Intro = () => {
  return (
    <div className="introDiv">
      <br />
      <Jumbotron className="jumbo">
        <h1>Hi, welcome to the Shoppies!</h1>
        <p className="description">
          Start typing in the search bar to find movies to nominate. Click on a
          movie to see further details or click the Nominate button to add the
          movie to your nomination list.
        </p>
      </Jumbotron>
    </div>
  );
};
export default Intro;
