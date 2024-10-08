// Import necessary modules
const express = require("express"); // Express framework for Node.js
const app = express(); // Initialize Express app
const fileUpload = require('express-fileupload'); // Middleware for file uploads
const cors = require("cors"); // CORS middleware for handling cross-origin requests
const http = require('http').Server(app); // Create an HTTP server using Express
const fs = require('fs'); // File system module for Node.js
const path = require('path'); // Path module for working with file paths
const PORT = 4000; // Server port

const socketIO = require('socket.io')(http, { // Socket.IO for real-time communication
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174","http://localhost:5175"] // Allowed origins for CORS
    }
});

// Get the path to the user's desktop and create a directory for file storage
const desktopPath = require('path').join(require('os').homedir(), 'Desktop');
const fileDirectory = path.join(desktopPath, 'chat-app-files');


app.use(cors()); // Use CORS middleware to handle cross-origin requests
app.use(fileUpload()); // Use file upload middleware
// Initialize users array to keep track of connected users
let users = [];

// Create the directory if it doesn't exist
if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory);
}

// Handle file uploads via POST request
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file; // Get uploaded file
    const fileName = file.name; // Extract file name

    // Move the uploaded file to the specified directory
    file.mv(path.join(fileDirectory, fileName), (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        // Emit file details to all connected sockets
        socketIO.emit('file', { fileName });

        res.json({ fileName }); // Respond with the uploaded file's name
    });
});

// Handle socket connections and events
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    // Listen for "message" event and emit "messageResponse" event to all sockets
    socket.on("message", data => {
        socketIO.emit("messageResponse", data);
    });

    // Listen for "typing" event and broadcast "typingResponse" event to other sockets
    socket.on("typing", data => {
        socket.broadcast.emit("typingResponse", data);
    });

    // Listen for "newUser" event and update the users array, then emit "newUserResponse" event to all sockets
    socket.on("newUser", data => {
        users.push(data);
        socketIO.emit("newUserResponse", users);
    });

    // Handle disconnection of a user
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        // Remove disconnected user from the users array
        users = users.filter(user => user.socketID !== socket.id);
        socketIO.emit("newUserResponse", users); // Emit updated users array to all sockets
        socket.disconnect(); // Disconnect the socket
    });
});

// Endpoint to respond with a simple JSON message
app.get("/api", (req, res) => {
    res.json({ message: "Hello" });
});

// Start the server and listen on the specified port
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
