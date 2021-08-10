import React, { useState } from "react";
import "./styles.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Palindrome from './Palindrome';

export default function App() {
  const [source, setSource] = useState("happy.svg");
  const [yourDate, setDate] = useState("");
  const [showDisplay, setDisplay] = useState("block");
  const [message, setMessage] = useState("");

  function toggleDisplay() {
    setDisplay("none");
  }

  function resultAnnounce(event) {
    let dateSplit = yourDate.split("-");
    let day = parseInt(dateSplit[1]);
    let month = parseInt(dateSplit[2]);
    let year = parseInt(dateSplit[0]);
    let dateSum = day + month + year;
    let luck = event.target.value;
    if (dateSum % luck === 0) {
      setSource("happy.svg");
      setMessage("Congrats!! Your birthdate is lucky.");
    } else {
      setSource("sad.svg");
      setMessage("Better luck next birth :P");
    }
  }
  return (
    <Router>
      <Switch>
        <Route exact path = "/">
          <div className="App">
            <div className="circle"></div>
            <div className="outer-box">
              <div className = "btn-primary palin"><Link to = "/palindrome"><span>Click to visit Palindrome Birthday App</span></Link></div>
              <div className="content-box">
                <h1>Is your birthday lucky?</h1>
                <strong className="disclaimer">
                  (Don't worry its just an fun app.)
                </strong>

                <br />
                <ol>
                  <li>Enter your birth date in first field.</li>
                  <li>Enter your lucky number in the second field.</li>
                  <li>Find out if your birthday is lucky or not.</li>
                </ol>
                <input
                  type="date"
                  className="date-picker"
                  onInput={(item) => setDate(item.target.value)}
                />
                <input
                  type="number"
                  id="lucky-number"
                  onChange={(event) => resultAnnounce(event)}
                />
                <strong>{message}</strong>
              </div>
              <img src={source} alt="congo/oops" />
              <aside>
                Created by <a href="https://sakshamak.netlify.app/">Saksham</a> <br />
                <a href="https://www.instagram.com/sakshamak/?igshid=3fwihg3dq3y9">
                  <img alt = "instagram" className="instagram" src="instagram.svg" />
                </a>
                <a href="https://www.linkedin.com/in/saksham-ak-55b9131b3/">
                  <img alt = "linkedIn" className="linkedin" src="linkedin.svg" />
                </a>
                <a href="https://twitter.com/Saksham_ka">
                  <img alt = "twitter" className="twitter" src="twitter.svg" />
                </a>
                <a href="https://github.com/sakshamAK">
                  <img alt = "github" className="git" src="github.svg" />
                </a>
              </aside>
            </div>
            <div
              className="cookies"
              style={{
                display: showDisplay
              }}
            >
              This website do not use cookies to store data. The data entered by user
              is not saved anywhere.
              <button
                className = "btn-primary"
                onClick={toggleDisplay}
              >
                Accept
              </button>
            </div>
          </div>
          </Route>
          <Route path = "/palindrome">
            <Palindrome />
          </Route>
        </Switch>
    </Router>
  );
}
