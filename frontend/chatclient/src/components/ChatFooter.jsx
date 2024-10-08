// Import necessary modules and hooks from React
import React, { useState, useEffect } from 'react';

// Functional component for the chat footer/input area
const ChatFooter = ({ socket }) => {
    const [message, setMessage] = useState(''); // State to manage the message input
    const [file, setFile] = useState(null); // State to manage the selected file for upload

    // Listen for 'file' event from the socket to handle received file notification
    useEffect(() => {
        socket.on('file', (fileDetails) => {
            console.log('Received file:', fileDetails.fileName);
            // Further actions can be performed here upon receiving a file notification
        });
    }, [socket]);

    // Function to emit typing status when user is typing
    const handleTyping = () => {
        socket.emit('typing', `${localStorage.getItem('userName')} is typing`);
    };

    // Function to handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    // Function to send the selected file
    const sendFile = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            // Send the file using fetch to the server endpoint for file upload
            fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((result) => {
                    const fileName = file.name;
                    socket.emit('file', { fileName }); // Notify about the sent file to the server

                    // Emit a message to the chat with the file name
                    socket.emit('message', {
                        text: `Sent file: ${fileName}`,
                        name: localStorage.getItem('userName'),
                        id: `${socket.id}${Math.random()}`,
                        socketID: socket.id,
                    });

                    console.log('File uploaded successfully:', result);
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });
        }
    };

    // Function to handle sending text messages
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && localStorage.getItem('userName')) {
            // Emit a message to the chat with the typed message
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            });
        }
        setMessage(''); // Clear the message input after sending
    };

    return (
        <div className='chat__footer'>
            {/* Form for sending messages and uploading files */}
            <form className='form' onSubmit={handleSendMessage}>
                {/* Input for typing messages */}
                <input
                    type='text'
                    placeholder='Write message'
                    className='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping} // Emit typing status on key press
                />
                {/* Input for selecting files */}
                <input type='file' onChange={handleFileChange} />
                {/* Button to send selected file */}
                <button className='sendBtn' onClick={sendFile}>
                    SEND FILE
                </button>
                {/* Button to send typed message */}
                <button type='submit' className='sendBtn'>
                    SEND
                </button>
            </form>
        </div>
    );
};

export default ChatFooter; // Export the ChatFooter component
