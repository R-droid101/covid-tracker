import "./navbar.css";
import React from "react";
const header = (props) => {
  return (
    <header className="header">
      <h1 className="titleHeading" onClick={props.home}>
        Covid Tracker
      </h1>
      <div id="container">
        { props.volunteer ? (
          <button className="addBtn" onClick={props.volunteer}>
            Volunteer
          </button>
        ) : (
          <>
          </>          
        )          
        }
        { props.eventList ? (
        <button className="addBtn" onClick={props.listEvents}>
            eventList
          </button>
        ) : (<></>)
        }
      
        <button className="addBtn" onClick={props.checkNews}>
          Latest News
        </button>
        {
          props.addNew ? (
          <button className="addBtn" onClick={props.addNew}>
            New user
          </button>
          ) : (
            <></>
          )
        }
        
        <button className="logoutbtn" onClick={props.logout}>
          Logout
        </button>
      </div>
    </header>
  );
};
export default header;
