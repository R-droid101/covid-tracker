import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './CreateEvent.css';

const createEvent = () => {

return (
    <>
    <form action="#" className="containerr">
        <fieldset>
        <legend className="tit">Create your Event here</legend>
        <div className="form-control">
            <label for="name">Event Title:</label>
            <input type="name" id="name" placeholder="Enter event title" required />
        </div>

        <div className="form-control">
            <label for="email">Coordinator name:</label>
            <input
            type="text"
            id="text"
            placeholder="Coordinator name"
            required
            />
        </div>

        <div className="form-control">
            <label for="email">Website Link:</label>
            <input
            type="url"
            id="url"
            placeholder="Website URL"
            required
            />
        </div>

        <div className="form-control">
            <label for="message">Event Description:</label>
            <textarea
            id="message"
            cols="30"
            rows="10"
            placeholder="Describe your event"
            required
            ></textarea>
        </div>
        <div className="form-control">
            <label for="email">Date of event</label>
            <input
            type="date"
            id="date"
            placeholder="Date of event"
            required
            />
        </div>
        <div className="form-control">
            <label for="email">Phone number:</label>
            <input
            type="tel"
            id="tel"
            placeholder="Phone number"
            required
            />
        </div>
        <div className="form-control">
            <label for="message">Event Address:</label>
            <textarea
            id="message"
            // cols="3"
            rows="3"
            placeholder="Address of event"
            required
            ></textarea>
        </div>
        <br></br>
        <input type="submit" value="Send" className="btn" />
        </fieldset>
    </form>
    </>
);
}

export default createEvent;