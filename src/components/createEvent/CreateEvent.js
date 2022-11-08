import React, { useState } from 'react';
import {database} from '../firebase/firebase';
import './CreateEvent.css';



export default function CreateEvent() {
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [date, setDate] = useState();
    const [location, setLocation] = useState();
    const [phn, setPhn] = useState();
    const [coordinatorName, setCoordinatorName] = useState();
    const [url, setUrl] = useState();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const databody = {
            title,
            desc,
            date,
            location,
            phn,
            coordinatorName,
            url
        }
        fetch('localhost:8800/api/events', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

return (
    <>
    <form action="#" className="containerr" onSubmit={handleSubmit}>
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
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
            value={date}
            onChange={(e) => setDate(e.target.value)}            
            placeholder="Date of event"
            required
            />
        </div>
        <div className="form-control">
            <label for="email">Phone number:</label>
            <input
            type="tel"
            id="tel"
            value={phn}
            onChange={(e) => setPhn(e.target.value)}            
            placeholder="Phone number"
            required
            />
        </div>
        <div className="form-control">
            <label for="message">Event Address:</label>
            <textarea
            id="message"
            value={location}
            onChange={(e) => setLocation(e.target.value)}            
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

