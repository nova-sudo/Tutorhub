// Import necessary modules and hooks from React
import React from 'react';
import { useNavigate } from "react-router-dom"; // Hook for navigation

// Functional component for the chat body/content
const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  const navigate = useNavigate(); // Initialize the navigation function

  // Function to handle leaving the chat
  const handleLeaveChat = () => {
    localStorage.removeItem("userName"); // Remove the username from local storage
    navigate("/"); // Navigate to the home page
    window.location.reload(); // Refresh the window
  }

  return (
    <>
      {/* Header section with 'Hangout with Colleagues' title and 'LEAVE CHAT' button */}
      <header className='chat__mainHeader'>
        <p>Hangout with Colleagues</p>
        <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
      </header>

      {/* Container for displaying chat messages */}
      <div className='message__container'>
        {/* Map through messages and render sender and recipient messages */}
        {messages.map(message => (
          message.name === localStorage.getItem("userName") ? (
            // Render sender's message
            <div className="message__chats" key={message.id}>
              <p className='sender__name'>You</p>
              <div className='message__sender'>
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            // Render recipient's message
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className='message__recipient'>
                <p>{message.text}</p>
              </div>
            </div>
          )
        ))}

        {/* Display typing status */}
        <div className='message__status'>
          <p>{typingStatus}</p>
        </div>
        {/* Reference for the last message to scroll to */}
        <div ref={lastMessageRef} />
      </div>
    </>
  )
}

export default ChatBody; // Export the ChatBody component
