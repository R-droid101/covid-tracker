import "./navbar.css";
import React from "react";
const header = (props) => {
  return (
    <header className="header">
      <h1 className="titleHeading">Covid Tracker</h1>
      <div id="container">
        <button className="logoutbtn" onClick={props.logout}>
          Logout
        </button>
      </div>
    </header>
  );
};
export default header;
