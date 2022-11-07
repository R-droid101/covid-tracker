import React, { useState, useEffect } from 'react';
import './Event.css';

function Event() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://localhost:8800/api/events/${id}")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    });

    return (
    <>
    {data ? (
        data.map((event) => (
            <div class="card">
            <div class="card-body">
                <h1>{data.title}</h1>
                <p class="price">{data}</p>
                <p>{data.desc}</p>
                <p>{data.url}</p>
                <p>{data.date}</p>
                <p>{data.phn}</p>
                <button onClick={() => data.deleteEvent(event.id)}>Delete</button>
            </div>
        </div>
        ))
    ) : (<div style={{display:"flex", justifyElements: "center"}}>Loading...</div>)
    }
    </>
    )
}

export default Event