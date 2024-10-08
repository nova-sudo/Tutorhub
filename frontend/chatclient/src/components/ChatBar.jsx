// Import necessary modules and hooks from React
import React, { useState, useEffect } from 'react';

// Functional component for the chat bar/sidebar
const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState([]); // State to manage active users

    // Listen for "newUserResponse" event from the socket and update users state
    useEffect(() => {
        socket.on("newUserResponse", data => setUsers(data));
    }, [socket, users]); // Trigger effect when socket or users state changes

    return (
        <div className='chat__sidebar'>
            <h2>Open Chat</h2>
            <div>
                <h4 className='chat__header'>ACTIVE USERS</h4>
                <div className='chat__users'>
                    {/* Display active users */}
                    {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
                </div>
            </div>
        </div>
    );
};

export default ChatBar; // Export the ChatBar component
