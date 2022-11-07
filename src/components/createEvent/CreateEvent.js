import React, { useState } from 'react';
import {database} from '../firebase/firebase';

const [title, setTitle] = useState();
const [desc, setDesc] = useState();
const [date, setDate] = useState();
const [time, setTime] = useState();
const [location, setLocation] = useState();
const [phn, setPhn] = useState();
const [coordinatorName, setCoordinatorName] = useState();
const [url, setUrl] = useState();

function createEvent () {
    
    const Push = () => {
        database.ref('events').push({
            title: 'Event Title',
            coordinatorName: 'Coordinator Name',
            url: 'Website URL',
            description: 'Event Description',
            date: 'Event Date',
            time: 'Event Time',
            location: 'Event Location',
            contact: 'Event Contact'
        })
    }

return (
    <>
    <form action="POST" className="containerr">
        <fieldset>
        <legend className="tit">Create your Event here</legend>
        <div className="form-control">
            <label for="name">Event Title:</label>
            <input
            type="name" 
            id="name" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title" 
            required 
            />
        </div>

        <div className="form-control">
            <label for="email">Coordinator name:</label>
            <input
            type="text"
            id="text"
            value={coordinatorName}
            onChange={(e) => setCoordinatorName(e.target.value)}
            placeholder="Coordinator name"
            required
            />
        </div>

        <div className="form-control">
            <label for="email">Website Link:</label>
            <input
            type="url"
            id="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
            placeholder="Website URL"
            required
            />
        </div>

        <div className="form-control">
            <label for="message">Event Description:</label>
            <textarea
            id="message"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
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
            onChange={(e) => setDate(e.target.value)}
            value={date}
            placeholder="Date of event"
            required
            />
        </div>
        <div className="form-control">
            <label for="email">Phone number:</label>
            <input
            type="tel"
            id="tel"
            onChange={(e) => setPhn(e.target.value)}
            value={phn}
            placeholder="Phone number"
            required
            />
        </div>
        <div className="form-control">
            <label for="message">Event Address:</label>
            <textarea
            id="message"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
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