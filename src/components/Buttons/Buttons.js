import React from 'react';
import './Buttons.css';
import { useNavigate } from 'react-router-dom';



function Buttons() {
    const navigate = useNavigate();
    const eventListHandler = () => {
        navigate("/eventList");
    };
    const createEventHandler = () => {
        navigate("/createEvent");
    };
    return (
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/><br/>
    <br/>
    <br/>
    <br/>
    <br/><br/>
    <br/>
    <br/>
    <br/>
    <br/><br/>
    <br/>
    <br/>
    <br/>
    <br/><br/>
    <br/>
    <br/>
    <br/>
    <br/><br/>
    <br/>
    <br/>
    <br/>
    <br/>
        <button class="first" onClick={eventListHandler}>List of Events</button>
        <button class="first" onClick={createEventHandler}>Create an Event</button>
    </>
    )
}

export default Buttons