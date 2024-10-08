import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 


const Home = ({ socket }) => {
    const navigate = useNavigate(); 
    const [userName, setUserName] = useState(""); 

   
    const handleSubmit = (e) => {
        e.preventDefault(); 
        localStorage.setItem("userName", userName); 
        
        socket.emit("newUser", { userName, socketID: socket.id });
        navigate("/chatpage"); 
    };

    return (
        // Form for user sign-in
        <form className='home__container' onSubmit={handleSubmit}>
            <h2 className='home__header'>enter your name</h2>
            {/* Input field for username */}
            <label htmlFor="username">enter a Nickname</label>
            <input
                type="text"
                minLength={6}
                name="username"
                id='username'
                className='username__input'
                value={userName}
                onChange={e => setUserName(e.target.value)} // Update username state on change
            />
           
            <button className='home__cta'>chat</button>
        </form>
    );
};

export default Home; 