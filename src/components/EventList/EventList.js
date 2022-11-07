import React, { useState, useEffect } from "react";
import {
Card,
CardContent,
CardMedia,
CardHeader,
Typography,
CardActionArea,
} from "@material-ui/core";
import header from '../Navbar/Navbar';
import { Navigate } from "react-router-dom";

const EventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("https://localhost:8800/api/events")
            .then((response) => response.json())
            .then((data) => {
                setEvents(data);
            });
    });

    return (
    <>
    {events ? ( events.map((event) => (
        <Card className="news">            
            <CardHeader title={event.title} />
            <Typography variant="body2" color="textSecondary" component="p">{event.coordinatorName}</Typography>
        <CardContent>
        <a target="_blank" rel="noreferer" href={event.url}>Visit</a>
        </CardContent>        
        <CardActionArea >
            <button className="btn btn-primary" onClick={() => Navigate("/register")} >Register</button>
        </CardActionArea>
        {/* <button onClick={() => props.deleteEvent(event.id)}>Delete</button> */}
    </Card>
        ))
    ) : (<div style={{display:"flex", justifyElements: "center"}}>HI THERE!</div>)
    }        
    </>
    )
}

export default EventList;