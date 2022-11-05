import "./navbar.css";
import React from "react";
const header = (props) => {
  return (
    <header className="header">
      <h1 className="titleHeading" onClick={props.home}>
        Covid Tracker
      </h1>
      <div id="container">
        <button className="addBtn" onClick={props.checkNews}>
          Latest News
        </button>
        <button className="addBtn" onClick={props.addNew}>
          New user
        </button>
        <button className="logoutbtn" onClick={props.logout}>
          Logout
        </button>
      </div>
    </header>
  );
};
export default header;
