import "./navbar.css";
import React from "react";
import ChatBot from "../../Chatbot/Chatbot";
import { useState } from "react";
const header = (props) => {
  return (
    <>
      <header className="header">
        <h1 className="titleHeading" onClick={props.home}>
          Covid Tracker
        </h1>
        <div id="container">
          {props.volunteer ? (
            <button className="addBtn" onClick={props.volunteer}>
              Volunteer
            </button>
          ) : (
            <button className="addBtn" onClick={props.listEvents}>
              eventList
            </button>
          )}

          <button className="addBtn" onClick={props.checkNews}>
            Latest News
          </button>

          <button className="addBtn" onClick={props.addNew}>
            Symptom Checker
          </button>
          <button className="logoutbtn" onClick={props.logout}>
            Logout
          </button>
        </div>
      </header>
    </>
  );
};
export default header;
