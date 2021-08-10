import React, { Fragment, useState } from "react";

const Palindrome = () => {
    const [toggleDisplay, setDisplay] = useState("none");
    const [yourDate, setDate] = useState("");
    const [dateDifference, setDateDifference] = useState("");
    const [palindromeDate, setPalindromeDate] = useState("");
    const [message, setMessage] = useState("");
    const [source, setSource] = useState("joy.svg");
    document.body.style.background = "#F0F9FF";

    const reverseStr = (str) => {
        return str.split("").reverse().join("");
    };

    const isPalindrome = (str) => {
        let reverse = reverseStr(str);
        return str === reverse;
    };

    const convertDatetoStr = (date) => {
        var dateStr = { day: "", month: "", year: "" };

        if (date.day < 10) {
            dateStr.day = "0" + date.day;
        } else {
            dateStr.day = date.day.toString();
        }

        if (date.month < 10) {
            dateStr.month = "0" + date.month;
        } else {
            dateStr.month = date.month.toString();
        }

        dateStr.year = date.year.toString();
        return dateStr;
    };

    const getAllDateFormats = (date) => {
        let dateStr = convertDatetoStr(date);
        let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
        let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
        let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
        let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
        let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
        let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day
        return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
    }

    const checkPalindromeForAllFormats = (date) => {
        let flag = false;
        let allFormats = getAllDateFormats(date)
        let dateFormat = "";

        for(let i = 0; i < allFormats.length; i++){
            if(isPalindrome(allFormats[i])){
                flag = true;
                switch(allFormats.indexOf(allFormats[i])) {
                    case 0: dateFormat = "ddmmyyyy"; break;
                    case 1: dateFormat = "mmddyyyy"; break;
                    case 2: dateFormat = "yyyymmdd"; break;
                    case 3: dateFormat = "ddmmyy"; break;
                    case 4: dateFormat = "mmddyy"; break;
                    case 5: dateFormat = "yymmdd"; break;
                    default: dateFormat = "";
                }
                setPalindromeDate(`${allFormats[i]} in format ${dateFormat}`)
                break;
            }
        }

        return flag;
    }

    const isLeapYear = (year) => {
        if(year % 400 === 0) {
            return true 
        } 
        if(year % 100 === 0) {
            return false
        }
        if(year % 4 === 0) {
            return true
        }
        return false
    }

    const getNextDate = (date) => {
        let day = date.day + 1;
        let month = date.month;
        let year = date.year;

        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        if(month === 2) {
            if(isLeapYear(year)) {
                if(day > 29) {
                    day = 1;
                    month++;
                }
            } else {
                if(day > 28) {
                    day = 1;
                    month++;
                }
            }
        } else {
            if(day > daysInMonth[month - 1]) {
                day = 1;
                month++;
            }
        }
        
        if(month > 12) {
            month = 1;
            year++;
        }
        return {
            day: day,
            month: month,
            year: year
        }
    }
    
    const getPrevDate = (date) => {
        let day = date.day - 1;
        let month = date.month;
        let year = date.year;

        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        if(month === 3) {
            if(isLeapYear(year)) {
                if(day < 1) {
                    day = 29;
                    month--;
                }
            } else {
                day = 28;
                month--;
            }
        } else {
            if(day < 1) {
                month--
                if(month < 1) {
                    month = 12;
                    year--;
                }
                day = daysInMonth[month - 1];
            }
        }
        
        if(month < 1) {
            month = 12;
            year--;
        }
        return {
            day: day,
            month: month,
            year: year
        }
    }

    let getNextPalindromeDate = (date) => {
        let nextDate = getNextDate(date);
        let prevDate = getPrevDate(date);
        let nextCtr = 0;
        let prevCtr = 0;
        while(1) {
            nextCtr++;
            let isPalindrome = checkPalindromeForAllFormats(nextDate);
            if(isPalindrome) {
                break;
            }
            nextDate = getNextDate(nextDate);
        }
        while(1) {
            prevCtr++;
            let isPalindrome = checkPalindromeForAllFormats(prevDate);
            if(isPalindrome) {
                break;
            }
            prevDate = getPrevDate(prevDate);
        }
        if(nextCtr < prevCtr) {
            return [setMessage("Oops! Your birthday is not a palindrome"), setDateDifference(`Your birthday is ${nextCtr} days away from palindrome which is `)];
        }
        return [setMessage("Oops! Your birthday is not a palindrome"), setDateDifference(`Your birthday is ${prevCtr} days away from palindrome which is `)];
    }

    //onClick function starts here

    function resultAnnounce(e) {
        e.preventDefault();
        setDisplay("block");
        setMessage("");
        setDateDifference("");
        setPalindromeDate("");
        setTimeout(() => {
            let splitDate = yourDate.split("-");
            if(splitDate != "") {
                let date = {
                    day: Number(splitDate[2]),
                    month: Number(splitDate[1]),
                    year: Number(splitDate[0])
                };
                let isPalindrome = checkPalindromeForAllFormats(date);
                if(isPalindrome) {
                    setMessage("Congrats! your birthday is a palindrome");
                    setPalindromeDate("");
                    setSource("joy.svg");
                } else {
                    getNextPalindromeDate(date);
                    setSource("nextTime.svg");
                }
            }
            setDisplay("none");
        }, 3000);
    }

    return (
        <Fragment>
            <div
                className="circle"
                style={{
                    boxShadow: "0px 20px 150px #0C4A6E",
                    background: "#0284C7",
                }}
            ></div>
            <div
                className="outer-box"
                style={{
                    fontFamily: "sans-serif",
                    textAlign: "center",
                    boxShadow: "0px 20px 150px #0C4A6E",
                    background: "#F0F9FF",
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
                        <input type="submit" value="Check" />
                    </form>
                    <div
                        style={{
                            background:
                                "url('https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif') center center / 100px",
                            height: "60px",
                            width: "60px",
                            borderRadius: "100px",
                            display: toggleDisplay,
                        }}
                    ></div>
                    <strong className="set-message">{message}</strong> <br />
                    <strong className="set-message">{dateDifference}{palindromeDate}</strong>
                </div>
                <img src={source} alt="congo/oops" />
                <aside>
                    Created by <a href="https://sakshamak.netlify.app/">Saksham</a> <br />
                    <a href="https://www.instagram.com/sakshamak/?igshid=3fwihg3dq3y9">
                        <img alt="instagram" className="instagram" src="instagram.svg" />
                    </a>
                    <a href="https://www.linkedin.com/in/saksham-ak-55b9131b3/">
                        <img alt="linkedIn" className="linkedin" src="linkedin.svg" />
                    </a>
                    <a href="https://twitter.com/Saksham_ka">
                        <img alt="twitter" className="twitter" src="twitter.svg" />
                    </a>
                    <a href="https://github.com/sakshamAK">
                        <img alt="github" className="git" src="github.svg" />
                    </a>
                </aside>
            </div>
        </Fragment>
    );
};

export default Palindrome;
