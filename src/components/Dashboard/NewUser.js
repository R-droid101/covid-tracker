import React from "react";
import "./newUser.css";
import { useState } from "react";
const NewUser = () => {
  const [sb, setSb] = useState();
  const [a60, setA60] = useState();
  const [hc, setHc] = useState();
  const [hf, setHf] = useState();
  const [hba, setHba] = useState();
  const [cwc, setCwc] = useState();
  const [isf, setIsf] = useState();
  const [hh, setHh] = useState();

  const selectHandler = (e) => {
    setSb(e.target.value);
  };
  const select2Handler = (e) => {
    setA60(e.target.value);
  };
  const select3Handler = (e) => {
    setHc(e.target.value);
  };
  const select4Handler = (e) => {
    setHf(e.target.value);
  };
  const select5Handler = (e) => {
    setIsf(e.target.value);
  };
  const select6Handler = (e) => {
    setHba(e.target.value);
  };
  const select7Handler = (e) => {
    setCwc(e.target.value);
  };
  const select8Handler = (e) => {
    setHh(e.target.value);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:8800/api/users/", {
      method: "POST",
      body: JSON.stringify({
        breath_shortness: sb,
        above_60: a60,
        has_cough: hc,
        has_fever: hf,
        female: isf,
        have_travelled: hba,
        contact_with_someone: cwc,
        have_headache: hh,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => console.log(res));
    const arr = [];
    arr.push(sb);
    arr.push(a60);
    arr.push(hc);
    arr.push(hf);
    arr.push(hba);
    arr.push(cwc);
    arr.push(hh);
    var val = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] != undefined) {
        val++;
      }
    }
    if (val != 8) {
      alert("Please enter all the fields");
    }
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === "yes") {
        sum++;
      }
      if (arr[i] === "no") {
        sum--;
      }
    }
    if (sum >= 5 && sum <= 7) {
      alert("You have the severe symptoms of COVID");
    }
    if (sum < 5 && sum >= 3) {
      alert("You have mild symptoms of COVID");
    }
    if (sum < 3) {
      alert("You are safe from COVID");
    }
  };
  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <div className="imageDiv">
          <img
            src="https://img.freepik.com/free-vector/clean-medical-background_53876-116875.jpg?w=1800&t=st=1666184041~exp=1666184641~hmac=38e7627434b9c8bbbea94f2e098bd828e1a2e6cb6e7fd4b6273c4702d8c55229"
            alt=""
            className="backgroundImage"
          />
        </div>
        <div className="mainDiv">
          <div className="first">
            <span className="breathText">Do you have Shortness in breath?</span>
            <select name="breath" className="breath" onChange={selectHandler}>
              <option value="select">--select--</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <div className="second">
            <span className="yearsText">Are you above 60 years?</span>
            <select name="breath" className="years" onChange={select2Handler}>
              <option value="select">--select--</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <div className="third">
            <span className="coughText">Do you have cough?</span>
            <select name="breath" className="cough" onChange={select3Handler}>
              <option value="select">--select--</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <div className="fourth">
            <span className="breathText">Do you have fever?</span>
            <select name="breath" className="fever" onChange={select4Handler}>
              <option value="select">--select--</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <div className="fifth">
            <span className="maleText">Are you female?</span>
            <select name="breath" className="female" onChange={select5Handler}>
              <option value="select">--select--</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <div className="sixth">
            <span className="abroadText">Did you recently travelled?</span>
            <select name="breath" className="abroad" onChange={select6Handler}>
              <option value="select">--select--</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <div className="seventh">
            <span className="contactText">
              Have you been in contact with someone?
            </span>
            <select name="breath" className="contact" onChange={select7Handler}>
              <option value="select">--select--</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <div className="eighth">
            <span className="headText">Do you have headache?</span>
            <select name="breath" className="head" onChange={select8Handler}>
              <option value="select">--select--</option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <button type="submit" className="submitUser">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default NewUser;
