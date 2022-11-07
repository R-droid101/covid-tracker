import React, { useState } from 'react';
// import {database} from '../firebase/firebase';
import './Register.css';



export default function Register() {
    const [name, setname] = useState();
    const [gender, setGender] = useState();
    const [phn, setPhn] = useState();
    const [age, setAge] = useState();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const databody = {
            name,
            gender,
            phn,
            age
        }
        fetch('https://localhost:8800/api/volunteer/', {
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
        <legend className="tit">Enter personal details</legend>
        <div className="form-control">
            <label for="name">Your name:</label>
            <input
            type="name" 
            id="name" 
            value={name} 
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter your name" 
            required 
            />
        </div>

        <div className="form-control">
            <label for="email">age:</label>
            <input
            type="text"
            id="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Coordinator name"
            required
            />
        </div>

        <div className="form-control">
            <label for="email">Gender</label>
            <input
            type="text"
            id="text"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            placeholder="Website URL"
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
        <br></br>
        <input type="submit" value="Send" className="btn" />
        </fieldset>
    </form>
    </>
);
}

