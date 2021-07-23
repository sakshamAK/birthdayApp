import React, { Fragment, useState } from "react";

const Palindrome = () => {
    const [yourDate, setDate] = useState("");
    const [dateDifference, setDateDifference] = useState("");
    const [message, setMessage] = useState("");
    const [source, setSource] = useState("joy.svg");
    document.body.style.background = "#F0F9FF";
    function resultAnnounce(e) {
        e.preventDefault();
        let dateSplit = yourDate.split("-");
        let dateString = dateSplit[2] + dateSplit[1] + dateSplit[0];
        let dateNum = parseInt(dateString);
        let revDate = 0, revYear = 0;
        for(let num = dateNum; num > 0; num = Math.trunc(num/10)) {
            revDate = (revDate*10) + (num%10);
        }
        if(dateNum%10 === 0) {
            revDate = revDate*10;
        }
        if(dateNum == revDate) {
            setSource("joy.svg");
            setMessage("Congrats! Your Birthdate is a palindrome");
        } else {
            setSource("nextTime.svg");
            setMessage("Your Birthdate is not a palindrome");
            for(let i = dateSplit[0]; i > 0; i = Math.trunc(i/10)) {
                revYear = (revYear*10) + (i%10);
            }
            // DateMonth = Math.abs(revYear - parseInt(dateSplit[2]+dateSplit[1]));
            let totalDaysByMonths = Math.abs(Math.trunc((Math.trunc(revYear%100) - parseInt(dateSplit[1])) * 30.436875));
            let totalDaysInMonth = Math.abs(dateSplit[2] - Math.trunc(Math.trunc(revYear/100)));
            let totalDays = totalDaysInMonth + totalDaysByMonths;
            setDateDifference(`Awww! You are ${totalDays} days away from a palindrome birthday.`)


            // console.log('Days By Months ' + totalDaysByMonths, '\n days in month ' + totalDaysInMonth, '\n total days ' + totalDays);
            
        }
    }
    return (
        <Fragment>
            <div className="circle" style = {{
                boxShadow: "0px 20px 150px #0C4A6E",
                background: "#0284C7"
            }}></div>
            <div
                className="outer-box"
                style={{
                    fontFamily: "sans-serif",
                    textAlign: "center",
                    boxShadow: "0px 20px 150px #0C4A6E",
                    background: "#F0F9FF"
                }}
            >
                {/* <div className = "btn-primary palin"><a href = "/palindrome"><span>Palindrome Birthday</span></a></div> */}
                <div className="content-box">
                    <h1 className="palin-text">You got a Palindrome Birthday?</h1>
                    <br />
                    <ol>
                        <li>Enter your birth date in first field.</li>
                        <li>Find out if your birthday is a Palindrome or not.</li>
                    </ol>
                    <form onSubmit={(e) => resultAnnounce(e)}>
                        <input
                            type="date"
                            className="date-picker"
                            onInput={(item) => setDate(item.target.value)}
                        />
                        <input type = "submit" value = "Check"/>
                    </form>
                    <strong className = "set-message">{message}</strong> <br />
                    <strong className = "set-message">{dateDifference}</strong>
                </div>
                <img src={source} alt="congo/oops" />
                <aside>
                    Created by <a href="https://sakshamak.netlify.app/">Saksham</a> <br />
                    <a href="https://www.instagram.com/sakshamak/?igshid=3fwihg3dq3y9">
                        <img className="instagram" src="instagram.svg" />
                    </a>
                    <a href="https://www.linkedin.com/in/saksham-ak-55b9131b3/">
                        <img className="linkedin" src="linkedin.svg" />
                    </a>
                    <a href="https://twitter.com/Saksham_ka">
                        <img className="twitter" src="twitter.svg" />
                    </a>
                    <a href="https://github.com/sakshamAK">
                        <img className="git" src="github.svg" />
                    </a>
                </aside>
            </div>
        </Fragment>
    );
};

export default Palindrome;
