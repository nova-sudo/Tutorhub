// Import necessary modules and components from React
import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar'; // Component for chat bar/header
import ChatBody from './ChatBody'; // Component for chat body/content
import ChatFooter from './ChatFooter'; // Component for chat footer

// Functional component for the chat page
const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]); // State to manage chat messages
  const [typingStatus, setTypingStatus] = useState(""); // State to manage typing status
  const lastMessageRef = useRef(null); // Ref for the last message element in chat body

  // Listen for "messageResponse" event from the socket and update messages state
  useEffect(() => {
    socket.on("messageResponse", data => setMessages([...messages, data]));
  }, [socket, messages]);

  // Listen for "typingResponse" event from the socket and update typingStatus state
  useEffect(() => {
    socket.on("typingResponse", data => setTypingStatus(data));
  }, [socket]);

  // Scroll to the bottom of the chat every time messages change
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      {/* Component for chat bar/header */}
      <ChatBar socket={socket} />
      <div className='chat__main'>
        {/* Component for chat body/content */}
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
        {/* Component for chat footer */}
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage; // Export the ChatPage component
